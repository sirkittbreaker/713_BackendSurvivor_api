import { PrismaClient } from "@prisma/client";
import { createAcademicPositions } from "./db/createAcademicPosition";
import { createDepartments } from "./db/createDepartment";
import { createUser } from "./db/createUser";

const prisma = new PrismaClient();

async function main() {
  await createAcademicPositions();
  await createDepartments();
  await createUser();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
