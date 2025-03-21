import express from "express";
import * as authMiddleware from "../middlewares/authMiddleware";
import * as permissionMiddleware from "../middlewares/permissionMiddleware";
import * as teacherService from "../services/teacherService";
import * as commentService from "../services/commentService";
import { UserRole } from "../models/user";
const router = express.Router();

router.post(
  "/add",
  authMiddleware.jwtVerify,
  permissionMiddleware.checkPermission(UserRole.TEACHER),
  async (req, res) => {
    const teacher = await teacherService.findTeacherByUserId(req.body.user.id);
    if (!teacher) {
      res.status(404).send("Teacher not found");
      return;
    }
    const teacherId = teacher.id;
    const studentId = req.body.studentId;
    const content = req.body.content;

    if (!studentId || !content) {
      res.status(400).send("Student ID and content are required");
      return;
    }

    try {
      const newComment = await commentService.addComment(
        teacherId,
        studentId,
        content
      );
      res.json(newComment);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);

export default router;
