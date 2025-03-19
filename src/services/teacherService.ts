import * as repo from "../repositories/teacherRepository";

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