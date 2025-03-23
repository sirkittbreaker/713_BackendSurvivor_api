/**
 * JWT Authentication middleware
 * Verifies token from Authorization header
 */
import type { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService";

/**
 * Validates JWT token in request header
 * On success: attaches decoded user to req.user
 * On failure: returns 401 Unauthorized
 */
export async function jwtVerify(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Extract token from Authorization header if present
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Reject request if no token provided
  if (!token) {
    res
      .status(401)
      .json({ message: "You are not logged in! Please log in to get access" });
    return;
  }

  try {
    // Validate token and retrieve associated user
    const userInfo = await authService.getUserFromToken(token);

    // Reject if token valid but no user found
    if (!userInfo) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Attach user info to request for downstream handlers
    req.body.user = userInfo;
  } catch (error: unknown) {
    // Handle server configuration errors
    console.error("❌", error);
    if (error instanceof Error && error.name === "JWT_SECRET is not defined") {
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    // All other errors treated as authentication failures
    res.status(401).json({ message: "Authentication failed" });
    return;
  }

  // Proceed to next middleware/route handler
  next();
}
