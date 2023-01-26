import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";

import "dotenv/config";

import { routes } from "./routes";

const app = express();

const PORT = process.env.PORT;

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL ?? "")
  .catch((err) => console.log(err.message));

app.use(cors());
app.use(express.json());

app.use("/api", routes);

const server = app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

const io = new Server({
  cors: {},
});

const onlineUsers = new Map();
var chatSocket;

io.on("connection", (socket) => {
  chatSocket = socket;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-message", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);

    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("message-received", {
        message: data.message,
        sender: data.from,
        _id: data._id,
      });
    }
  });
});

io.listen(3334);
