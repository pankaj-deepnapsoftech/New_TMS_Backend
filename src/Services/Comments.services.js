import { CommentModel } from "../models/Comment.model.js"


export const CreateCommentService = async (data) => {
    const result = await CommentModel.create(data);
    return result;
};

export const GetCommentService = async (ticket_id,task_id) => {
    const result = await CommentModel.find({$or:[{ticket_id},{task_id}]}).lean();
    return result;
}











