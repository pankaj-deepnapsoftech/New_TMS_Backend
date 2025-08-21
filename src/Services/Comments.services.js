import { CommentModel } from "../models/Comment.model.js"


export const CreateCommentService = async (data) => {
    const result = await CommentModel.create(data);
    return result;
};

export const GetCommentService = async (ticket_id,task_id,skip,limits) => {
    const result = await CommentModel.find({$or:[{ticket_id},{task_id}]}).sort({_id:-1}).skip(skip).limit(limits).lean();
    return result;
}


export const DeleteCommentService = async (id) => {
    const result = await CommentModel.findByIdAndDelete(id);
    return result;
}

export const UpdateCommentServices = async (id,data) => {
    const result = await CommentModel.findByIdAndUpdate(id,data);
    return result;
} 









