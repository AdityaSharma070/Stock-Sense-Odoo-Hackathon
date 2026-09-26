import prisma from "../db/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getLocations = asyncHandler(async (req, res) => {
  const { warehouseId } = req.query;

  const locations = await prisma.locations.findMany({
    where: warehouseId ? { warehouse_id: warehouseId } : {},
    orderBy: { created_at: "desc" },
    include: { warehouse: { select: { name: true } } },
  });

  return res.status(200).json(new ApiResponse(200, locations, "Locations fetched"));
});

const createLocation = asyncHandler(async (req, res) => {
  const { warehouse_id, name, short_code } = req.body;

  if (!warehouse_id || !name || !short_code)
    throw new ApiError(400, "Warehouse, name and short code are required");

  const warehouse = await prisma.warehouses.findUnique({ where: { id: warehouse_id } });
  if (!warehouse) throw new ApiError(404, "Warehouse not found");

  const location = await prisma.locations.create({
    data: { warehouse_id, name, short_code },
  });

  return res.status(201).json(new ApiResponse(201, location, "Location created"));
});

const updateLocation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, short_code } = req.body;

  const location = await prisma.locations.findUnique({ where: { id } });
  if (!location) throw new ApiError(404, "Location not found");

  const updated = await prisma.locations.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(short_code && { short_code }),
    },
  });

  return res.status(200).json(new ApiResponse(200, updated, "Location updated"));
});

export { getLocations, createLocation, updateLocation };