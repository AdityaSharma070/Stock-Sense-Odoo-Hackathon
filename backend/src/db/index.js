import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export const connectDB = async () => {
  await prisma.$connect();
  console.log("✅ PostgreSQL connected via Prisma");
};

export default prisma;