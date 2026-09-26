import prisma from "../db/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { updateStock } from "../utils/stockUpdater.js";
import { generateReceiptRef } from "../utils/referenceGenerator.js";

const getReceipts = asyncHandler(async (req, res) => {
  const { status, warehouseId } = req.query;

  const receipts = await prisma.receipts.findMany({
    where: {
      ...(status && { status }),
      ...(warehouseId && { warehouse_id: warehouseId }),
    },
    include: {
      warehouse: { select: { name: true } },
      creator: { select: { name: true } },
      receipt_lines: {
        include: {
          product: { select: { name: true, sku: true } },
          location: { select: { name: true } },
        },
      },
    },
    orderBy: { created_at: "desc" },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, receipts, "Receipts fetched"));
});

const createReceipt = asyncHandler(async (req, res) => {
  const { supplier, warehouse_id, scheduled_date, lines } = req.body;

  if (!warehouse_id) throw new ApiError(400, "Warehouse is required");
  if (!lines || lines.length === 0)
    throw new ApiError(400, "At least one product line is required");

  // Validate all products and locations exist
  for (const line of lines) {
    if (!line.product_id || !line.quantity || !line.location_id)
      throw new ApiError(400, "Each line needs product, quantity and location");

    const product = await prisma.products.findUnique({
      where: { id: line.product_id },
    });
    if (!product)
      throw new ApiError(404, `Product ${line.product_id} not found`);

    const location = await prisma.locations.findUnique({
      where: { id: line.location_id },
    });
    if (!location)
      throw new ApiError(404, `Location ${line.location_id} not found`);
  }

  const reference = await generateReceiptRef();

  const receipt = await prisma.receipts.create({
    data: {
      reference,
      supplier: supplier || null,
      warehouse_id,
      scheduled_date: scheduled_date ? new Date(scheduled_date) : null,
      created_by: req.user.id,
      status: "draft",
      receipt_lines: {
        create: lines.map((l) => ({
          product_id: l.product_id,
          quantity: l.quantity,
          location_id: l.location_id,
        })),
      },
    },
    include: {
      receipt_lines: {
        include: {
          product: { select: { name: true, sku: true } },
          location: { select: { name: true } },
        },
      },
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, receipt, "Receipt created"));
});

const getReceiptById = asyncHandler(async (req, res) => {
  const receipt = await prisma.receipts.findUnique({
    where: { id: req.params.id },
    include: {
      warehouse: { select: { name: true } },
      creator: { select: { name: true } },
      receipt_lines: {
        include: {
          product: { select: { name: true, sku: true, unit: true } },
          location: {
            select: {
              name: true,
              warehouse: { select: { name: true } },
            },
          },
        },
      },
    },
  });

  if (!receipt) throw new ApiError(404, "Receipt not found");

  return res
    .status(200)
    .json(new ApiResponse(200, receipt, "Receipt fetched"));
});

const validateReceipt = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const receipt = await prisma.receipts.findUnique({
    where: { id },
    include: { receipt_lines: true },
  });

  if (!receipt) throw new ApiError(404, "Receipt not found");
  if (receipt.status === "done")
    throw new ApiError(400, "Receipt is already validated");
  if (receipt.status === "cancelled")
    throw new ApiError(400, "Cannot validate a cancelled receipt");

  // Update stock for every line
  for (const line of receipt.receipt_lines) {
    await updateStock({
      type: "receipt",
      referenceId: receipt.id,
      productId: line.product_id,
      fromLocationId: null,
      toLocationId: line.location_id,
      quantity: line.quantity,
      performedBy: req.user.id,
    });
  }

  const updated = await prisma.receipts.update({
    where: { id },
    data: { status: "done" },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updated, "Receipt validated — stock updated"));
});

export { getReceipts, createReceipt, getReceiptById, validateReceipt };