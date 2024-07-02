import { Router } from "express";
import { userController } from "../controllers/userController";
import { userValidation } from "../middlewares/userValidation";

export const userRouter = Router();

userRouter.post("/register", userValidation.register, userController.register);
userRouter.post("/login", userValidation.login, userController.login);
