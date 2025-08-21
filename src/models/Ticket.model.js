import { Schema, model } from "mongoose";

const TicketSchema = new Schema(
  {
    department: { type: Schema.Types.ObjectId, ref: "Department" },
    title: { type: String, required: true },
    ticket_id: { type: String, unique: true }, // unique ticket id
    due_date: { type: Date, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    priority: { type: String,required: true, default: "Medium",enum: ["High", "Low", "Medium"],},
  },
  { timestamps: true }
);

// Pre-save middleware to generate unique ticket_id
TicketSchema.pre("save", async function (next) {
  if (this.isNew && !this.ticket_id) {
    try {
      // Count total tickets to make incremental human-readable ID
      const count = await TicketModel.countDocuments();

      // Example: TKT-0001, TKT-0002 ...
      const newId = `TKT-${String(count + 1).padStart(4, "0")}`;

      this.ticket_id = newId;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

export const TicketModel = model("Ticket", TicketSchema);






