import * as repo from "../repositories/teacherRepository";

export async function getAllTeachersPagination(
  pageNo: number,
  pageSize: number
) {
    const pageTeachers = await repo.getAllTeachersPagination(pageNo, pageSize);
    return pageTeachers;
}
