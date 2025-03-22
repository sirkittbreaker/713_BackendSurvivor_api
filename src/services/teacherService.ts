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