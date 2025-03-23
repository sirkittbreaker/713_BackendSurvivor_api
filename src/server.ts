import express, { Request, Response } from "express";
import authRoute from "./routes/authRoute";
import teacherRoute from "./routes/teacherRoute";
import studentRoute from "./routes/studentRoute";
import appointmentRoute from "./routes/appointmentRoute";
import commentRoute from "./routes/commentRoute";
import announcementRoute from "./routes/announcementRoute";
import departmentRoute from "./routes/departmentRoute";
import academicPositionRoute from "./routes/academicPositionRoute";
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

app.use('/api/v1/students', studentRoute);
app.use('/api/v1/teachers', teacherRoute);
app.use('/api/v1/appointments', appointmentRoute);
app.use('/api/v1/comments', commentRoute);
app.use('/api/v1/announcements', announcementRoute);
app.use("/api/v1/departments", departmentRoute);
app.use("/api/v1/academic-positions", academicPositionRoute);


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
