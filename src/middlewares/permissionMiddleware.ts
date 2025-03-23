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
export function checkPermission(allowedRoles: UserRole[]) {
  return (req: any, res: any, next: NextFunction) => {
    try {
      const user = req.body.user;

      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Check if user's role is in the allowed roles array
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      next();
    } catch (error) {
      console.error("❌", error);
      res.status(500).json({ error: "Internal server error" });
      next(error);
    } finally {
      console.log(
        `✅ Permission check: allowed=${allowedRoles.join("|")}, actual=${
          req.body.user
        }, status=${res.statusCode}`
      );
    }
  };
}
