import { Schema, model } from "mongoose";

const TicketSchema = new Schema(
  {
    department: { type: Schema.Types.ObjectId, ref: "Department" },
    title: { type: String, required: true },
    description: { type: String },
    ticket_id: { type: String, unique: true },
    due_date: { type: Date, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    priority: {type: String,required: true,default: "Medium",enum: ["High", "Low", "Medium"]},
  },
  { timestamps: true }
);

// Pre-save middleware to generate unique incremental ticket_id
TicketSchema.pre("save", async function (next) {
  if (this.isNew && !this.ticket_id) {
    try {
      // Find the last ticket by ticket_id (sorted descending)
      const lastTicket = await this.constructor
        .findOne({}, { ticket_id: 1 })
        .sort({ createdAt: -1 })
        .lean();

      let newNumber = 1;

      if (lastTicket && lastTicket.ticket_id) {
        // Extract numeric part from "TKT-0007"
        const lastNumber = parseInt(lastTicket.ticket_id.split("-")[1], 10);
        newNumber = lastNumber + 1;
      }

      // Example: TKT-0001, TKT-0002 ...
      this.ticket_id = `TKT-${String(newNumber).padStart(4, "0")}`;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

export const TicketModel = model("Ticket", TicketSchema);
