import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllAnnouncementsByTeacherId(teacherId: number) {
  const announcements = await prisma.announcement.findMany({
    where: {
      teacherId: teacherId,
    },
  });

  return announcements;
}

export async function addAccouncement(
  title: string,
  content: string,
  fileUrl: string,
  teacherId: number
) {
  const announcement = await prisma.announcement.create({
    data: {
      title: title,
      content: content,
      fileUrl: fileUrl,
      teacherId: teacherId,
    },
  });

  return announcement;
}

export async function getLatestAnnouncementByTeacherId(teacherId: number) {
  const announcement = await prisma.announcement.findFirst({
    where: {
      teacherId: teacherId,
    },
    orderBy: {
      createdAt: "desc", // Sort by newest first
    },
    include: {
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

  return announcement;
}

export async function getAnnouncementsForStudent(teacherId: number) {
  const announcements = await prisma.announcement.findMany({
    where: {
      teacherId: teacherId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return announcements;
}