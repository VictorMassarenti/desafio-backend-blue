import { Request, Response } from "express";
import { sendErrorResponse } from "../utils/errorFunction";
import { userModel } from "../models/userModel";
import { User } from "../utils/zodSchema";
import { verifyPassword } from "../utils/hashPassword";
import { signAcessToken } from "../config/jwt";

class UserController {
  async register(req: Request, res: Response) {
    const newUser: Omit<User, "id" | "appointments"> = req.body;

    try {
      const usernameAlreadyExists: User | null = await userModel.findByUsername(
        {
          username: newUser.username,
        }
      );

      if (usernameAlreadyExists) {
        return sendErrorResponse(res, 400, "Username already exists");
      }

      await userModel.register(newUser);

      return res.status(201).json({ message: "User registered" });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return sendErrorResponse(res, 500, error.message);
      } else {
        console.log(error);
        return sendErrorResponse(res, 500, "Internal server error");
      }
    }
  }

  async login(req: Request, res: Response) {
    const user: Omit<User, "id" | "appointments"> = req.body;

    try {
      const userExists: User | null = await userModel.findByUsername({
        username: user.username,
      });

      if (!userExists) {
        return sendErrorResponse(res, 400, "User not found");
      }

      const validPassword: boolean = await verifyPassword(
        user.password,
        userExists.password
      );

      if (!validPassword) {
        return sendErrorResponse(res, 400, "Invalid password");
      }

      const token = signAcessToken({ id: userExists.id });

      return res.status(200).json(token);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return sendErrorResponse(res, 500, error.message);
      } else {
        console.log(error);
        return sendErrorResponse(res, 500, "Internal server error");
      }
    }
  }
}

export const userController = new UserController();
