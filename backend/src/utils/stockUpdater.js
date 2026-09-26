import prisma from "../db/index.js";

export const updateStock = async ({
  type,
  referenceId,
  productId,
  fromLocationId,
  toLocationId,
  quantity,
  performedBy,
}) => {
  // Decrease stock at source (deliveries / transfers)
  if (fromLocationId) {
    await prisma.stock.upsert({
      where: {
        product_id_location_id: {
          product_id: productId,
          location_id: fromLocationId,
        },
      },
      update: { quantity: { decrement: quantity } },
      create: {
        product_id: productId,
        location_id: fromLocationId,
        quantity: -quantity,
      },
    });
  }

  // Increase stock at destination (receipts / transfers)
  if (toLocationId) {
    await prisma.stock.upsert({
      where: {
        product_id_location_id: {
          product_id: productId,
          location_id: toLocationId,
        },
      },
      update: { quantity: { increment: quantity } },
      create: {
        product_id: productId,
        location_id: toLocationId,
        quantity,
      },
    });
  }

  // Always log the movement
  await prisma.move_history.create({
    data: {
      type,
      reference_id: referenceId,
      product_id: productId,
      from_location: fromLocationId ?? null,
      to_location: toLocationId ?? null,
      quantity,
      performed_by: performedBy,
    },
  });
};