/**
 * Authentication Routes
 * Handles user login, profile access, and admin verification
 */
import express from "express";
import * as authService from "../services/authService";
import * as authMiddleware from "../middlewares/authMiddleware";
import * as permissionMiddleware from "../middlewares/permissionMiddleware";
import { UserRole } from "../models/user";
import multer from "multer";
import { uploadFile } from "../services/uploadFileService";
import dotenv from "dotenv";

dotenv.config();

// Initialize router
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

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
  } catch (error) {
    console.error("❌", error);
    res.status(500).json({ message: "Internal server error" });
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
    // Remove password from user object before sending
    const { password: _, ...userWithoutPassword } = user;

    // Return user profile data
    res.status(200).json({
      status: "success",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("❌", error);
    res.status(500).json({ message: "Internal server error" });
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
      res.status(500).json({ message: "Internal server error" });
    } finally {
      console.log(`✅ Admin access: status=${res.statusCode}`);
    }
  }
);

router.post(
  "/registerTeacher",
  authMiddleware.jwtVerify,
  permissionMiddleware.checkPermission(UserRole.ADMIN),
  upload.single("profile"),
  async (req, res) => {
    const {
      username,
      password,
      firstName,
      lastName,
      academicPositionId,
      departmentId,
    } = req.body;
    if (
      !username ||
      !password ||
      !firstName ||
      !lastName ||
      !academicPositionId ||
      !departmentId
    ) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    try {
      let profileUrl: string | undefined;

      // Only attempt file upload if a file was provided
      if (req.file) {
        const bucket = process.env.SUPABASE_BUCKET_NAME;
        const filePath = process.env.UPLOAD_DIR;

        if (!bucket || !filePath) {
          res.status(500).send("Bucket name or file path not configured.");
          return;
        }

        // Upload the file and get the URL
        profileUrl = await uploadFile(bucket, filePath, req.file);
      }

      // Register the teacher with the profile URL if available
      const teacher = await authService.registerTeacher(
        username,
        password,
        firstName,
        lastName,
        parseInt(academicPositionId),
        parseInt(departmentId),
        profileUrl
      );
      res.status(201).json(teacher);
    } catch (error) {
      console.error("❌", error);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      console.log(
        `✅ Request completed at /registerTeacher route with POST method with username: ${username}, firstName: ${firstName}, lastName: ${lastName}, academicPositionId: ${academicPositionId}, departmentId: ${departmentId}`
      );
    }
  }
);

router.post("/registerStudent", upload.single("profile"), async (req, res) => {
  const { username, password, firstName, lastName, departmentId } = req.body;
  if (!username || !password || !firstName || !lastName || !departmentId) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }
  try {
    let profileUrl: string | undefined;

    // Only attempt file upload if a file was provided
    if (req.file) {
      const bucket = process.env.SUPABASE_BUCKET_NAME;
      const filePath = process.env.UPLOAD_DIR;

      if (!bucket || !filePath) {
        res.status(500).send("Bucket name or file path not configured.");
        return;
      }

      // Upload the file and get the URL
      profileUrl = await uploadFile(bucket, filePath, req.file);
    }

    // Register the student with the profile URL if available
    const student = await authService.registerStudent(
      username,
      password,
      firstName,
      lastName,
      parseInt(departmentId),
      profileUrl
    );
    res.status(201).json(student);
  } catch (error) {
    console.error("❌", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    console.log(
      `✅ Request completed at /registerStudent route with POST method with username: ${username}, firstName: ${firstName}, lastName: ${lastName}, departmentId: ${departmentId}`
    );
  }
});

// Export router
export default router;
