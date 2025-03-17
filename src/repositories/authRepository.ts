/**
 * User Repository
 * Handles database operations related to user management
 */
import { PrismaClient } from "@prisma/client";

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
