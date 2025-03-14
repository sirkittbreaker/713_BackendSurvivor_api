/**
 * Authentication Service
 * Provides secure password handling with bcrypt
 */
import bcrypt from "bcrypt";

/**
 * Salt rounds for bcrypt - balances security and performance
 */
const saltRounds = 10;

/**
 * Hashes a password using bcrypt
 * @param password - Plain text password
 * @returns Hashed password
 */
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Verifies a password against stored hash
 * @param password - Plain text password to check
 * @param hash - Stored password hash
 * @returns Boolean indicating if password matches
 */
export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
