import { Router } from "express";

export const userRoutes = Router();

import userController from "../controllers/UserController";

userRoutes.post("/", userController.store);
