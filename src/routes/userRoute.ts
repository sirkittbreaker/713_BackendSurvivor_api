// Import dependencies
import express, { Request, Response } from "express";
import * as userService from "../services/userService";
import * as auth from "../middlewares/authMiddleware";
import * as permission from "../middlewares/permissionMiddleware";
import { UserRole } from "../models/user";

// Initialize router
const router = express.Router();

/**
 * Register a new user
 * POST /user/register
 * Creates user with specified role (ADMIN, TEACHER, STUDENT)
 */
router.post("/register", async (req: Request, res: Response) => {
  // Get request data
  const { username, password, role } = req.body;

  // Validate required fields
  if (!username || !password || !role) {
    res
      .status(400)
      .json({ error: "Username, password, and role are required" });
    return;
  }

  try {
    // Convert role string to enum
    const userRole = role as UserRole;

    // Create user in database
    const user = await userService.createUser(username, password, userRole);

    // Return success
    res.status(201).json(user);
  } catch (error) {
    // Log error and return generic message
    console.error("❌", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Log request completion
    console.log(
      `✅ Request completed at /user/register route with POST method with username: ${username}, role: ${role}, status code: ${res.statusCode}`
    );
  }
});

/**
 * User login
 * POST /user/login
 * Returns JWT token on success
 */
router.post("/login", async (req: Request, res: Response) => {
  // Get credentials
  const { username, password } = req.body;

  // Check required fields
  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  try {
    // Attempt authentication
    const { accessToken } = await userService.login(username, password);

    // Validate token exists
    if (!accessToken) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Return token
    res.status(200).json({ accessToken });
  } catch (error: any) {
    // Log error
    console.error("❌ Login error:", error.message || error);

    // Handle auth errors vs other errors
    if (error.name === "AuthenticationError") {
      res.status(401).json({ error: "Invalid credentials" });
    } else {
      res.status(500).json({ error: "An error occurred during login" });
    }
  } finally {
    // Log completion
    console.log(
      `✅ Request completed at /user/login route with POST method with username: ${username}, status code: ${res.statusCode}`
    );
  }
});

/**
 * Admin access check
 * GET /user/admin
 * Protected by JWT auth and admin role check
 */
router.get(
  "/admin",
  auth.jwtVerify, // Verify JWT token
  permission.checkPermission(UserRole.ADMIN), // Check admin role
  async (req: Request, res: Response) => {
    try {
      // Return success for admins
      res.status(200).json({ message: "Welcome, admin!" });
    } catch (error) {
      // Handle errors
      console.error("❌", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      // Log completion
      console.log(
        `✅ Request completed at /admin route with GET method, status code: ${res.statusCode}`
      );
    }
  }
);

// Export router
export default router;
