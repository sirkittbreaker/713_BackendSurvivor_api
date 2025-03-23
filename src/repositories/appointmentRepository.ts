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

export async function updateAppointmentStatus(
  appointmentId: number,
  status: string
) {
  const appointment = await prisma.appointment.update({
    where: {
      id: appointmentId,
    },
    data: {
      status: status,
    },
  });

  return appointment;
}

export async function updateFinalTime(appointmentId: number, finalTime: Date) {
  const appointment = await prisma.appointment.update({
    where: {
      id: appointmentId,
    },
    data: {
      finalTime: finalTime,
    },
  });

  return appointment;
}

export async function findRequestedById(appointmentId: number) {
  const appointment = await prisma.appointment.findUnique({
    where: {
      id: appointmentId,
    },
    select: {
      requestedTime: true,
    },
  });

  return appointment;
}

// Function to add an appointment (student only)
export async function addAppointment(
  requestedTime: Date,
  studentId: string,
  teacherId: number,
  title: string,
  content: string
) {
  const appointment = await prisma.appointment.create({
    data: {
      requestedTime: requestedTime,
      title: title,
      content: content,
      student: {
        connect: {
          studentId: studentId,
        },
      },
      teacher: {
        connect: {
          id: teacherId,
        },
      },
    },
  });

  return appointment;
}


// Function to confirm an appointment (student only)
export async function confirmAppointment(appointmentId: number) {
  const appointment = await prisma.appointment.update({
    where: {
      id: appointmentId,
    },
    data: {
      isAccepted: true,
    },
  });

  return appointment;
}
