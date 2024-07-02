import { Router } from "express";
import { appointmentController } from "../controllers/appointmentController";
import { appointmentValidation } from "../middlewares/appointmentValidation";

export const appointmentRouter = Router();

appointmentRouter
  .post("/", appointmentValidation.create, appointmentController.create)
  .get("/:id", appointmentController.read)
  .patch("/:id", appointmentValidation.update, appointmentController.update)
  .delete("/:id", appointmentController.cancel);
