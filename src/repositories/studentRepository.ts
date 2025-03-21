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
      department: {
        select: {
          name: true,
        },
      }
    },
  });
  return students;
}