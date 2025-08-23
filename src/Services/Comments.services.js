import { CommentModel } from "../models/Comment.model.js"


export const CreateCommentService = async (data) => {
    const result = await CommentModel.create(data);
    return result;
};

export const DeleteCommentService = async (id) => {
    const result = await CommentModel.findByIdAndDelete(id);
    return result;
}

export const UpdateCommentServices = async (id,data) => {
    const result = await CommentModel.findByIdAndUpdate(id,data,{new:true,lean:true});
    return result;
} 


export const DeleteManyComments = async (id) => {
    const result = await CommentModel.deleteMany({$or:[{task_id:id},{ticket_id:id}]});
    return result;
}








