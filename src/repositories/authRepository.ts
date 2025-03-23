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
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      password: true,
      role: true,
      profile: true,
      teacher: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          department: {
            select: {
              id: true,
              name: true,
            },
          },
          academicPosition: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
      student: {
        select: {
          id: true,
          studentId: true,
          firstName: true,
          lastName: true,
          department: {
            select: {
              id: true,
              name: true,
            },
          },
          teacher: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              academicPosition: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) return null;

  // Return data based on role
  switch (user.role) {
    case "ROLE_ADMIN":
      return {
        id: user.id,
        username: user.username,
        password: user.password,
        role: user.role,
        profile: user.profile,
      };

    case "ROLE_TEACHER":
      return {
        id: user.id,
        username: user.username,
        password: user.password,
        role: user.role,
        profile: user.profile,
        teacher: user.teacher,
      };

    case "ROLE_STUDENT":
      return {
        id: user.id,
        username: user.username,
        password: user.password,
        role: user.role,
        profile: user.profile,
        student: user.student,
      };

    default:
      return user;
  }
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
