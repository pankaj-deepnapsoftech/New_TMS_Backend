import { AssetsModel } from "../models/Assets.model.js"



export const CreateAssetsService = async (data) => {
    const result = await AssetsModel.create(data);
    return result;
};

export const GetAssetsService = async (skip,limit) => {
    const result = await AssetsModel.find({}).skip(skip).limit(limit).lean();
    return result;
};

export const UpdateAssetsService = async (id,data) => {
    const result = await AssetsModel.findByIdAndUpdate(id,data,{new:true,lean:true});
    return result;
};

export const DeleteAssetsService = async (id) => {
    const result = await AssetsModel.findByIdAndDelete(id);
    return result;
};









