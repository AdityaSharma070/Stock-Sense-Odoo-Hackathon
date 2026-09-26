import prisma from "../db/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getMoveHistory = asyncHandler(async (req, res) => {
  const { type, productId, fromDate, toDate } = req.query;

  const history = await prisma.move_history.findMany({
    where: {
      ...(type && { type }),
      ...(productId && { product_id: productId }),
      ...(fromDate &&
        toDate && {
          created_at: {
            gte: new Date(fromDate),
            lte: new Date(toDate),
          },
        }),
    },
    include: {
      product: { select: { name: true, sku: true } },
      from_loc: { select: { name: true } },
      to_loc: { select: { name: true } },
      performer: { select: { name: true } },
    },
    orderBy: { created_at: "desc" },
    take: 200,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, history, "Move history fetched"));
});

export { getMoveHistory };