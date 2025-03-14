/**
 * User Repository
 * Database operations for user management using Prisma ORM
 */
import { PrismaClient } from "@prisma/client";
import * as authService from "../services/authService";
import { UserRole } from "../models/user";

// Initialize Prisma client for database access
const prisma = new PrismaClient();

/**
 * Creates new user with hashed password
 *
 * @param username - Unique username identifier
 * @param password - Plain text password (will be hashed)
 * @param role - User's system role
 * @returns Created user record from database
 */
export async function createUser(
  username: string,
  password: string,
  role: UserRole
) {
  // Hash password before storage
  const hashedPassword = await authService.hashPassword(password);
  return prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      role,
    },
  });
}

/**
 * Finds user by username
 *
 * @param username - Username to search for
 * @returns User record or null if not found
 */
export async function findUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: { username },
  });
}
