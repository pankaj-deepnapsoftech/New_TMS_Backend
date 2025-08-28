import { NotificationModel } from "../models/Notification.model.js"


export const CreateNotificationService = async (data) => {
    const result = await NotificationModel.create(data);
    return result;
};

export const GetNotificationService = async (id, skip, limit) => {
    const result = await NotificationModel.find({ recipientId: id }).populate([{ path: "creator", select: "username full_name email" }, { path: "recipientId", select: "username full_name email" }]).skip(skip).limit(limit).lean();
    return result;
};

export const UpdateNotificationService = async (id, data) => {
    const result = await NotificationModel.findByIdAndUpdate(id, data, { new: true, lean: true });
    return result;
};

export const DeleteNotificationService = async (id) => {
    const result = await NotificationModel.findByIdAndDelete(id);
    return result;
};

export const DeleteManyNotification = async (id) => {
    const result = await NotificationModel.deleteMany({ $or: [{ creator: id }, { recipientId: id }] });
    return result;
}

export const GetSingleNotificationservice = async (id) => {
    const result = await NotificationModel.findById(id).populate([{ path: "creator", select: "username full_name email" }, { path: "recipientId", select: "username full_name email" }]);
    return result;
}

export const InsertManyNotification = async (data) => {
    const result = await NotificationModel.insertMany(data);
    return result;
}

export const GetManyNotification = async (ids) => {
    const result = await NotificationModel.find({_id:{$in:ids}}).populate([{ path: "creator", select: "username full_name email" }, { path: "recipientId", select: "username full_name email" }]);
    return result;
}




