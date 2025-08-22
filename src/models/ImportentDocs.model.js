import { Schema, model } from "mongoose";


const ImportantDocSchema = new Schema({
    leads: { type: Number, required: true, default: 0 },
    deals: {type:[String],required:true},
    customer:{type:[String],required:true},
});


export const ImportantDocsModel = model("ImportantDocs", ImportantDocSchema)






