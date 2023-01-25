import { Router } from "express";

export const authRoutes = Router();

import authController from "../controllers/AuthController";

authRoutes.post("/", authController.store);
