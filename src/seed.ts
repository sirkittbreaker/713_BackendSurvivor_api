import { PrismaClient } from "@prisma/client";
import { createAcademicPositions } from "./db/createAcademicPosition";
import { createDepartments } from "./db/createDepartment";
import { createUser } from "./db/createUser";
import { createAppointments } from "./db/createAppointment";

const prisma = new PrismaClient();

async function main() {
  await createAcademicPositions();
  await createDepartments();
  await createUser();
  await createAppointments();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
