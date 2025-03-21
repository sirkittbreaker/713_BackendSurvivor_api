import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllAcademicPositions() {
  return await prisma.academicPosition.findMany();
}
