import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createDepartments() {
  const departments = [
    {
      name: "MMIT: สาขาวิชาการจัดการสมัยใหม่ และเทคโนโลยีสารสนเทศ (ปริญญาตรี)",
    },
    { name: "ANI: สาขาวิชาแอนิเมชันและวิชวลเอฟเฟกต์ (ปริญญาตรี)" },
    { name: "DG: สาขาวิชาดิจิทัลเกม (หลักสูตรสองภาษา) (ปริญญาตรี)" },
    { name: "SE: สาขาวิชาวิศวกรรมซอฟต์แวร์ (หลักสูตรนานาชาติ) (ปริญญาตรี)" },
    { name: "DII: สาขาบูรณาการอุตสาหกรรมดิจิทัล (ปริญญาตรี)" },
    { name: "SE: สาขาวิศวกรรมซอฟต์แวร์ (ปริญญาโท)" },
    { name: "KIM: สาขาการจัดการความรู้และนวัตกรรม (ปริญญาโท)" },
    { name: "DTM: สาขาการจัดการเทคโนโลยีดิจิทัล (ปริญญาโท)" },
    { name: "KIM: สาขาวิชาการจัดการความรู้ และนวัตกรรม (ปริญญาเอก)" },
  ];

  for (const department of departments) {
    await prisma.department.create({
      data: department,
    });
  }
}
