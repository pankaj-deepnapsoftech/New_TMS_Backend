import {Schema,model} from "mongoose";


const UserSchema = new Schema({
    username:{type:String,required:true,unique:true},
    full_name:{type:String,required:true},
    email:{type:String,rquired:true},
    phone:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:Schema.Types.ObjectId},
    department:{type:Schema.Types.ObjectId}
},{timestamps:true});


export const UserModel = model("User",UserSchema)



