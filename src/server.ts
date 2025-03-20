import express, { Request, Response } from "express";
import authRoute from "./routes/authRoute";
import teacherRoute from "./routes/teacherRoute";
import studentRoute from "./routes/studentRoute";
import appointmentRoute from "./routes/appointmentRoute";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();
app.use(cors(options));
app.use(express.json());
const port = process.env.PORT || 3000;

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/students", studentRoute);
app.use("/api/v1/teachers", teacherRoute);
app.use("/api/v1/appointments", appointmentRoute);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
