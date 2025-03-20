import express from "express";
import * as studentService from "../services/studentService";
import * as authMiddleware from "../middlewares/authMiddleware";
import * as permissionMiddleware from "../middlewares/permissionMiddleware";
import { UserRole } from "../models/user";
const router = express.Router();

// Route for getting all students with pagination (admin only)
router.get(
  "/all",
  authMiddleware.jwtVerify,
  permissionMiddleware.checkPermission(UserRole.ADMIN),
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

export default router;
