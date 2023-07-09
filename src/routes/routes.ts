import adminRoutes from "./admin-routes";
import userRoutes from "./user-routes";
import express from "express";

const routes = express.Router();

routes.use("/users", userRoutes);
routes.use("/admin", adminRoutes);

export default routes;
