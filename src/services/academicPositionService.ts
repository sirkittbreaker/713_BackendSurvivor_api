import * as repo from "../repositories/academicPositionRepository";

export async function getAllAcademicPositions() {
  const academicPositions = await repo.getAllAcademicPositions();
  return academicPositions;
}
