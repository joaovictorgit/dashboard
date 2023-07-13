import { Request, Response } from "express";
import { prisma } from "../service/prisma";
import { TAdmin } from "../utils/admin";
import bcrypt from "bcrypt";
import fs from "fs";
import jwt from "jsonwebtoken";
import { checkIfUserExist } from "../utils/user-exist";
import { checkIfAdminExist } from "../utils/admin-exist";
import { TUser } from "../utils/user";

const secret_key = "login";

class AdminController {
  async createAdmin(request: Request, response: Response): Promise<Response> {
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

  async login(request: Request, response: Response): Promise<Response> {
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

  async showAllUsers(request: Request, response: Response): Promise<Response> {
    try {
      const users = await prisma.user.findMany();
      return response.status(200).json({
        message: "Users",
        results: users,
      });
    } catch (error: unknown) {
      return response.status(400).json({
        message: "Error!",
        error: error,
      });
    }
  }

  async showUserById(user_id: number, response: Response): Promise<Response> {
    try {
      const check = await checkIfUserExist(user_id);
      if (!check) {
        return response.status(400).json({
          message: "Error: user not found!",
          result: {},
        });
      }
      const user = await prisma.user.findUnique({
        where: { user_id },
      });
      return response.status(200).json({
        message: "User returned successfully!",
        result: user,
      });
    } catch (error: unknown) {
      return response.status(400).json({
        message: "Error!",
        error: error,
      });
    }
  }

  async showAdminById(admin_id: number, response: Response): Promise<Response> {
    try {
      const check = await checkIfAdminExist(admin_id);
      if (!check) {
        return response.status(400).json({
          message: "Error: user not found!",
          result: {},
        });
      }
      const admin = await prisma.admin.findUnique({
        where: { admin_id },
      });
      return response.status(200).json({
        message: "Admin returned successfully!",
        result: admin,
      });
    } catch (error: unknown) {
      return response.status(400).json({
        message: "Error!",
        error: error,
      });
    }
  }

  async updateAdmin(request: Request, response: Response): Promise<Response> {
    try {
      const admin_id = parseInt(request.params.id);
      const adminRequest = request.body;

      let adminExist = await checkIfAdminExist(admin_id);
      if (!adminExist) {
        return response.status(400).json({
          message: "Error: user not found!",
          result: {},
        });
      }

      const updateUser = await prisma.admin.update({
        where: {
          admin_id,
        },
        data: adminRequest,
      });
      return response.status(200).json({
        message: "User data successfully updated!",
        result: updateUser,
      });
    } catch (error: unknown) {
      return response.status(400).json({
        message: "Error!",
        error: error,
      });
    }
  }

  async deleteUser(user_id: number, response: Response): Promise<Response> {
    try {
      let userExist = await checkIfUserExist(user_id);
      if (!userExist) {
        return response.status(400).json({
          message: "Error: user not found!",
          result: {},
        });
      }

      const delUser = await prisma.user.delete({
        where: { user_id },
      });
      return response.status(200).json({
        message: "User deleted successfully!",
        result: delUser,
      });
    } catch (error: unknown) {
      return response.status(400).json({
        message: "Error: user not found!",
        error: error,
      });
    }
  }

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

  async uploadImage(request: Request, response: Response): Promise<Response> {
    try {
      const id = parseInt(request.params.id);
      let userExist = await checkIfUserExist(id);
      if (!userExist) {
        return response.status(400).json({
          message: "Error: user not found!",
          result: {},
        });
      }
      const image: any = request.file;
      const imageBuffer = fs.readFileSync(image.path, {
        flag: "r",
      });
      const savedImage = await prisma.image.create({
        data: {
          name: JSON.stringify(image?.originalname),
          imageBuffer: imageBuffer,
          id_user: id,
        },
      });

      return response.status(201).json({
        message: "Image saved successfully!",
        result: savedImage,
      });
    } catch (error: unknown) {
      return response.status(400).json({
        message: "Error upload image!",
        error: error,
      });
    }
  }

  async getImageByUserId(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const id = parseInt(request.params.id);
      let userExist = await checkIfUserExist(id);
      if (!userExist) {
        return response.status(400).json({
          message: "Error: user not found!",
          result: {},
        });
      }
      const image = await prisma.image.findFirst({ where: { id_user: id } });
      if (!image) {
        return response.status(404).json({ error: "Image not found" });
      }
      response.setHeader("Content-Type", "image/jpeg");
      return response.status(200).send(image.imageBuffer);
    } catch (error: unknown) {
      return response.status(400).json({
        message: "Error upload image!",
        error: error,
      });
    }
  }

  async updateUser(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = parseInt(request.params.id);
      const userRequest = request.body;

      let userExist = await checkIfUserExist(user_id);
      if (!userExist) {
        return response.status(400).json({
          message: "Error: user not found!",
          result: {},
        });
      }

      const updateUser = await prisma.user.update({
        where: {
          user_id,
        },
        data: userRequest,
      });
      return response.status(200).json({
        message: "User data successfully updated!",
        result: updateUser,
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
