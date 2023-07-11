import adminRoutes from "./admin-routes";

import express from "express";

const routes = express.Router();

routes.use("/admin", adminRoutes);

export default routes;
