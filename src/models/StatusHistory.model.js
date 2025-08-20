import {Schema,model} from "mongoose";

const StatusHistory = new Schema({
    status:{Type:String,required:true,enum:['Not Started','On Hold','In Progress','Re Open','Completed','Closed'],default:"Not Started"},
    updateCount:{type:Number,required:true},
    updatedBy:{type:Schema.Types.ObjectId,ref:"User"},
    task_id:{type:Schema.Types.ObjectId,ref:"Task"},
    ticket_id:{type:Schema.Types.ObjectId,ref:"Ticket"}
});


export const StatusHistoryModel = model("StatusHistory",StatusHistory);




