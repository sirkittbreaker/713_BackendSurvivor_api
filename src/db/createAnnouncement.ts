import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createAnnouncements() {
  const announcements = [
    {
      title: "ประกาศ",
      content: "ทดสอบประกาศ",
      fileUrl:
        "https://cnthruujnkkutwrqmslk.supabase.co/storage/v1/object/public/files/uploads/4f46f712eaa983f57ec86ddfbe1fe167.txt",
      teacherId: 1,
      createdAt: new Date("2025-03-28 08:01:15.744"),
      updatedAt: new Date("2025-03-28 08:01:15.744"),
    },
    {
      title: "ประกาศ 2",
      content: "ทดสอบประกาศ 2",
      fileUrl:
        "https://cnthruujnkkutwrqmslk.supabase.co/storage/v1/object/public/files/uploads/56eb3378d5a94c10c7c074858b5455b6.txt",
      teacherId: 1,
      createdAt: new Date("2025-03-28 08:02:49.831"),
      updatedAt: new Date("2025-03-28 08:02:49.831"),
    },
    {
      title: "ประกาศ 3",
      content: "ทดสอบประกาศ pdf",
      fileUrl:
        "https://cnthruujnkkutwrqmslk.supabase.co/storage/v1/object/public/files/uploads/d4d5577778b26a7eecec1b1a7022e02a.pdf",
      teacherId: 1,
      createdAt: new Date("2025-03-28 10:30:27.551"),
      updatedAt: new Date("2025-03-28 10:30:27.551"),
    },
  ];
  for (const announcement of announcements) {
    await prisma.announcement.create({
      data: announcement,
    });
    console.log(`✅ Created announcement: ${announcement.title}`);
  }
}
