import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function createUser() {
  const numSaltRounds = 10;
  const user1 = await prisma.user.create({
    data: {
      username: "admin",
      password: await bcrypt.hash("admin", numSaltRounds),
      profile:
        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      role: "ROLE_ADMIN",
    },
  });
  const user2 = await prisma.user.create({
    data: {
      username: "teacher1",
      password: await bcrypt.hash("password1", numSaltRounds),
      profile:
        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      role: "ROLE_TEACHER",
      teacher: {
        create: {
          firstName: "Adil",
          lastName: "Summers",
          academicPositionId: 1,
          departmentId: 1,
        },
      },
    },
  });
  const user3 = await prisma.user.create({
    data: {
      username: "679999999",
      password: await bcrypt.hash("password1", numSaltRounds),
      profile:
        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      role: "ROLE_STUDENT",
      student: {
        create: {
          studentId: "679999999",
          firstName: "Jakub",
          lastName: "Wise",
          departmentId: 1,
          teacherId: 1,
        },
      },
    },
  });
}
