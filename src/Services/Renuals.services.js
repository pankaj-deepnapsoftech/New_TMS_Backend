import { RenualModel } from "../models/renuals.model.js"

export const CreateRenualServices = async (data) => {
    const result = await RenualModel.create(data);
    return result;
};

export const GetRenualServices = async (skip,limit) => {
    const result = await RenualModel.find().sort({_id:-1}).skip(skip).limit(limit).lean();
    const data = await RenualModel.find({}).countDocuments();

    return {data:result,totalPage:Math.ceil(data / limit)};
};

export const UpdateRenualService = async (id,data) => {
    const result = await RenualModel.findByIdAndUpdate(id,data,{new:true,lean:true});
    return result;
};

export const DeleteRenualService  = async (id) => {
    const result = await RenualModel.findByIdAndDelete(id);
    return result;
};

























