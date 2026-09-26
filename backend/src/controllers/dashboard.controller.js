import prisma from "../db/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalProducts,
    pendingReceipts,
    pendingDeliveries,
    lowStockItems,
    recentReceipts,
    recentDeliveries,
  ] = await Promise.all([
    prisma.products.count(),
    prisma.receipts.count({ where: { status: { in: ["draft", "waiting", "ready"] } } }),
    prisma.deliveries.count({ where: { status: { in: ["draft", "waiting", "ready"] } } }),
    prisma.stock.findMany({
      where: { quantity: { lte: 10 } },
      include: {
        product: { select: { name: true, sku: true } },
        location: { select: { name: true } },
      },
    }),
    prisma.receipts.findMany({
      take: 5,
      orderBy: { created_at: "desc" },
      select: { id: true, reference: true, supplier: true, status: true, created_at: true },
    }),
    prisma.deliveries.findMany({
      take: 5,
      orderBy: { created_at: "desc" },
      select: { id: true, reference: true, customer: true, status: true, created_at: true },
    }),
  ]);

  return res.status(200).json(
    new ApiResponse(200, {
      totalProducts,
      pendingReceipts,
      pendingDeliveries,
      lowStockCount: lowStockItems.length,
      lowStockItems,
      recentReceipts,
      recentDeliveries,
    }, "Dashboard stats fetched")
  );
});

export { getDashboardStats };