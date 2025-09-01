import {Schema,model} from "mongoose";


const AssetsSchema = new Schema({
    assets_id:{type:String,unique:true,required:true},
    product_name:{type:String,required:true},
    purchase_date:{type:Date,required:true},
    warranty:{type:Date,required:true},
    brand_name:{type:String,required:true},
    assets_types:{type:String,required:true},
    specification:{type:String,required:true},
    attached_invoice:{type:String,required:true},
    product_image:{type:[String],required:true},
    warranty_card:{type:String,required:true}
});


export const AssetsModel = model("Assets",AssetsSchema);






























