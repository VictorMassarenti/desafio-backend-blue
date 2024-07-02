import express from "express";
import { userRouter } from "./_routes/userRouter";
import { appointmentRouter } from "./_routes/appointmentRouter";
import auth from "./middlewares/auth";

export const app = express();
const port = process.env.API_PORT || 8080;

app.use(express.json());

app.use("/user", userRouter);

app.use(auth);
app.use("/appointment", appointmentRouter);

app.listen(port, () =>
  console.info(`Server running on http://localhost:${port}`)
);
