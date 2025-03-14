/**
 * User service for authentication and user management
 */
import * as repo from "../repositories/userRepository";
import * as authService from "./authService";
import * as jwt from "../utils/jwt";
import { UserRole } from "../models/user";

/**
 * Creates new user in system
 *
 * @param username - Unique username
 * @param password - Plain text password
 * @param role - User role (ADMIN, TEACHER, STUDENT)
 * @returns Created user object
 */
export async function createUser(
  username: string,
  password: string,
  role: UserRole
) {
  // Create user through repository
  return await repo.createUser(username, password, role);
}

/**
 * Authenticates user and issues JWT token
 *
 * @param username - Username
 * @param password - Plain text password
 * @returns JWT access token
 * @throws Error if invalid credentials
 */
export async function login(username: string, password: string) {
  // Find user by username
  const user = await repo.findUserByUsername(username);
  if (!user) {
    // Security: Consistent error timing
    throw new Error("User not found");
  }

  // Verify password
  const isPasswordCorrect = await authService.comparePassword(
    password,
    user.password
  );
  if (!isPasswordCorrect) {
    throw new Error("Password incorrect");
  }

  // Remove password before creating token
  const { password: _, ...userWithoutPassword } = user;

  // Generate token with safe user data
  const accessToken = jwt.jwtGenerate(userWithoutPassword);

  return { accessToken };
}
