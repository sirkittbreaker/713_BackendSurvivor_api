import express, { Request, Response } from "express";
import userRoute from "./routes/userRoute";

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use("/user", userRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
