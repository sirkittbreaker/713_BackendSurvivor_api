import * as repo from "../repositories/teacherRepository";
import { hashPassword } from "./authService";

export async function getAllTeachersPagination(
  pageNo: number,
  pageSize: number
) {
  const pageTeachers = await repo.getAllTeachersPagination(pageNo, pageSize);
  return pageTeachers;
}

export async function findTeacherByUserId(userId: number) {
  const teacher = await repo.findTeacherByUserId(userId);
  return teacher;
}

export async function getTeacherByStudentId(studentId: string) {
  const teacher = await repo.getTeacherByStudentId(studentId);
  return teacher;
}

export async function getTeacherByDepartmentId(departmentId: number) {
  const teacher = await repo.getTeacherByDepartmentId(departmentId);
  return teacher;
}

export async function updateTeacherById(teacherId: number, data: any) {
  const updatedTeacher = await repo.updateTeacherById(teacherId, data);
  return updatedTeacher;
}

export async function addTeacher(
  firstName: string,
  lastName: string,
  academicPositionId: number,
  departmentId: number,
  username: string,
  password: string,
  profile?: string
) {
  const hashedPassword = await hashPassword(password);

  const teacher = await repo.addTeacher(
    firstName,
    lastName,
    academicPositionId,
    departmentId,
    username,
    hashedPassword,
    profile
  );
  return teacher;
}
