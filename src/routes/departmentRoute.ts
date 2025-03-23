import express from "express";
import * as departmentService from "../services/departmentService";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const departments = await departmentService.getAllDepartments();
    res.json(departments);
  } catch (error) {
    res.status(500).send("Internal server error");
  } finally {
    console.log("Request completed");
  }
});

export default router;
