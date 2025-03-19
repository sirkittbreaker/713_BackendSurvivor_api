import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// Function to get all appointments with pagination (admin only)
export async function getAllAppointmentsPagination(
  pageNo: number,
  pageSize: number
) {
  const appointments = await prisma.appointment.findMany({
    skip: pageSize * (pageNo - 1),
    take: pageSize,
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
  const count = await prisma.appointment.count();

  return { appointments, count };
}
