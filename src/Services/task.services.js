import { TaskModel } from "../models/Task.model.js"

export const CreateTaskServices = async (data) => {
    const result = await TaskModel.create(data);
    return result;
};


export const updateTaskService = async (id,data) => {
    const result = await TaskModel.findByIdAndUpdate(id,data,{new:true,lean:true});
    return result
};


export const DeleteTaskService = async (id) => {
    const result = await TaskModel.findByIdAndDelete(id);
    return result;
}

export const DeleteManyTasks = async (id) => {
    const result = await TaskModel.deleteMany({ticket_id:id});
    return result;
};


export const ExistingTasks = async (title) => {
    const result = await TaskModel.findOne({title});
    return result;
}








