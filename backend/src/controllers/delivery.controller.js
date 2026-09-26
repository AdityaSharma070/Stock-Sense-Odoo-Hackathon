import prisma from "../db/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { updateStock } from "../utils/stockUpdater.js";
import { generateDeliveryRef } from "../utils/referenceGenerator.js";

const getDeliveries = asyncHandler(async (req, res) => {
  const { status, warehouseId } = req.query;

  const deliveries = await prisma.deliveries.findMany({
    where: {
      ...(status && { status }),
      ...(warehouseId && { warehouse_id: warehouseId }),
    },
    include: {
      warehouse: { select: { name: true } },
      creator: { select: { name: true } },
      delivery_lines: {
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
    .json(new ApiResponse(200, deliveries, "Deliveries fetched"));
});

const createDelivery = asyncHandler(async (req, res) => {
  const { customer, warehouse_id, scheduled_date, lines } = req.body;

  if (!warehouse_id) throw new ApiError(400, "Warehouse is required");
  if (!lines || lines.length === 0)
    throw new ApiError(400, "At least one product line is required");

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

  const reference = await generateDeliveryRef();

  const delivery = await prisma.deliveries.create({
    data: {
      reference,
      customer: customer || null,
      warehouse_id,
      scheduled_date: scheduled_date ? new Date(scheduled_date) : null,
      created_by: req.user.id,
      status: "draft",
      delivery_lines: {
        create: lines.map((l) => ({
          product_id: l.product_id,
          quantity: l.quantity,
          location_id: l.location_id,
        })),
      },
    },
    include: {
      delivery_lines: {
        include: {
          product: { select: { name: true, sku: true } },
          location: { select: { name: true } },
        },
      },
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, delivery, "Delivery created"));
});

const getDeliveryById = asyncHandler(async (req, res) => {
  const delivery = await prisma.deliveries.findUnique({
    where: { id: req.params.id },
    include: {
      warehouse: { select: { name: true } },
      creator: { select: { name: true } },
      delivery_lines: {
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

  if (!delivery) throw new ApiError(404, "Delivery not found");

  return res
    .status(200)
    .json(new ApiResponse(200, delivery, "Delivery fetched"));
});

const validateDelivery = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const delivery = await prisma.deliveries.findUnique({
    where: { id },
    include: { delivery_lines: true },
  });

  if (!delivery) throw new ApiError(404, "Delivery not found");
  if (delivery.status === "done")
    throw new ApiError(400, "Delivery is already validated");
  if (delivery.status === "cancelled")
    throw new ApiError(400, "Cannot validate a cancelled delivery");

  // Check stock is sufficient for every line before doing anything
  for (const line of delivery.delivery_lines) {
    const stock = await prisma.stock.findUnique({
      where: {
        product_id_location_id: {
          product_id: line.product_id,
          location_id: line.location_id,
        },
      },
    });

    if (!stock || stock.quantity < line.quantity) {
      const product = await prisma.products.findUnique({
        where: { id: line.product_id },
        select: { name: true },
      });
      throw new ApiError(
        400,
        `Insufficient stock for "${product.name}". Available: ${stock?.quantity ?? 0}, Required: ${line.quantity}`
      );
    }
  }

  // All stock checks passed — now update
  for (const line of delivery.delivery_lines) {
    await updateStock({
      type: "delivery",
      referenceId: delivery.id,
      productId: line.product_id,
      fromLocationId: line.location_id,
      toLocationId: null,
      quantity: line.quantity,
      performedBy: req.user.id,
    });
  }

  const updated = await prisma.deliveries.update({
    where: { id },
    data: { status: "done" },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updated, "Delivery validated — stock deducted"));
});

export { getDeliveries, createDelivery, getDeliveryById, validateDelivery };