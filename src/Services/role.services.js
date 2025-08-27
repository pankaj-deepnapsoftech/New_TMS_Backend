import { RoleModel } from "../models/role.model.js"


export const CreateRoleService = async (value) => {
    const data = await RoleModel.create(value);
    return data;
};

export const GetRoleByCreator = async(isAdmin,creator,limit,skip) => {
    const data = await RoleModel.find(isAdmin ? {} : {creator}).sort({_id:-1}).skip(skip).limit(limit).lean();
    return data;
}

export const updateRoleService =  async (Id,value) => {
    const data = await RoleModel.findByIdAndUpdate(Id,value,{new:true,lean:true});
    return data;
}

export const DeleteRolesService = async (id) => {
    const data = await RoleModel.findByIdAndDelete(id);
    return data;
}

export const AllRolesService = async () => {
    const data = await RoleModel.find({}).select("role").lean();
    return data;
}




