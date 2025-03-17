import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createAcademicPositions() {
  const academicPositions = [
    { title: "Professor" },
    { title: "Associate Professor" },
    { title: "Assistant Professor" },
    { title: "Lecturer" },
    { title: "Senior Lecturer" },
    { title: "Research Fellow" },
    { title: "Senior Research Fellow" },
    { title: "Postdoctoral Researcher" },
    { title: "Adjunct Professor" },
    { title: "Visiting Professor" },
  ];

  for (const position of academicPositions) {
    await prisma.academicPosition.create({
      data: position,
    });
  }
}
