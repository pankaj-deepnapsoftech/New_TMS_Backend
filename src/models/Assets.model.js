import {Schema,model} from "mongoose";


const AssetsSchema = new Schema({
    assets_id:{type:String,unique:true},
    product_name:{type:String,required:true},
    purchase_date:{type:Date,required:true},
    warranty:{type:Date,required:true},
    brand_name:{type:String,required:true},
    assets_types:{type:String,required:true},
    specification:{type:String,required:true},
    attached_invoice:{type:String,required:true},
    company_name:{type:String,required:true,enum:["Dryish ercs","Deepnap Softech"]},
    product_image:{type:[String],required:true},
    warranty_card:{type:String,required:true}
});


AssetsSchema.pre("save",function(next) {
  if (this.isNew && !this.assets_id && this.company_name === "Dryish ercs") {
    this.assets_id = "DRY-" + this._id.toString().slice(-6).toUpperCase();
  }else {
    this.assets_id = "DEEP-" + this._id.toString().slice(-6).toUpperCase();
  }
  next();
})

export const AssetsModel = model("Assets",AssetsSchema);






























