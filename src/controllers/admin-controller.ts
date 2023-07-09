import { Request, Response } from "express";
import { prisma } from "../service/prisma";
import { TAdmin } from "../utils/admin";
import bcrypt from "bcrypt";

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
}

export default AdminController;
