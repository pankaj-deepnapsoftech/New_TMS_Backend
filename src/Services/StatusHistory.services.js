import { StatusHistoryModel } from "../models/StatusHistory.model.js"



export const CreateStatusService = async (data) => {
    const result = await StatusHistoryModel.create(data);
    return result;
};


export const DeleteStatusService = async(id) => {
    const result = await StatusHistoryModel.findByIdAndDelete(id);
    return result;
}

export const UpdateStatusService = async(id,data) => {
    const result = await StatusHistoryModel.findByIdAndUpdate(id,{...data,$inc:{updateCount:1}},{new:true,lean:true});
    return result;
}









