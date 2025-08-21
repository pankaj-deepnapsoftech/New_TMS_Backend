import { StatusHistoryModel } from "../models/StatusHistory.model.js"



export const CreateStatusService = async (data) => {
    const result = await StatusHistoryModel.create(data);
    return result;
};

export const GetStatusService = async(task_id,ticket_id) => {
    const result = await StatusHistoryModel.find({$or:[{task_id},{ticket_id}]}).sort({_id:-1}).lean();
    return result;
};

export const DeleteStatusService = async(id) => {
    const result = await StatusHistoryModel.findByIdAndDelete(id);
    return result;
}

export const UpdateStatusService = async(id,data) => {
    const result = await StatusHistoryModel.findByIdAndUpdate(id,data,{new:true,lean:true});
    return result;
}









