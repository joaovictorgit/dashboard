import express, { NextFunction, Request, Response } from "express";
import UserController from "../controllers/user-controller";
import authenticationUser from "../middleware/authentication-user";

const userController = new UserController();
const userRoutes = express.Router();

userRoutes.post(
  "/",
  (request: Request, response: Response, next: NextFunction) => {
    return userController.createUser(request, response);
  }
);

userRoutes.post(
  "/login",
  (request: Request, response: Response, next: NextFunction) => {
    return userController.login(request, response);
  }
);

userRoutes.get(
  "/:id",
  authenticationUser,
  (request: Request, response: Response, next: NextFunction) => {
    const id = parseInt(request.params.id);
    return userController.showUserById(id, response);
  }
);

userRoutes.patch(
  "/:id",
  authenticationUser,
  (request: Request, response: Response, next: NextFunction) => {
    return userController.updateUser(request, response);
  }
);

export default userRoutes;
