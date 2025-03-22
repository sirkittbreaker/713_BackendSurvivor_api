import express from "express";
import * as teacherService from "../services/teacherService";
import * as studentService from "../services/studentService";
import * as authMiddleware from "../middlewares/authMiddleware";
import * as permissionMiddleware from "../middlewares/permissionMiddleware";
import { UserRole } from "../models/user";
import { get } from "http";
const router = express.Router();

// Route for getting all teachers with pagination (admin only)
router.get("/all", authMiddleware.jwtVerify, permissionMiddleware.checkPermission(UserRole.ADMIN),async (req, res) => {
    const pageSize = parseInt(req.query.pageSize as string) || 3;
    const pageNo = parseInt(req.query.pageNo as string) || 1;
  
    if (pageNo < 1 || pageSize < 1) {
      res.status(400).send("Invalid page number or page size");
      return;
   }
  
    try {
      const result = await teacherService.getAllTeachersPagination(pageNo, pageSize);
      if (result.teachers.data.length === 0) {
        res.status(404).send("No teacher found");
        return;
      }
      res.setHeader("x-total-count", result.teachers.total.toString());
      res.setHeader("Access-Control-Expose-Headers", "x-total-count");
      res.json(result.teachers.data);
    } catch (error) {
        res.status(500).send("Internal server error");
    } finally {
      console.log(`Request completed with pageNo: ${pageNo}, pageSize: ${pageSize}`);
    }
  });


  router.get("/my-teacher", authMiddleware.jwtVerify, permissionMiddleware.checkPermission(UserRole.STUDENT),async (req, res) => {
    const studentUserId = req.body.user.id;
    const student = await studentService.findStudentByUserId(studentUserId);
    if (!student) {
      res.status(404).send("Student not found");
      return;
    }
    try {
      const teacher = await teacherService.getTeacherByStudentId(student.studentId);
      if (!teacher) {
        res.status(404).send("No teacher found");
        return;
      }
      res.json(teacher);
    } catch (error) {
      res.status(500).send("Internal server error");
    } finally {
      console.log(`Request completed with studentId: ${student.id}`);
    }
  })


  router.get("/department/:id", authMiddleware.jwtVerify, permissionMiddleware.checkPermission(UserRole.ADMIN),async (req, res) => {
    const departmentId = parseInt(req.params.id);
    if (!departmentId) {
      res.status(400).send("Invalid departmentId");
      return;
    }
    try {
      const teachers = await teacherService.getTeacherByDepartmentId(departmentId);
      if (teachers.length === 0) {
        res.status(404).send("No teacher found");
        return;
      }
      res.json(teachers);
    } catch (error) {
      res.status(500).send("Internal server error");
    } finally {
      console.log(`Request completed with departmentId: ${departmentId}`);
    }
  })

  router.put("/:id/update", authMiddleware.jwtVerify, permissionMiddleware.checkPermission(UserRole.ADMIN),async (req, res) => {
    const teacherId = parseInt(req.params.id);
    if (!teacherId) {
      res.status(400).send("Invalid teacherId");
      return;
    }
    const { firstName, lastName, academicPositionId,departmentId } = req.body;
    try {
      const updatedTeacher = await teacherService.updateTeacherById(teacherId, { firstName ,lastName,academicPositionId ,departmentId });
      res.json(updatedTeacher);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  })

export default router;  