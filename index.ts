import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import "dotenv/config";

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL ?? "")
  .then(() => {
    console.log("DB Connection Successfully");
  })
  .catch((err) => console.log(err.message));

const server = app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
