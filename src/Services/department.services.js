import { DepartmentModel } from "../models/department.model.js";


export const CreateDepartmentService = async (value) => {
    const data = await DepartmentModel.create(value);
    return data;
};

export const GetDepartmentByCreator = async(limit,skip) => {
    const data = await DepartmentModel.find({}).sort({_id:-1}).skip(skip).limit(limit).lean();
    return data;
}

export const updateDepartmentService =  async (Id,value) => {
    const data = await DepartmentModel.findByIdAndUpdate(Id,value,{new:true,lean:true});
    return data;
}

export const DeleteDepartmentService = async (id) => {
    const data = await DepartmentModel.findByIdAndDelete(id);
    return data;
}