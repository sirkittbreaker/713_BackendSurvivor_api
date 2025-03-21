import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addComment(
  teacherId: number,
  studentId: string,
  content: string
) {
  const comment = await prisma.comment.create({
    data: {
      teacherId: teacherId,
      studentId: studentId,
      content: content,
    },
  });
  return comment;
}

export async function addReply(
  commentId: number,
  studentId: string,
  teacherId: number,
  content: string
) {
  const reply = await prisma.comment.create({
    data: {
      parentId: commentId,
      studentId: studentId,
      content: content,
      teacherId: teacherId,
    },
  });
  return reply;
}
