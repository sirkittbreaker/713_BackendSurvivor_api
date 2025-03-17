/**
 * Authentication Service
 * Provides secure password handling with bcrypt
 */
import bcrypt from "bcrypt";
import * as repo from "../repositories/authRepository";
import * as jwt from "jsonwebtoken";

/**
 * Salt rounds for bcrypt - balances security and performance
 */
const saltRounds = 10;

/**
 * Hashes a password using bcrypt
 * @param password - Plain text password
 * @returns Hashed password
 */
export function hashPassword(password: string) {
  return bcrypt.hash(password, saltRounds);
}

/**
 * Verifies a password against stored hash
 * @param password - Plain text password to check
 * @param hash - Stored password hash
 * @returns Boolean indicating if password matches
 */
export function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function generateToken(userId: number) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "4h" });
}

export async function getUserFromToken(token: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
  return await repo.findUserById(decoded.userId);
}

export async function findUserByUsername(username: string) {
  return await repo.findUserByUsername(username);
}
