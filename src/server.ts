import express, { Request, Response } from "express";
import authRoute from "./routes/authRoute";

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
