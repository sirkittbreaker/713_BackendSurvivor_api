import * as repo from "../repositories/studentRepository";

export async function getAllStudentsPagination(
  keyword: string,
  pageNo: number,
  pageSize: number
) {
    const pageStudents = await repo.getAllStudentsPagination(keyword, pageNo, pageSize);
    return pageStudents;
}