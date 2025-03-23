import * as repo from "../repositories/departmentRepositorty";

export async function getAllDepartments() {
  const departments = await repo.getAllDepartments();
  return departments;
}
