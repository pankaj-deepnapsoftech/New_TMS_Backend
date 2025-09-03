import {Schema,model} from "mongoose";


 const departmentSchema = new Schema({
    name:{type:String,required:true,unique:true},
    creator:{type:Schema.Types.ObjectId,ref:"User"}
});

departmentSchema.index({name:1})


export const DepartmentModel = model("Department",departmentSchema);




