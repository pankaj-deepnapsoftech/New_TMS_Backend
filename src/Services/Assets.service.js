import { AssetsModel } from "../models/Assets.model.js"



export const CreateAssets = async (data) => {
    const result = await AssetsModel.create(data);
    return result;
}

export const GetAssets = async (skip,limit) => {
    const result = await AssetsModel.find({}).skip(skip).limit(limit).lean();
    return result;
}










