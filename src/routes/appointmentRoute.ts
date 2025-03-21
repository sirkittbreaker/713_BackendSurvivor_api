import express from "express";
import * as appointmentService from "../services/appointmentService";
import * as studentService from "../services/studentService";
import * as teacherService from "../services/teacherService";
import * as authMiddleware from "../middlewares/authMiddleware";
import * as permissionMiddleware from "../middlewares/permissionMiddleware";
import { UserRole } from "../models/user";
const router = express.Router();

// Route for getting all appointments with pagination (admin only)
router.get(
  "/all",
  authMiddleware.jwtVerify,
  permissionMiddleware.checkPermission(UserRole.ADMIN),
  async (req, res) => {
    const pageSize = parseInt(req.query.pageSize as string) || 3;
    const pageNo = parseInt(req.query.pageNo as string) || 1;

    if (pageNo < 1 || pageSize < 1) {
      res.status(400).send("Invalid page number or page size");
      return;
    }

    try {
      const result = await appointmentService.getAllAppointmentsPagination(
        pageNo,
        pageSize
      );
      if (result.appointments.length === 0) {
        res.status(404).send("No appointment found");
        return;
      }
      res.setHeader("x-total-count", result.count.toString());
      res.setHeader("Access-Control-Expose-Headers", "x-total-count");
      res.json(result.appointments);
    } catch (error) {
      res.status(500).send("Internal server error");
    } finally {
      console.log(
        `Request completed with pageNo: ${pageNo}, pageSize: ${pageSize}`
      );
    }
  }
);

// Route for confirming an appointment (teacher only)
router.put(
  "/:id/teacher-confirm",
  authMiddleware.jwtVerify,
  permissionMiddleware.checkPermission(UserRole.TEACHER),
  async (req, res) => {
    const { id } = req.params;
    const requestedTime = await appointmentService.findRequestedTimeById(
      parseInt(id)
    );

    if (!requestedTime) {
      res.status(404).json({ error: "Requested time not found" });
      return;
    }
    try {
      const updateFinalTime = await appointmentService.updateFinalTime(
        parseInt(id),
        requestedTime.requestedTime
      );
      const updatedAppointment =
        await appointmentService.updateAppointmentStatus(
          parseInt(id),
          "CONFIRMED"
        );
      res.json({ updatedAppointment, updateFinalTime });
    } catch (error) {
      res.status(500).json({ error: "Failed to confirm appointment" });
    }
  }
);

// Route for rescheduling an appointment (teacher only)
router.put(
  "/:id/teacher-reschedule",
  authMiddleware.jwtVerify,
  permissionMiddleware.checkPermission(UserRole.TEACHER),
  async (req, res) => {
    const { id } = req.params;
    const { finalTime } = req.body;
    const requestedTime = await appointmentService.findRequestedTimeById(
      parseInt(id)
    );

    if (!requestedTime) {
      res.status(404).json({ error: "Requested time not found" });
      return;
    }
    try {
      const updatedAppointment = await appointmentService.updateFinalTime(
        parseInt(id),
        finalTime
      );
      const updatedStatus = await appointmentService.updateAppointmentStatus(
        parseInt(id),
        "RESCHEDULED"
      );
      res.json({ updatedStatus, updatedAppointment });
    } catch (error) {
      res.status(500).json({ error: "Failed to reschedule appointment" });
    }
  }
);

// Route for canceling an appointment (teacher only)
router.put(
  "/:id/teacher-cancel",
  authMiddleware.jwtVerify,
  permissionMiddleware.checkPermission(UserRole.TEACHER),
  async (req, res) => {
    const { id } = req.params;
    try {
      const updatedAppointment =
        await appointmentService.updateAppointmentStatus(
          parseInt(id),
          "CANCELED"
        );
      res.json(updatedAppointment);
    } catch (error) {
      res.status(500).json({ error: "Failed to cancel appointment" });
    }
  }
);


// Route for creating a new appointment (student only)
router.post(
  "/new-appointment",
  authMiddleware.jwtVerify,
  permissionMiddleware.checkPermission(UserRole.STUDENT),
  async (req, res) => {
    const { requestedTime, title, content } = req.body;
    const student = await studentService.findStudentByUserId(req.body.user.id);
    if (!student) {
      res.status(404).json({ error: "Student not found" });
      return;
    }
    const studentId = student.studentId;

    const teacher = await teacherService.getTeacherByStudentId(studentId);
    if (!teacher) {
      res.status(404).json({ error: "Teacher not found" });
      return;
    }
    const teacherId = teacher.id;
    try {
      const newAppointment = await appointmentService.addAppointment(
        requestedTime,
        studentId,
        teacherId,
        title,
        content
      );
      res.json(newAppointment);
    } catch (error) {
      res.status(500).json({ error: "Failed to create appointment" });
    } finally {
      console.log(
        `Request completed with studentId: ${studentId} with title ${title}`
      );
    }
  }
);


// Route for getting all appointments for a student (student only)
router.put(
  "/:id/student-confirm",
  authMiddleware.jwtVerify,
  permissionMiddleware.checkPermission(UserRole.STUDENT),
  async (req, res) => {
    const { id } = req.params;
    try {
      const updatedAppointment =
        await appointmentService.updateAppointmentStatus(
          parseInt(id),
          "CONFIRMED"
        );
      const confirmedAppointment = await appointmentService.confirmAppointment(
        parseInt(id)
      );
      res.json(confirmedAppointment);
    } catch (error) {
      res.status(500).json({ error: "Failed to confirm appointment" });
    } finally {
      console.log(`Request completed with appointmentId: ${id}`);
    }
  }
);


// Route for canceling an appointment (student only)
router.put(
  "/:id/student-cancel",
  authMiddleware.jwtVerify,
  permissionMiddleware.checkPermission(UserRole.STUDENT),
  async (req, res) => {
    const { id } = req.params;
    try {
      const updatedAppointment =
        await appointmentService.updateAppointmentStatus(
          parseInt(id),
          "CANCELED"
        );
      res.json(updatedAppointment);
    } catch (error) {
      res.status(500).json({ error: "Failed to cancel appointment" });
    }
  }
);

export default router;
