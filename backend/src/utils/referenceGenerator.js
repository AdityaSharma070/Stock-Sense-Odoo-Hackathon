import prisma from "../db/index.js";

const pad = (n) => String(n).padStart(4, "0");
const year = () => new Date().getFullYear();

export const generateReceiptRef = async () => {
  const count = await prisma.receipts.count();
  return `REC/${year()}/${pad(count + 1)}`;
};

export const generateDeliveryRef = async () => {
  const count = await prisma.deliveries.count();
  return `DEL/${year()}/${pad(count + 1)}`;
};

export const generateAdjustmentRef = async () => {
  const count = await prisma.adjustments.count();
  return `ADJ/${year()}/${pad(count + 1)}`;
};