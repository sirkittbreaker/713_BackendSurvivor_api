/**
 * Authentication Routes
 * Handles user login, profile access, and admin verification
 */
import express from "express";
import * as authService from "../services/authService";
import * as authMiddleware from "../middlewares/authMiddleware";
import * as permissionMiddleware from "../middlewares/permissionMiddleware";
import { UserRole } from "../models/user";

// Initialize router
const router = express.Router();

/**
 * User Authentication
 * POST /authenticate
 * Verifies credentials and issues JWT token
 */
router.post("/authenticate", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find user by username
    const user = await authService.findUserByUsername(username);
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Validate password exists
    if (!password || !user.password) {
      res.status(400).json({ message: "Password is required" });
      return;
    }

    // Verify password
    const isPasswordCorrect = await authService.comparePassword(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Generate and return token
    const token = authService.generateToken(user.id);
    res.status(200).json({
      status: "success",
      access_token: token,
      user: {
        id: user.id,
        username: user.username,
        profile: user.profile,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("❌ Login error:", error.message || error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    console.log(`✅ Auth attempt: user=${username}, status=${res.statusCode}`);
  }
});

/**
 * Get Current User Profile
 * GET /me
 * Requires valid JWT token
 */
router.get("/me", authMiddleware.jwtVerify, async (req, res) => {
  try {
    // Get authenticated user from middleware
    const user = req.body.user;

    // Return user profile data
    res.status(200).json({
      status: "success",
      user: {
        id: user.id,
        username: user.username,
        profile: user.profile,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    console.log(`✅ Profile access: status=${res.statusCode}`);
  }
});

/**
 * Admin Access Check
 * GET /admin
 * Requires valid JWT token and ADMIN role
 */
router.get(
  "/admin",
  authMiddleware.jwtVerify,
  permissionMiddleware.checkPermission(UserRole.ADMIN),
  async (req, res) => {
    try {
      // Return success message for admin
      res.status(200).json({
        status: "success",
        message: "You are an admin",
      });
    } catch (error) {
      console.error("❌", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      console.log(`✅ Admin access: status=${res.statusCode}`);
    }
  }
);

// Export router
export default router;
