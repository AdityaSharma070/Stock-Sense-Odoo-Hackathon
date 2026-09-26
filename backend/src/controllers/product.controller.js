import prisma from "../db/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getProducts = asyncHandler(async (req, res) => {
  const { search, categoryId } = req.query;

  const products = await prisma.products.findMany({
    where: {
      ...(categoryId && { category_id: categoryId }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { sku: { contains: search, mode: "insensitive" } },
        ],
      }),
    },
    include: {
      category: { select: { name: true } },
      stock: {
        include: { location: { select: { name: true } } },
      },
    },
    orderBy: { created_at: "desc" },
  });

  return res.status(200).json(new ApiResponse(200, products, "Products fetched"));
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category_id, unit } = req.body;

  if (!name || !sku || !unit)
    throw new ApiError(400, "Name, SKU and unit are required");

  const existing = await prisma.products.findUnique({ where: { sku } });
  if (existing) throw new ApiError(409, "SKU already exists");

  const product = await prisma.products.create({
    data: { name, sku, unit, category_id: category_id || null },
    include: { category: { select: { name: true } } },
  });

  return res.status(201).json(new ApiResponse(201, product, "Product created"));
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await prisma.products.findUnique({
    where: { id: req.params.id },
    include: {
      category: { select: { name: true } },
      stock: {
        include: {
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

  if (!product) throw new ApiError(404, "Product not found");
  return res.status(200).json(new ApiResponse(200, product, "Product fetched"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, sku, category_id, unit } = req.body;

  const product = await prisma.products.findUnique({ where: { id } });
  if (!product) throw new ApiError(404, "Product not found");

  const updated = await prisma.products.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(sku && { sku }),
      ...(unit && { unit }),
      ...(category_id !== undefined && { category_id }),
    },
  });

  return res.status(200).json(new ApiResponse(200, updated, "Product updated"));
});

const getProductStock = asyncHandler(async (req, res) => {
  const stock = await prisma.stock.findMany({
    where: { product_id: req.params.id },
    include: {
      location: {
        select: {
          name: true,
          warehouse: { select: { name: true } },
        },
      },
    },
  });

  return res.status(200).json(new ApiResponse(200, stock, "Stock fetched"));
});

export {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  getProductStock,
};