import { prisma } from "../config/prisma";
import { User } from "../utils/zodSchema";
import { hashPassword } from "../utils/hashPassword";

class UserModel {
  async register({ username, password }: Omit<User, "id" | "appointments">) {
    try {
      const newUser = await prisma.user.create({
        data: {
          username,
          password: await hashPassword(password),
        },
      });
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async findByUsername({ username }: Pick<User, "username">) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
        include: {
          appointments: true,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findById({ id }: Pick<User, "id">) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          appointments: true,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export const userModel = new UserModel();
