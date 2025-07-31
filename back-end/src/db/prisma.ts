import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to database successfully");
  } catch (err) {
    console.log(err);
  }
};

export { connectDB, prisma };
