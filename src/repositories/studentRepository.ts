import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Function to get all students with pagination (admin only)
export async function getAllStudentsPagination(
  keyword: string,
  pageNo: number,
  pageSize: number
) {
  const where = {
    OR: [
      { studentId: { contains: keyword } },
      { firstName: { contains: keyword } },
      { lastName: { contains: keyword } },
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
      teacherId: true,
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

export async function getStudentByStudentId(studentId: string) {
  const student = await prisma.student.findFirst({
    where: {
      studentId,
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
  return student;
}
