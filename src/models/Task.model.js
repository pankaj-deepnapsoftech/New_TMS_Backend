import {Schema,model} from "mongoose";


const schedule = new Schema({
    schedule_type:{type:String,required:true,enum:['Monthly','Weekly','daily','yearly']},
    date:{type:Date},
    weekly:{type:[String]}
});


const TaskSchema = new Schema({
    title:{type:String,required:true},
    due_date:{type:Date,required:true},
    file:{type:String},
    remark:{type:String},
    isSchedule:{type:Boolean,required:true,default:false},
    schedule:schedule,
    assign:{type:Schema.Types.ObjectId,ref:"User"},
    creator:{Type:Schema.Types.ObjectId,ref:"User"},
    ticket_id:{Type:Schema.Types.ObjectId,ref:"Ticket"}
});


export const TaskModel =  model("Task",TaskSchema);






