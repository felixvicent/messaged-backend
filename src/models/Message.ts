import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    users: Array,
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Messages", messageSchema);
