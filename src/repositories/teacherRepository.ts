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
        orderBy: {
          id: "asc",
        },
      },
    },
  });
  const count = await prisma.teacher.count();

  const teachersWithAppointments = teachers.map((teacher) => {
    return {
      ...teacher,
      TotalAppointments: {
        accepted: teacher.Appointment.filter((appt) => appt.isAccepted),
        pending: teacher.Appointment.filter((appt) => !appt.isAccepted),
      },
    };
  });

  return {
    teachers: {
      total: count,
      data: teachersWithAppointments,
    },
  };
}


export async function findTeacherByUserId( userId: number) {
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

