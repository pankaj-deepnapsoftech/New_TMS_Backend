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
    const result = await CommentModel.findByIdAndUpdate(id,data);
    return result;
} 









