import e, { Request, Response } from "express";
import bcrypt from "bcrypt";

import User from "../models/User";

class AuthController {
  async store(request: Request, response: Response) {
    try {
      const { username, password } = request.body;

      const user = await User.findOne({ username });

      if (!user) {
        return response
          .status(401)
          .json({ message: "Incorrect username or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return response
          .status(401)
          .json({ message: "Incorrect username or password" });
      }

      return response.status(200).json(user);
    } catch (error) {
      return response.status(500).json({ message: "Server Internal Error" });
    }
  }
}

export default new AuthController();
