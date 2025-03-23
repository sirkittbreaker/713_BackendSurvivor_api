import express from "express";
import * as announcementService from "../services/announcementService";
import * as teacherService from "../services/teacherService";
import * as authMiddleware from "../middlewares/authMiddleware";
import * as permissionMiddleware from "../middlewares/permissionMiddleware";
import multer from "multer";
import { uploadFile } from "../services/uploadFileService";
import { UserRole } from "../models/user";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Route for getting announcements by teacher (teacher only)
router.get(
  "/byteacher",
  authMiddleware.jwtVerify,
  permissionMiddleware.checkPermission([UserRole.TEACHER]),
  async (req, res) => {
    const teacherUserId = req.body.user.id;
    const teacher = await teacherService.findTeacherByUserId(teacherUserId);
    if (!teacher) {
      res.status(404).send("Teacher not found");
      return;
    }
    try {
      const announcements =
        await announcementService.getAllAnnouncementsByTeacherId(teacher.id);
      res.json(announcements);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    } finally {
      console.log(`Request completed with teacherId: ${teacher.id}`);
    }
  }
);

// Route for uploading an announcement (teacher only)
router.post(
  "/add",
  authMiddleware.jwtVerify,
  permissionMiddleware.checkPermission([UserRole.TEACHER]),
  upload.single("announcement"),
  async (req, res) => {
    const { title, content, teacherId } = req.body;
    const teacherIdNumber = parseInt(teacherId);

    if (!title || !content || !teacherIdNumber) {
      res.status(400).send("Title, content and teacherId are required");
      return;
    }

    try {
      let fileUrl: string = "";

      if (req.file) {
        const bucket = process.env.SUPABASE_BUCKET_NAME || "";
        const filePath = process.env.UPLOAD_DIR || "";

        if (!bucket || !filePath) {
          res.status(500).send("Bucket name or file path not configured.");
          return;
        }

        fileUrl = await uploadFile(bucket, filePath, req.file);
      }

      const newAnnouncement = await announcementService.addAnnouncement(
        title,
        content,
        fileUrl,
        teacherIdNumber
      );
      res.json(newAnnouncement);
    } catch (error) {
      console.error("❌", error);
      res.status(500).send("Internal server error");
    } finally {
      console.log(
        `✅ Announcement added with title: ${title} and teacherId: ${teacherId}`
      );
    }
  }
);

export default router;
