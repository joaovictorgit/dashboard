import express, { NextFunction, Request, Response } from "express";
import AdminController from "../controllers/admin-controller";
import authenticationAdmin from "../middleware/authentication-admin";
import multer, { Multer } from "multer";
import { request } from "http";
const upload: Multer = multer({ dest: "uploads/" });
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

adminRoutes.get(
  "/users/",
  (request: Request, response: Response, next: NextFunction) => {
    return adminController.showAllUsers(request, response);
  }
);

adminRoutes.get(
  "/user/:id",
  (request: Request, response: Response, next: NextFunction) => {
    const id = parseInt(request.params.id);
    return adminController.showUserById(id, response);
  }
);

adminRoutes.get(
  "/:id",
  authenticationAdmin,
  (request: Request, response: Response, next: NextFunction) => {
    const id = parseInt(request.params.id);
    return adminController.showAdminById(id, response);
  }
);

adminRoutes.post(
  "/:id/upload",
  upload.single("image"),
  (request: Request, response: Response, next: NextFunction) => {
    return adminController.uploadImage(request, response);
  }
);

adminRoutes.get(
  "/image/:id",
  (request: Request, response: Response, next: NextFunction) => {
    return adminController.getImageByUserId(request, response);
  }
);

adminRoutes.patch(
  "/:id",
  authenticationAdmin,
  (request: Request, response: Response, next: NextFunction) => {
    return adminController.updateAdmin(request, response);
  }
);

adminRoutes.delete(
  "/:id",
  authenticationAdmin,
  (request: Request, response: Response, next: NextFunction) => {
    const id = parseInt(request.params.id);
    return adminController.deleteUser(id, response);
  }
);

adminRoutes.post(
  "/user",
  (request: Request, response: Response, next: NextFunction) => {
    return adminController.createUser(request, response);
  }
);

adminRoutes.put(
  "/user/:id",
  authenticationAdmin,
  (request: Request, response: Response, next: NextFunction) => {
    return adminController.updateUser(request, response);
  }
);

export default adminRoutes;
