import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllDepartments() {
  return await prisma.department.findMany();
}
