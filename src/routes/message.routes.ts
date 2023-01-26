import { Router } from "express";

export const messageRoutes = Router();

import messageController from "../controllers/MessageController";

messageRoutes.get("/", messageController.index);
messageRoutes.post("/", messageController.store);
