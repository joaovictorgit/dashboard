import express, { NextFunction, Request, Response } from "express";
import AdminController from "../controllers/admin-controller";

const adminController = new AdminController();
const adminRoutes = express.Router();

adminRoutes.post(
  "/login",
  (request: Request, response: Response, next: NextFunction) => {
    return adminController.login(request, response);
  }
);

adminRoutes.post(
  "/",
  (request: Request, response: Response, next: NextFunction) => {
    return adminController.createAdmin(request, response);
  }
);

export default adminRoutes;
