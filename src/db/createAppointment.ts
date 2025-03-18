import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createAppointments() {
    const appointment1 = await prisma.appointment.create({
        data: {
            title: "thesis update",
            content: "change the thesis topic",
            date: new Date("2022-01-01"),
            studentId: "679999999",
            teacherId: 1,
        },
    });
}