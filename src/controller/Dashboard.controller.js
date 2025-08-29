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
        }
    ]);

    // --- Create full year array ---
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Map aggregation result into a lookup
    const monthMap = {};
    data.forEach(item => {
        monthMap[item._id.month] = item.v;
    });

    // Build final array with 0 for missing months
    const result = months.map((m, idx) => ({
        m,
        v: monthMap[idx + 1] || 0
    }));

    return res.status(StatusCodes.OK).json({
        data: result
    });
});

// ----------------------------- Ticket OverView Code end here ---------------------------


// ------------------------------ Ticket activity Status start here ------------------------
export const TicketActivityChart = AsyncHandler(async (req, res) => {
    const currentYear = new Date().getFullYear();

    const creatorMatch = req?.currentUser?.admin
        ? {}
        : { creator: new mongoose.Types.ObjectId(req?.currentUser?._id) };

    const rawData = await TicketModel.aggregate([
        {
            $match: {
                ...creatorMatch,
                $expr: { $eq: [{ $year: "$createdAt" }, currentYear] }
            }
        },
        {
            $facet: {
                created: [
                    {
                        $group: {
                            _id: { month: { $month: "$createdAt" } },
                            created: { $sum: 1 }
                        }
                    }
                ],
                completed: [
                    {
                        $lookup: {
                            from: "statushistories",
                            localField: "_id",
                            foreignField: "ticket_id",
                            as: "status",
                            pipeline: [
                                { $sort: { createdAt: -1 } },
                                { $limit: 1 }
                            ]
                        }
                    },
                    { $unwind: { path: "$status", preserveNullAndEmptyArrays: true } },
                    {
                        $match: { "status.status": { $in: ["Completed", "Closed"] } }
                    },
                    {
                        $group: {
                            _id: { month: { $month: "$status.createdAt" } },
                            completed: { $sum: 1 }
                        }
                    }
                ]
            }
        }
    ]);

    // month names
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    // make map for created/completed
    const createdMap = new Map(
        rawData[0].created.map(item => [item._id.month, item.created])
    );
    const completedMap = new Map(
        rawData[0].completed.map(item => [item._id.month, item.completed])
    );

    // build final data for all 12 months
    const finalData = months.map((name, idx) => {
        const monthNum = idx + 1;
        return {
            name,
            created: createdMap.get(monthNum) || 0,
            completed: completedMap.get(monthNum) || 0
        };
    });

    return res.status(StatusCodes.OK).json({
        year: currentYear,
        data: finalData
    });
});
// ------------------------------ Ticket activity Status end here ------------------------



// ------------------------------- OpenTasks api Start Here -------------------------------
// export const OpenTaskChart = AsyncHandler(async (req,res) => {
    
// })









