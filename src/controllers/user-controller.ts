import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { TUser } from "../utils/user";
import { prisma } from "../service/prisma";

class UserController {
  async createUser(request: Request, response: Response): Promise<Response> {
    try {
      const {
        name,
        email,
        password,
        confirmPassword,
        subscribed,
        channel,
        category,
        photo,
      } = request.body;
      if (password !== confirmPassword) {
        return response.status(400).json({
          message: "Password incorrects!",
        });
      }

      const newPass = await bcrypt.hash(password, 8);
      const aux: TUser = {
        name,
        email,
        password: newPass,
        subscribed,
        channel,
        category,
        photo,
      };
      const user = await prisma.user.create({ data: aux });

      return response.status(201).json({
        message: "User created sucessfully",
        result: user,
      });
    } catch (error: unknown) {
      return response.status(400).json({
        message: "Error creating user!",
        error: error,
      });
    }
  }
}

export default UserController;
