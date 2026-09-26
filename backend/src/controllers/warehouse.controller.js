import prisma from "../db/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getWarehouses = asyncHandler(async (req, res) => {
  const warehouses = await prisma.warehouses.findMany({
    orderBy: { created_at: "desc" },
    include: { locations: true },
  });
  return res.status(200).json(new ApiResponse(200, warehouses, "Warehouses fetched"));
});

const createWarehouse = asyncHandler(async (req, res) => {
  const { name, short_code, address } = req.body;

  if (!name || !short_code)
    throw new ApiError(400, "Name and short code are required");

  const existing = await prisma.warehouses.findUnique({ where: { short_code } });
  if (existing) throw new ApiError(409, "Short code already exists");

  const warehouse = await prisma.warehouses.create({
    data: { name, short_code, address },
  });

  return res.status(201).json(new ApiResponse(201, warehouse, "Warehouse created"));
});

const updateWarehouse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, short_code, address } = req.body;

  const warehouse = await prisma.warehouses.findUnique({ where: { id } });
  if (!warehouse) throw new ApiError(404, "Warehouse not found");

  const updated = await prisma.warehouses.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(short_code && { short_code }),
      ...(address && { address }),
    },
  });

  return res.status(200).json(new ApiResponse(200, updated, "Warehouse updated"));
});

export { getWarehouses, createWarehouse, updateWarehouse };