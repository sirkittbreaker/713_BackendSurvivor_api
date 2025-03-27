import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllAppointments() {
  const appointments = await prisma.appointment.findMany({
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

  // Group appointments by status
  const groupedAppointments = {
    AWAITING_RESPONSE: appointments.filter((appointment) => appointment.status === 'รอการตอบรับจากอาจารย์'),
    ACCEPTED_BY_TEACHER: appointments.filter((appointment) => appointment.status === 'ยอมรับโดยอาจารย์'),
    NEW_DATE_PURPOSED: appointments.filter((appointment) => appointment.status === 'เสนอเวลานัดหมายใหม่'),
    APPOINTMENT_CONFIRMED: appointments.filter((appointment) => appointment.status === 'ยืนยันการนัดหมาย'),
    CANCELLED_BY_TEACHER: appointments.filter((appointment) => appointment.status === 'ยกเลิกโดยอาจารย์'),
    CANCELLED_BY_STUDENT: appointments.filter((appointment) => appointment.status === 'ยกเลิกโดยนักเรียน'),
  };

  return groupedAppointments;
}

export async function getAppointmentsByStudentId(studentId: string) {
  const appointments = await prisma.appointment.findMany({
    where: {
      studentId: studentId,
    },
    orderBy: {
      createdAt: 'desc', // Sort appointments by createdAt in descending order (newest to oldest)
    },
    select: {
      id: true,
      title: true,
      content: true,
      requestedTime: true,
      finalTime: true,
      status: true,
      isAccepted: true,
      createdAt: true,
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

  return appointments;
}



export async function getAppointmentsByTeacherId(teacherId: number) {
  const appointments = await prisma.appointment.findMany({
    where: {
      teacherId: teacherId,
    },
    orderBy: {
      createdAt: 'desc', // Sort appointments by createdAt in descending order (newest to oldest)
    },
    select: {
      id: true,
      title: true,
      content: true,
      requestedTime: true,
      finalTime: true,
      status: true,
      isAccepted: true,
      createdAt: true,
      student: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          user: {
            select: {
              profile: true
            },
          }
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

  return appointments;
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


