import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Function to get all teachers with pagination (admin only)
export async function getAllTeachersPagination(
  pageNo: number,
  pageSize: number
) {
  const teachers = await prisma.teacher.findMany({
    skip: pageSize * (pageNo - 1),
    take: pageSize,
    select: {
      id: true,
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
      academicPosition: {
        select: {
          id: true,
          title: true,
        },
      },
      _count: {
        select: {
          students: true,
        },
      },
      Appointment: {
        select: {
          id: true,
          requestedTime: true,
          finalTime: true,
          status: true,
          isAccepted: true,
          student: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const count = await prisma.teacher.count();
console.log(teachers);
 return { teachers, count };
}

export async function findTeacherByUserId(userId: number) {
  const teacher = await prisma.teacher.findFirst({
    where: {
      userId,
    },
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
  });
  return teacher;
}

export async function getTeacherByStudentId(studentId: string) {
  const teacher = await prisma.teacher.findFirst({
    where: {
      students: {
        some: {
          studentId: studentId,
        },
      },
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      academicPosition: {
        select: {
          title: true,
        },
      },
      department: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          id: true,
          profile: true,
        },
      },
    },
  });
  return teacher;
}


export async function getTeacherByDepartmentId(departmentId: number) {
  const teachers = await prisma.teacher.findMany({
    where: {
      departmentId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      academicPosition: {
        select: {
          title: true,
        },
      },
      user: {
        select: {
          id: true,
          profile: true,
        },
      },
    },
  });
  return teachers;
}

export async function updateTeacherById(teacherId: number, data: any) {
  const teacher = await prisma.teacher.update({
    where: {
      id: teacherId,
    },
    data: {
      ...data,
    },
  });
  return teacher;
}