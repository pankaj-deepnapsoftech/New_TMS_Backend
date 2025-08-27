import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    file: {
      type: String,
      default: null,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    task_id: {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
    ticket_id: {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
    },
  },
  {
    timestamps: true, 
  }
);

export const CommentModel = model("Comment", CommentSchema);
