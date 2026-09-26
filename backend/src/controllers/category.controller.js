import prisma from "../db/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getCategories = asyncHandler(async (req, res) => {
  const categories = await prisma.categories.findMany({
    orderBy: { name: "asc" },
  });
  return res.status(200).json(new ApiResponse(200, categories, "Categories fetched"));
});

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) throw new ApiError(400, "Category name is required");

  const existing = await prisma.categories.findUnique({ where: { name } });
  if (existing) throw new ApiError(409, "Category already exists");

  const category = await prisma.categories.create({ data: { name } });
  return res.status(201).json(new ApiResponse(201, category, "Category created"));
});

export { getCategories, createCategory };