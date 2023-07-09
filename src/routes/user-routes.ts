import express, { NextFunction, Request, Response } from "express";
import UserController from "../controllers/user-controller";

const userController = new UserController();
const userRoutes = express.Router();

userRoutes.post(
  "/",
  (request: Request, response: Response, next: NextFunction) => {
    return userController.createUser(request, response);
  }
);

export default userRoutes;
