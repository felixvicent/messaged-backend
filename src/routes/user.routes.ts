import { Router } from "express";

export const userRoutes = Router();

import userController from "../controllers/UserController";

userRoutes.get("/:id", userController.index);
userRoutes.post("/", userController.store);
userRoutes.put("/:id/avatar", userController.changeAvatar);
