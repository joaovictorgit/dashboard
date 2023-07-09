import { Request, Response } from "express";
import { prisma } from "../service/prisma";
import { TAdmin } from "../utils/admin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret_key = "login";

class AdminController {
  async createAdmin(request: Request, response: Response) {
    try {
      const { name, email, password, confirmPassword } = request.body;
      if (password !== confirmPassword) {
        return response.status(400).json({
          message: "Password incorrects!",
        });
      }

      const newPass = await bcrypt.hash(password, 8);
      const aux: TAdmin = {
        name,
        email,
        password: newPass,
      };

      const admin = await prisma.admin.create({ data: aux });
      return response.status(201).json({
        message: "Admin created sucessfully",
        result: admin,
      });
    } catch (error: unknown) {
      return response.status(400).json({
        message: "Error creating admin!",
        error: error,
      });
    }
  }

  async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body;
      const checkAdmin: any = await prisma.admin.findUnique({
        where: { email },
      });
      const checkPass = await bcrypt.compare(password, checkAdmin?.password);

      if (!checkAdmin) {
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
        result: checkAdmin,
        token: jwt.sign(
          {
            id: checkAdmin.admin_id,
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

export default AdminController;
