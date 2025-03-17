/**
 * User Repository
 * Handles database operations related to user management
 */
import { PrismaClient } from "@prisma/client";
import { UserRole } from "../models/user";

// Initialize database client
const prisma = new PrismaClient();

/**
 * Retrieves user by username
 * @param username - User's unique username
 * @returns User object or null if not found
 */
export async function findUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: { username },
  });
}

/**
 * Retrieves user by ID
 * @param id - User's numeric ID
 * @returns User object or null if not found
 */
export async function findUserById(id: number) {
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function createTeacher(
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  academicPositionId: number,
  departmentId: number,
  profile?: string
) {
  return prisma.user.create({
    data: {
      username,
      password,
      profile,
      role: UserRole.TEACHER,
      teacher: {
        create: {
          firstName,
          lastName,
          academicPositionId,
          departmentId,
        },
      },
    },
  });
}

export const createStudent = async (
  studentId: string,
  password: string,
  firstName: string,
  lastName: string,
  departmentId: number,
  profile?: string
) => {
  return prisma.user.create({
    data: {
      username: studentId,
      password,
      profile,
      role: UserRole.STUDENT,
      student: {
        create: {
          studentId,
          firstName,
          lastName,
          departmentId,
        },
      },
    },
  });
};
