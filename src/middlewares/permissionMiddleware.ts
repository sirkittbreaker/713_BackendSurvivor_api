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
      // This user should have been attached by the authentication middleware
      const user = req.body.user;

      // No user = not authenticated
      // Return 401 if user object is missing
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Wrong role = forbidden
      // Return 403 if user has wrong role for this resource
      if (user.role !== requiredRole) {
        return res.status(403).json({ error: "Forbidden" });
      }

      // Continue to route handler
      // User has the required role, proceed to the next middleware
      next();
    } catch (error) {
      // Log error and return generic message
      // This avoids leaking implementation details in error responses
      console.error("❌", error);
      res.status(500).json({ error: "Internal server error" });
      next(error);
    } finally {
      // Log result
      // Records the permission check result for auditing/debugging
      console.log(
        `✅ Permission check: role=${requiredRole}, status=${res.statusCode}`
      );
    }
  };
}
