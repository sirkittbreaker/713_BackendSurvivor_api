import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function createAppointments() {
  const appointments = [
    {
      title: "thesis update",
      content: "change the thesis topic",
      requestedTime: new Date("2022-01-01 00:00:00.000"),
      finalTime: new Date("2022-01-01 00:00:00.000"),
      status: "ยืนยันการนัดหมาย",
      isAccepted: true,
      createdAt: new Date("2025-03-26 14:57:03.770"),
      updatedAt: new Date("2025-03-27 13:36:53.676"),
      teacherId: 1,
      studentId: "689999999",
    },
    {
      title: "create appointment 1",
      content: "test create appointment1",
      requestedTime: new Date("2025-03-29 02:30:00.000"),
      finalTime: new Date("2025-03-30 03:30:00.000"),
      status: "ยืนยันการนัดหมาย",
      isAccepted: true,
      createdAt: new Date("2025-03-27 12:07:21.472"),
      updatedAt: new Date("2025-03-27 13:26:43.343"),
      teacherId: 1,
      studentId: "689999999",
    },
    {
      title: "create appointment 2",
      content: "test test",
      requestedTime: new Date("2025-03-30 05:00:00.000"),
      finalTime: null,
      status: "ยกเลิกโดยนักศึกษา",
      isAccepted: false,
      createdAt: new Date("2025-03-27 14:52:01.253"),
      updatedAt: new Date("2025-03-27 14:53:02.442"),
      teacherId: 1,
      studentId: "689999999",
    },
    {
      title: "Awaiting response",
      content: "รออยู่ครับจาร",
      requestedTime: new Date("2025-03-30 17:00:00.000"),
      finalTime: null,
      status: "รอการตอบรับจากอาจารย์",
      isAccepted: false,
      createdAt: new Date("2025-03-27 14:54:48.108"),
      updatedAt: new Date("2025-03-27 14:54:48.108"),
      teacherId: 1,
      studentId: "689999999",
    },
    {
      title: "New date",
      content: "จารไม่ว่างสินะ",
      requestedTime: new Date("2025-04-04 20:00:00.000"),
      finalTime: new Date("2025-05-06 02:30:00.000"),
      status: "เสนอเวลานัดหมายใหม่",
      isAccepted: false,
      createdAt: new Date("2025-03-27 15:05:40.877"),
      updatedAt: new Date("2025-03-27 15:10:29.089"),
      teacherId: 1,
      studentId: "689999999",
    },
    {
      title: "Cancel by teacher",
      content: "จารยกเลิก",
      requestedTime: new Date("2025-04-06 01:00:00.000"),
      finalTime: null,
      status: "ยกเลิกโดยอาจารย์",
      isAccepted: false,
      createdAt: new Date("2025-03-27 15:07:07.824"),
      updatedAt: new Date("2025-03-27 15:09:41.581"),
      teacherId: 1,
      studentId: "689999999",
    },
    {
      title: "Accepted by teacher",
      content: "จารยอมรับ",
      requestedTime: new Date("2025-04-09 03:00:00.000"),
      finalTime: new Date("2025-04-09 03:00:00.000"),
      status: "ยอมรับโดยอาจารย์",
      isAccepted: false,
      createdAt: new Date("2025-03-27 15:08:15.799"),
      updatedAt: new Date("2025-03-27 15:08:54.454"),
      teacherId: 1,
      studentId: "689999999",
    },
  ];

  for (const appointment of appointments) {
    await prisma.appointment.create({
      data: appointment,
    });
    console.log(`✅ Created appointment: ${appointment.title}`);
  }
}
