import { Request, Response } from "express";

import Message from "../models/Message";

class MessageController {
  async index(request: Request, response: Response) {
    try {
      const { from, to } = request.query;

      const messages = await Message.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updateAt: 1 });

      return response.json(messages);
    } catch (error) {
      return response.status(500).json({ message: "Server Internal Error" });
    }
  }

  async store(request: Request, response: Response) {
    try {
      const { from, to, message } = request.body;

      const data = await Message.create({
        text: message,
        users: [from, to],
        sender: from,
      });

      return response.status(201).json(data);
    } catch (error) {
      return response.status(500).json({ message: "Server Internal Error" });
    }
  }
}

export default new MessageController();
