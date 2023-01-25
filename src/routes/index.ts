import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";

export const routes = Router();

routes.use("/users", userRoutes);
routes.use("/auth", authRoutes);
