import { Schema, model } from "mongoose";


const schedule = new Schema({
    schedule_type: { type: String, required: true, enum: ['Monthly', 'Weekly', 'daily', 'yearly'] },
    date: { type: Date },
    weekly: { type: [String] },
    time:{type:Date}
});


const TaskSchema = new Schema({
    title: { type: String, required: true },
    due_date: { type: Date, required: true },
    file: { type: String },
    remark: { type: String },
    description: { type: String },
    isSchedule: { type: Boolean, required: true, default: false },
    assign: { type: Schema.Types.ObjectId, ref: "User" },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    ticket_id: { type: Schema.Types.ObjectId, ref: "Ticket" },
    schedule: schedule,
});

TaskSchema.index({title:1})


export const TaskModel = model("Task", TaskSchema);






