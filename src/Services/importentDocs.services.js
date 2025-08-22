import {  ImportantDocsModel } from "../models/ImportentDocs.model.js"


export const AddImportantDocs = async (data) => {
    const result = await ImportantDocsModel.create(data);
    return result;
};

export const getImportantDocsService = async () => {
    const result = await ImportantDocsModel.find({}).lean();
    return result;
};

export const updateImportantDocsService = async (id,data) => {
    const result = await ImportantDocsModel.findByIdAndUpdate(id,data,{new:true,lean:true});
    return result;
}

export const DeleteImportantDocsService = async (id) => {
    const result = await ImportantDocsModel.findByIdAndDelete(id);
    return result;
}




