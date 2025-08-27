import {Schema,model} from "mongoose";

const RenualSchema = new Schema({
    customer:{type:String,required:true},
    renual_date:{type:Date,required:true},
    Product:{type:String,required:true},
},{timestamps:true});

export const RenualModel = model("Renual",RenualSchema);





