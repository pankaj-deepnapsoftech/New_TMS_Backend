import {Schema,model} from "mongoose";

const NotificationSchema = new Schema(
  {
    recipientId: {type: Schema.Types.ObjectId,ref: "User", required: true},
    title: {type: String,required: true,trim: true},
    message: {type: String,required: true},
    type: {type: String,enum: ["info", "alert", "reminder", "system", "promotion", "message"],default: "info"},
    creator: {type: Schema.Types.ObjectId,ref: "User"},
    path:{type:String},
    status: {type: String,enum: ["unread", "read"],default: "unread"},
    priority: {type: String,enum: ["low", "medium", "high"],default: "medium"},
  },
  { timestamps: true } // automatically adds createdAt & updatedAt
);

export const NotificationModel  = model("Notification", NotificationSchema);
