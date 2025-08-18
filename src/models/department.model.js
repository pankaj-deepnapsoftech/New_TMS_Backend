import {Schema,model} from "mongoose";


 const departmentSchema = new Schema({
    name:{type:String,required:true},
    creator:{type:Schema.Types.ObjectId,ref:"User"}
});


export const DepartmentModel = model("Department",departmentSchema);





