import { UserModel } from "../models/User.model.js"

export const CreateUserService = async (value) => {
    const data = await UserModel.create(value);
    return data;
};

export const FindByUsernameOrEmail = async (username, email) => {
    const data = await UserModel.findOne({ $or: [{ username }, { email }] }).lean();
    return data;
};

export const FindByEmail = async (email) => {
    const data = await UserModel.findOne({ email: email }).select("-password -refresh_token").lean();
    return data;
}


export const FindByUsername = async (username) => {
    const data = await UserModel.findOne({ username }).select("-password -refresh_token").lean();
    return data;
}

export const FindById = async (id) => {
    const data = await UserModel.findById(id).select("-password -refresh_token").populate([{ path: "role" }, { path: "department" }]).lean();
    return data;
}


export const UpdatePassword = async (id, password) => {
    const data = await UserModel.findByIdAndUpdate(id, { password }, { new: true, lean: true });
    return data;
}

export const UpdateUser = async (id, value) => {
    const data = await UserModel.findByIdAndUpdate(id, value, { new: true, lean: true });
    return data
}

export const FindAllUsers = async (skip, limit) => {
    const data = await UserModel.find({ admin: false }).select("-password -refresh_token -admin").populate([{ path: "role" }, { path: "department" }]).skip(skip).limit(limit).lean();
    const totalUsers = await UserModel.find({ admin: false }).countDocuments();
    return {data,totalPage:Math.ceil(totalUsers/limit),totalUsers};
}


export const FindByUserWithId = async (id) => {
    const data = await UserModel.findById(id).select("refresh_token").lean();
    return data;
}


export const DeleteUserService = async (id) => {
    const data = await UserModel.findByIdAndDelete(id);
    return data;
}











