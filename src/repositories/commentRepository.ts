import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addComment(
  teacherId: number,
  studentId: string,
  content: string,
  userId: number
) {
  const comment = await prisma.comment.create({
    data: {
      teacherId: teacherId,
      studentId: studentId,
      content: content,
      createdBy: userId,
    },
  });
  return comment;
}

export async function addReply(
  commentId: number,
  studentId: string,
  teacherId: number,
  content: string,
  userId: number
) {
  const reply = await prisma.comment.create({
    data: {
      parentId: commentId,
      studentId: studentId,
      content: content,
      teacherId: teacherId,
      createdBy: userId, // Ensure this field is correctly set to the userId
      // Removed the incorrect `user` argument
    },
  });
  return reply;
}

export async function getTeacherComments(teacherId: number, studentId: string) {
  return prisma.comment.findMany({
    where: {
      teacherId,
      studentId,
      parentId: null, // Get only parent comments (not replies)
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      teacher: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          academicPosition: {
            select: {
              title: true,
            },
          },
        },
      },
      replies: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              username: true,
              role: true,
            },
          },
          teacher: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              academicPosition: {
                select: {
                  title: true,
                },
              },
            },
          },
          student: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
