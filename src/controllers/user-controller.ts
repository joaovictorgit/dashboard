import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { TUser } from "../utils/user";
import { prisma } from "../service/prisma";
import jwt from "jsonwebtoken";

const secret_key = "login";

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

  async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body;
      const checkUser: any = await prisma.user.findUnique({
        where: { email },
      });
      const checkPass = await bcrypt.compare(password, checkUser?.password);

      if (!checkUser) {
        return response.status(400).json({
          message: "Email does not exist!",
        });
      }
      if (!checkPass) {
        return response.status(400).json({
          message: "Incorrect password!",
        });
      }

      return response.status(200).json({
        message: "Login successful!",
        result: checkUser,
        token: jwt.sign(
          {
            id: checkUser.admin_id,
          },
          secret_key,
          { expiresIn: "1h" }
        ),
      });
    } catch (error: unknown) {
      return response.status(400).json({
        message: "Error!",
        error: error,
      });
    }
  }
}

export default UserController;
