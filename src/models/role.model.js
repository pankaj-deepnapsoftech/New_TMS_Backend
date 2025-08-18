import {Schema,model} from "mongoose";


const allowedPages = new Schema({
    value:{type:String,required:true},
    label:{type:String,required:true}
});

const RoleSchema = new Schema({
    role:{type:String,required:true},
    allowedPage:[allowedPages],
    creator:{type:Schema.Types.ObjectId,ref:"User"}
});


export const RoleModel = model("Role",RoleSchema);







