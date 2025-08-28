
import { Types } from "mongoose";

// -------------------------- local imports here ----------------------------
import { CommentModel } from "../models/Comment.model.js"


export const CreateCommentService = async (data) => {
    const result = await CommentModel.create(data);
    return result;
};

export const DeleteCommentService = async (id) => {
    const result = await CommentModel.findByIdAndDelete(id);
    return result;
}

export const UpdateCommentServices = async (id, data) => {
    const result = await CommentModel.findByIdAndUpdate(id, data, { new: true, lean: true });
    return result;
}


export const DeleteManyComments = async (id) => {
    const result = await CommentModel.deleteMany({ $or: [{ task_id: id }, { ticket_id: id }] });
    return result;
}


export const GetCommentsService = async (id) => {
    const result = await CommentModel.aggregate([
        {
            $match: { _id: new Types.ObjectId(id) }
        },
        {
            $lookup: {
                from: "tickets",
                localField: "ticket_id",
                foreignField: "_id",
                as: "tickets",
                pipeline: [
                    {
                        $lookup: {
                            from: "tasks",
                            localField: "_id",
                            foreignField: "ticket_id",
                            as: "tasks"
                        }
                    },
                ]
            }
        },
        {
            $lookup: {
                from: "tasks",
                localField: "task_id",
                foreignField: "_id",
                as: "tasks"
            }
        },
        {
            $addFields: {
                tickets: { $arrayElemAt: ["$tickets", 0] },
                tasks: { $arrayElemAt: ["$tasks", 0] },
            }
        },
    ])
    return result;
}







