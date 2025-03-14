/**
 * Role-based access control (RBAC) middleware
 * Verifies user permissions after authentication
 */
import { NextFunction } from "express";
import { UserRole } from "../models/user";

/**
 * Creates role-checking middleware
 * @param requiredRole - Role needed for access
 * @returns Middleware function
 */
export function checkPermission(requiredRole: UserRole) {
  return (req: any, res: any, next: NextFunction) => {
    try {
      // Get user from JWT verification
      const user = req.user;

      // No user = not authenticated
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Wrong role = forbidden
      if (user.role !== requiredRole) {
        return res.status(403).json({ error: "Forbidden" });
      }

      // Continue to route handler
      next();
    } catch (error) {
      // Log error and return generic message
      console.error("❌", error);
      res.status(500).json({ error: "Internal server error" });
      next(error);
    } finally {
      // Log result
      console.log(
        `✅ Permission check: role=${requiredRole}, status=${res.statusCode}`
      );
    }
  };
}
