import express from "express";
import * as academicPositionService from "../services/academicPositionService";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const academicPositions =
      await academicPositionService.getAllAcademicPositions();
    res.json(academicPositions);
  } catch (error) {
    res.status(500).send("Internal server error");
  } finally {
    console.log("Request completed");
  }
});

export default router;
