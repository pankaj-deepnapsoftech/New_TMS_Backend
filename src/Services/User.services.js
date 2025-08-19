import { UserModel } from "../models/User.model.js"

export const CreateUserService = async (value) => {
    const data = await UserModel.create(value,{ validateBeforeSave: false });
    return data;
};

export const FindByUsernameOrEmail = async (value) => {
    const data = await UserModel.findOne({$or:[{username:value},{email:value}]}).lean();
    return data;
};

export const FindByEmail = async (email) => {
    const data = await UserModel.findOne({email:email}).select("-password").lean();
    return data;
}


export const FindByUsername = async(username) => {
    const data = await UserModel.findOne({username}).select("-password").lean();
    return data;
}


export const UpdatePassword = async (id,password) => {
    const data = await UserModel.findByIdAndUpdate(id,{password},{new:true,lean:true});
    return data;
}














