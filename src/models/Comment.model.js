import {Schema,model} from "mongoose";


const CommectSchema = new Schema({
    text:{type:String,required:true},
    file:{type:String},
    creator:{type:Schema.Types.ObjectId,ref:"User"},
    task_id:{type:Schema.Types.ObjectId,ref:"Task"},
    ticket_id:{type:Schema.Types.ObjectId,ref:"Ticket"}
});


export const CommentModel = model("Comment",CommectSchema);









