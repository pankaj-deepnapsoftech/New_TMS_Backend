import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

// ------------------------- local imports here ---------------------------
import { ImportantDocsModel } from "../models/ImportentDocs.model.js";
import { RenualModel } from "../models/renuals.model.js";
import { TaskModel } from "../models/Task.model.js";
import { TicketModel } from "../models/Ticket.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { BadRequestError } from "../utils/CoustomError.js";




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
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
export const OpenTaskChart = AsyncHandler(async (req, res) => {
    const creatorMatch = req?.currentUser?.admin
        ? {}
        : {
            $or: [
                { creator: new mongoose.Types.ObjectId(req?.currentUser?._id) },
                { assign: new mongoose.Types.ObjectId(req?.currentUser?._id) }
            ]
        };

    const data = await TaskModel.aggregate([
        {
            $match: creatorMatch
        },
        {
            $lookup: {
                from: "statushistories",
                localField: "_id",
                foreignField: "task_id",
                as: "status",
                pipeline: [
                    { $sort: { createdAt: -1 } }, // latest status first
                    { $limit: 1 }
                ]
            }
        },
        { $unwind: { path: "$status", preserveNullAndEmptyArrays: true } },
        {
            $match: {
                "status.status": { $in: ["Not Started", "Re Open"] }
            }
        },
        {
            $group: {
                _id: "$status.status",
                count: { $sum: 1 }
            }
        }

    ]);

    return res.status(StatusCodes.OK).json({
        data
    });
});
// ------------------------------- OpenTasks api end here --------------------------------


// ------------------------------- Completed Task api Start here --------------------
export const CompletedTaskChart = AsyncHandler(async (req, res) => {
    const creatorMatch = req?.currentUser?.admin
        ? {}
        : {
            $or: [
                { creator: new mongoose.Types.ObjectId(req?.currentUser?._id) },
                { assign: new mongoose.Types.ObjectId(req?.currentUser?._id) }
            ]
        };

    const data = await TaskModel.aggregate([
        {
            $match: creatorMatch
        },
        {
            $lookup: {
                from: "statushistories",
                localField: "_id",
                foreignField: "task_id",
                as: "status",
                pipeline: [
                    { $sort: { createdAt: -1 } }, // latest status first
                    { $limit: 1 }
                ]
            }
        },
        { $unwind: { path: "$status", preserveNullAndEmptyArrays: true } },
        {
            $match: {
                "status.status": "Completed"
            }
        },
        {
            $group: {
                _id: null,
                totalCompleted: { $sum: 1 },
                overdueCompleted: {
                    $sum: {
                        $cond: [
                            { $lt: ["$due_date", "$status.createdAt"] }, // if dueDate < now
                            1,
                            0
                        ]
                    }
                }
            }
        }
    ]);

    return res.status(StatusCodes.OK).json({
        totalCompleted: data[0]?.totalCompleted || 0,
        overdueCompleted: data[0]?.overdueCompleted || 0
    });
});
// ------------------------------- Completed Task api End here ----------------------


// ------------------------------------ Dashboard card data start here --------------------------
export const DashboardCardData = AsyncHandler(async (req, res) => {
    const result = await ImportantDocsModel.aggregate([
        {
            $group: {
                _id: null,
                totalLeads: { $sum: "$leads" },
                totalDeals: { $sum: { $size: "$deals" } },
                totalCustomers: { $sum: { $size: "$customer" } },
            }
        }
    ]);

    const  totalRenuals = await RenualModel.find().countDocuments();
    delete result[0]._id
    return res.status(StatusCodes.OK).json({
        data:{...result[0],totalRenuals}
    })
});
// ------------------------------------ Dashboard card data end here  --------------------------


// ------------------------------- dashboard user Task Status code start here ---------------
export const DashboardUserTaskStatus = AsyncHandler(async (req,res) => {
    const {id} = req.params;
    if(!id){
        throw new BadRequestError("id is required field","DashboardUserTaskStatus function")
    }
    const {page,limit} = req.query;
    const pages = parseInt(page) || 1;
    const limits = parseInt(limit) || 10;
    const skip = (pages -1 ) * limits;
      const data = await TaskModel.aggregate([
        {
            $match: {assign:new mongoose.Types.ObjectId(id)}
        },
        {
            $lookup: {
                from: "statushistories",
                localField: "_id",
                foreignField: "task_id",
                as: "status",
                pipeline: [
                    { $sort: { createdAt: -1 } }, // latest status first
                    { $limit: 1 }
                ]
            }
        },
        { $unwind: { path: "$status", preserveNullAndEmptyArrays: true } },
        {$skip:skip},
        {$limit:limits}

       
    ]);
    return res.status(StatusCodes.OK).json({
        data
    })
});
// ------------------------------- dashboard user Task Status code end here ---------------











