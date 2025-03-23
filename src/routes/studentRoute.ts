import express from "express";
import * as studentService from "../services/studentService";
import * as teacherService from "../services/teacherService";
import * as authMiddleware from "../middlewares/authMiddleware";
import * as permissionMiddleware from "../middlewares/permissionMiddleware";
import { UserRole } from "../models/user";
const router = express.Router();

// Route for getting all students with pagination (admin only)
router.get(
  "/all",
  authMiddleware.jwtVerify,
  permissionMiddleware.checkPermission([UserRole.ADMIN]),
  async (req, res) => {
    const keyword = (req.query.keyword as string) || "";
    const pageSize = parseInt(req.query.pageSize as string) || 3;
    const pageNo = parseInt(req.query.pageNo as string) || 1;

    if (pageNo < 1 || pageSize < 1) {
      res.status(400).send("Invalid page number or page size");
      return;
    }

    try {
      const result = await studentService.getAllStudentsPagination(
        keyword,
        pageNo,
        pageSize
      );
      if (result.students.length === 0) {
        res.status(404).send("No student found");
        return;
      }
      res.setHeader("x-total-count", result.count.toString());
      res.setHeader("Access-Control-Expose-Headers", "x-total-count");
      res.json(result.students);
    } catch (error) {
      res.status(500).send("Internal server error");
    } finally {
      console.log(
        `Request completed with pageNo: ${pageNo}, pageSize: ${pageSize}`
      );
    }
  }
);

// Route for getting all students by teacherId (teacher only)
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
      const students = await studentService.getAllStudentsByTeacherId(
        teacher.id
      );
      if (students.length === 0) {
        res.status(404).send("No student found");
        return;
      }
      res.json(students);
    } catch (error) {
      res.status(500).send("Internal server error");
    } finally {
      console.log(`Request completed with teacherId: ${teacher.id}`);
    }
  }
);

// Route for update teacherId (admin only)
router.put(
  "/update-teacher",
  authMiddleware.jwtVerify,
  permissionMiddleware.checkPermission([UserRole.ADMIN]),
  async (req, res) => {
    const studentId = req.body.studentId as string;
    const teacherId = parseInt(req.body.teacherId as string);
    if (!teacherId) {
      res.status(400).send("Invalid teacherId");
      return;
    }

    try {
      await studentService.updateTeacherId(studentId, teacherId);
      res.send("Teacher updated successfully");
    } catch (error) {
      res.status(500).send("Internal server error");
    } finally {
      console.log(`Request completed with studentId: ${studentId}`);
    }
  }
);

// Route for getting all students by teacherId (admin only)
router.get(
  "/teacher/:id",
  authMiddleware.jwtVerify,
  permissionMiddleware.checkPermission([UserRole.ADMIN, UserRole.TEACHER]),
  async (req, res) => {
    const teacherId = parseInt(req.params.id);
    if (!teacherId) {
      res.status(400).send("Invalid teacherId");
      return;
    }
    try {
      const students = await studentService.getAllStudentsByTeacherId(
        teacherId
      );
      if (students.length === 0) {
        res.status(404).send("No student found");
        return;
      }
      res.json(students);
    } catch (error) {
      res.status(500).send("Internal server error");
    } finally {
      console.log(`Request completed with teacherId: ${teacherId}`);
    }
  }
);

export default router;
