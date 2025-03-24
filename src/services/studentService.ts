import * as repo from "../repositories/studentRepository";

export async function getAllStudentsPagination(
  keyword: string,
  pageNo: number,
  pageSize: number
) {
  const pageStudents = await repo.getAllStudentsPagination(
    keyword,
    pageNo,
    pageSize
  );
  return pageStudents;
}

export async function getAllStudentsByTeacherId(teacherId: number) {
  const students = await repo.getAllStudentsByTeacherId(teacherId);
  return students;
}

export async function findStudentByUserId(userId: number) {
  const student = await repo.findStudentByUserId(userId);
  return student;
}

export async function updateTeacherId(studentId: string, teacherId: number) {
  await repo.updateTeacherId(studentId, teacherId);
}

export async function getStudentByStudentId(studentId: string) {
  const student = await repo.getStudentByStudentId(studentId);
  return student;
}
