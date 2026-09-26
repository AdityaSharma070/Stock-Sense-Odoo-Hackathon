import prisma from "../db/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateAdjustmentRef } from "../utils/referenceGenerator.js";

const getAdjustments = asyncHandler(async (req, res) => {
  const adjustments = await prisma.adjustments.findMany({
    include: {
      product: { select: { name: true, sku: true } },
      location: { select: { name: true } },
      adjuster: { select: { name: true } },
    },
    orderBy: { created_at: "desc" },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, adjustments, "Adjustments fetched"));
});

const createAdjustment = asyncHandler(async (req, res) => {
  const { product_id, location_id, new_quantity, reason } = req.body;

  if (!product_id || !location_id || new_quantity === undefined)
    throw new ApiError(400, "Product, location and new quantity are required");

  if (new_quantity < 0)
    throw new ApiError(400, "Quantity cannot be negative");

  const product = await prisma.products.findUnique({ where: { id: product_id } });
  if (!product) throw new ApiError(404, "Product not found");

  const location = await prisma.locations.findUnique({ where: { id: location_id } });
  if (!location) throw new ApiError(404, "Location not found");

  // Get current stock
  const currentStock = await prisma.stock.findUnique({
    where: {
      product_id_location_id: { product_id, location_id },
    },
  });

  const old_quantity = currentStock?.quantity ?? 0;
  const diff = new_quantity - Number(old_quantity);

  // Update stock to the new quantity directly
  await prisma.stock.upsert({
    where: {
      product_id_location_id: { product_id, location_id },
    },
    update: { quantity: new_quantity },
    create: { product_id, location_id, quantity: new_quantity },
  });

  const reference = await generateAdjustmentRef();

  // Log the adjustment
  const adjustment = await prisma.adjustments.create({
    data: {
      reference,
      product_id,
      location_id,
      old_quantity,
      new_quantity,
      reason: reason || null,
      adjusted_by: req.user.id,
    },
    include: {
      product: { select: { name: true, sku: true } },
      location: { select: { name: true } },
      adjuster: { select: { name: true } },
    },
  });

  // Log to move history
  await prisma.move_history.create({
    data: {
      type: "adjustment",
      reference_id: adjustment.id,
      product_id,
      from_location: null,
      to_location: null,
      quantity: Math.abs(diff),
      performed_by: req.user.id,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, adjustment, "Stock adjusted successfully"));
});

const getAdjustmentById = asyncHandler(async (req, res) => {
  const adjustment = await prisma.adjustments.findUnique({
    where: { id: req.params.id },
    include: {
      product: { select: { name: true, sku: true, unit: true } },
      location: {
        select: {
          name: true,
          warehouse: { select: { name: true } },
        },
      },
      adjuster: { select: { name: true } },
    },
  });

  if (!adjustment) throw new ApiError(404, "Adjustment not found");

  return res
    .status(200)
    .json(new ApiResponse(200, adjustment, "Adjustment fetched"));
});

export { getAdjustments, createAdjustment, getAdjustmentById };