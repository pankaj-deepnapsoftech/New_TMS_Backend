import mongoose from "mongoose";

import { TicketModel } from "../models/Ticket.model.js"



export const CreateTicketService = async (data) => {
    const result = await TicketModel.create(data);
    return result;
};

export const GetTicketServiceByCreator = async (isAdmin, creator, limit, skip) => {
    const matches = isAdmin ? {} : { creator: new mongoose.Types.ObjectId(creator) };
    const result = await TicketModel.aggregate([
        {
            $match: { ...matches }
        },
        {
            $lookup: {
                from: "tasks",
                localField: "_id",
                foreignField: "ticket_id",
                as: "task",
                pipeline: [
                    {
                        $lookup: {
                            from: "statushistories",
                            localField: "_id",
                            foreignField: "task_id",
                            as: "status"
                        }
                    },
                    {
                        $lookup: {
                            from: "comments",
                            localField: "_id",
                            foreignField: "task_id",
                            as: "comment"
                        }
                    },
                ]
            }
        },
        {
            $lookup: {
                from: "statushistories",
                localField: "_id",
                foreignField: "ticket_id",
                as: "status"
            }
        },
        {
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "ticket_id",
                as: "comment"
            }
        },
    ]).sort({ _id: -1 }).skip(skip).limit(limit);
    return result;
};

export const GetTicketServiceByAssign = async (creator, limit, skip) => {
    const result = await TicketModel.aggregate([
        {
            $lookup: {
                from: "tasks",
                localField: "_id",
                foreignField: "ticket_id",
                as: "task",
                pipeline: [
                    {
                        $match: { assign: new mongoose.Types.ObjectId(creator) }
                    },
                    {
                        $lookup: {
                            from: "statushistories",
                            localField: "_id",
                            foreignField: "task_id",
                            as: "status"
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "statushistories",
                localField: "_id",
                foreignField: "ticket_id",
                as: "status"
            }
        },
        { $match: { task: { $ne: [] } } }
    ]).sort({ _id: -1 }).skip(skip).limit(limit);
    return result;
};


export const UpdateTicketService = async (id, data) => {
    const result = await TicketModel.findByIdAndUpdate(id, data, { new: true, lean: true });
    return result;
};

export const DeleteTicketService = async (id) => {
    const result = await TicketModel.findByIdAndDelete(id);
    return result;
};


















