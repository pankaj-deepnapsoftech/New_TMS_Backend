import {Schema,model} from "mongoose";

const TicketSchema = new Schema({
    department:{type:Schema.Types.ObjectId,ref:"Department"},
    title:{type:String,required:true},
    ticket_id:{type:String,required:true},
    due_date:{type:Date,required:true},
    creator:{type:Schema.Types.ObjectId,ref:"User",required:true},
    priority:{type:String,required:true,default:"Medium",enum:["High","Low","Medium"]},
},{timestamps:true});

export const TicketModel = model("Ticket",TicketSchema);





