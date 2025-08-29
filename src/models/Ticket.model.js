import { Schema, model } from "mongoose";

const TicketSchema = new Schema(
  {
    department: { type: Schema.Types.ObjectId, ref: "Department" },
    title: { type: String, required: true },
    description: { type: String },
    ticket_id: { type: String, unique: true, },
    due_date: { type: Date, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    priority: {type: String,required: true,default: "Medium",enum: ["High", "Low", "Medium"]},
  },
  { timestamps: true }
);

TicketSchema.pre("save", function(next) {
  if (this.isNew && !this.ticket_id) {
    this.ticket_id = "TKT-" + this._id.toString().slice(-6).toUpperCase();
  }
  next();
});


TicketSchema.index({ ticket_id: 1}, { unique: true })

export const TicketModel = model("Ticket", TicketSchema);
