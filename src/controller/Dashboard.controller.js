import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

// ------------------------- local imports here ---------------------------
import { TicketModel } from "../models/Ticket.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";




// ----------------------------- Ticket OverView code Start here  -----------------------
export const TicketOverViewChart = AsyncHandler(async (req, res) => {
    const currentYear = new Date().getFullYear();

    const creatorMatch = req?.currentUser?.admin 
        ? {} 
        : { creator: new mongoose.Types.ObjectId(req?.currentUser?._id) };

    const data = await TicketModel.aggregate([
        {
            $match: {
                ...creatorMatch,
                $expr: { $eq: [{ $year: "$createdAt" }, currentYear] }
            }
        },
        {
            $group: {
                _id: { month: { $month: "$createdAt" } },
                v: { $sum: 1 }
            }
        },
        {
            $sort: { "_id.month": 1 }
        },
        {
            $project: {
                _id: 0,
                m: {
                    $arrayElemAt: [
                        [
                            "", // index 0 placeholder
                            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                        ],
                        "$_id.month"
                    ]
                },
                v: 1
            }
        }
    ]);

    return res.status(StatusCodes.OK).json({
        data
    });
});
// ----------------------------- Ticket OverView Code end here ---------------------------


// ------------------------------ Ticket activity Status start here ------------------------
export const TicketActivityChart = AsyncHandler(async (req,res) => {
const currentYear = new Date().getFullYear();

    const creatorMatch = req?.currentUser?.admin 
        ? {} 
        : { creator: new mongoose.Types.ObjectId(req?.currentUser?._id) };

        const data = await TicketModel.aggregate([
            {
                $match:{...creatorMatch, $expr: { $eq: [{ $year: "$createdAt" }, currentYear] }}
            },
            {
                $lookup:{
                    from:"statushistories",
                    localField:"_id",
                    foreignField:"ticket_id",
                    as:"status"
                }
            }
        ]);

        return res.status(StatusCodes.OK).json({
        data
    });
})
// ------------------------------ Ticket activity Status end here ------------------------













