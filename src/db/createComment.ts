import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createComments() {
  const comments = [
    {
      content: "test comment 1",
      createdBy: 2,
      createdAt: new Date("2025-03-27 13:29:39.012"),
      updatedAt: new Date("2025-03-27 13:29:39.012"),
      teacherId: 1,
      studentId: "689999999",
      parentId: null,
    },
    {
      content: "test reply by student 1",
      createdBy: 22,
      createdAt: new Date("2025-03-27 13:30:41.376"),
      updatedAt: new Date("2025-03-27 13:30:41.376"),
      teacherId: 1,
      studentId: "689999999",
      parentId: 1,
    },
    {
      content: "test reply by teacher 1",
      createdBy: 2,
      createdAt: new Date("2025-03-28 11:25:08.222"),
      updatedAt: new Date("2025-03-28 11:25:08.222"),
      teacherId: 1,
      studentId: "689999999",
      parentId: 1,
    },
  ];

  for (const comment of comments) {
    await prisma.comment.create({
      data: comment,
    });
    console.log(`✅ Created comment: ${comment.content.substring(0, 30)}...`);
  }
}
