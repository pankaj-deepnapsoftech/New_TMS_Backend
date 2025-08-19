import { UserModel } from "../models/User.model.js"

export const CreateUserService = async (value) => {
    const data = await UserModel.create(value);
    return data;
};

export const FindByUsernameOrEmail = async (username,email) => {
    const data = await UserModel.findOne({$or:[{username},{email}]}).lean();
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

export const UpdateUser = async (id,value) => {
    const data = await UserModel.findByIdAndUpdate(id,value,{new:true,lean:true});
    return data
}














