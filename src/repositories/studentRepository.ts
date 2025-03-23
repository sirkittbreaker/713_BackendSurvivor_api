import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Function to get all students with pagination (admin only)
export async function getAllStudentsPagination(
  keyword: string,
  pageNo: number,
  pageSize: number
) {
  const where: any = {
    OR: [
      { studentId: { contains: keyword, mode: "insensitive" } },
      { firstName: { contains: keyword, mode: "insensitive" } },
      { lastName: { contains: keyword, mode: "insensitive" } },
    ],
  };
  const students = await prisma.student.findMany({
    where,
    skip: pageSize * (pageNo - 1),
    take: pageSize,
    select: {
      studentId: true,
      firstName: true,
      lastName: true,
      user: {
        select: {
          id: true,
          profile: true,
        },
      },
      department: {
        select: {
          id: true,
          name: true,
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
    },
  });
  const count = await prisma.student.count({ where });
  return { students, count };
}

export async function getAllStudentsByTeacherId(teacherId: number) {
  const students = await prisma.student.findMany({
    where: {
      teacherId,
    },
    select: {
      studentId: true,
      firstName: true,
      lastName: true,
      user: {
        select: {
          id: true,
          profile: true,
        },
      },
      department: {
        select: {
          id: true,
          name: true,
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
    },
  });
  return students;
}

export async function findStudentByUserId(userId: number) {
  const student = await prisma.student.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
      studentId: true,
      firstName: true,
      lastName: true,
      department: {
        select: {
          name: true,
        },
      },
    },
  });
  return student;
}

export async function updateTeacherId(studentId: string, teacherId: number) {
  const student = await prisma.student.update({
    where: {
      studentId,
    },
    data: {
      teacherId,
    },
  });
  return student;
}
