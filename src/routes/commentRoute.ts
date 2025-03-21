import express from "express";
import * as authMiddleware from "../middlewares/authMiddleware";
import * as permissionMiddleware from "../middlewares/permissionMiddleware";
import * as teacherService from "../services/teacherService";
import * as studentService from "../services/studentService";
import * as commentService from "../services/commentService";
import { UserRole } from "../models/user";
const router = express.Router();


// Route for adding a comment (teacher only)
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


// Route for adding a reply (teacher only)
router.post("/teacher-reply", authMiddleware.jwtVerify, permissionMiddleware.checkPermission(UserRole.TEACHER), async (req, res) => {
  const commentId = req.body.commentId;
  const teacher = await teacherService.findTeacherByUserId(req.body.user.id);
  if (!teacher) {
    res.status(404).send("Teacher not found");
    return;
  }
  const teacherId = teacher.id;
  const studentId = req.body.studentId;
  const content = req.body.content;

  if (!commentId || !content) {
    res.status(400).send("Comment ID and content are required");
    return;
  }

  try {
    const newReply = await commentService.addReply(commentId, studentId, teacherId, content);
    res.json(newReply);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  } finally {
    console.log(`Reply added by ${teacherId} to comment ${commentId}`);
  }

}
);


// Route for adding a reply (student only)
router.post(
  "/student-reply",
  authMiddleware.jwtVerify,
  permissionMiddleware.checkPermission(UserRole.STUDENT),
  async (req, res) => {
    const commentId = req.body.commentId;
    const student = await studentService.findStudentByUserId(req.body.user.id);
    if (!student) {
      res.status(404).send("Student not found");
      return;
    }
    const studentId = student.studentId;
    const teacher = await teacherService.getTeacherByStudentId(
      studentId
    );
    if (!teacher) {
      res.status(404).send("Teacher not found");
      return;
    }
    const teacherId = teacher.id;
    const content = req.body.content;

    if (!commentId || !content) {
      res.status(400).send("Comment ID and content are required");
      return;
    }

    try {
      const newReply = await commentService.addReply(
        commentId,
        studentId,
        teacherId,
        content
      );
      res.json(newReply);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    } finally {
      console.log(`Reply added by ${studentId} to comment ${commentId}`);
    }
  }
);

export default router;
