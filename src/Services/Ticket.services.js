import mongoose from "mongoose";

import { TicketModel } from "../models/Ticket.model.js"



export const CreateTicketService = async (data) => {
    const result = await TicketModel.create(data);
    return result;
};

export const GetTicketServiceByCreator = async (isAdmin, creator, limit, skip) => {
  const matches = isAdmin ? {} : { creator: new mongoose.Types.ObjectId(creator) };

  const result = await TicketModel.aggregate([
    { $match: matches },

    {
      $facet: {
        data: [
          // ---- your existing pipeline here ----
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
                    as: "status",
                  },
                },
                {
                  $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "task_id",
                    as: "comment",
                    pipeline: [
                      {
                        $lookup: {
                          from: "users",
                          localField: "creator",
                          foreignField: "_id",
                          as: "creator",
                          pipeline: [
                            { $project: { username: 1, full_name: 1, email: 1 } },
                          ],
                        },
                      },
                      { $addFields: { creator: { $arrayElemAt: ["$creator", 0] } } },
                    ],
                  },
                },
                {
                  $lookup: {
                    from: "users",
                    localField: "creator",
                    foreignField: "_id",
                    as: "creator",
                    pipeline: [
                      { $project: { username: 1, full_name: 1, email: 1 } },
                    ],
                  },
                },
                {
                  $lookup: {
                    from: "users",
                    localField: "assign",
                    foreignField: "_id",
                    as: "assign",
                    pipeline: [
                      { $project: { username: 1, full_name: 1, email: 1 } },
                    ],
                  },
                },
                { $unwind: { path: "$assign", preserveNullAndEmptyArrays: true } },
                { $unwind: { path: "$creator", preserveNullAndEmptyArrays: true } },
              ],
            },
          },
          {
            $lookup: {
              from: "statushistories",
              localField: "_id",
              foreignField: "ticket_id",
              as: "status",
            },
          },
          {
            $lookup: {
              from: "comments",
              localField: "_id",
              foreignField: "ticket_id",
              as: "comment",
              pipeline: [
                {
                  $lookup: {
                    from: "users",
                    localField: "creator",
                    foreignField: "_id",
                    as: "creator",
                    pipeline: [
                      { $project: { username: 1, full_name: 1, email: 1 } },
                    ],
                  },
                },
                { $addFields: { creator: { $arrayElemAt: ["$creator", 0] } } },
              ],
            },
          },
          {
            $lookup: {
              from: "departments",
              localField: "department",
              foreignField: "_id",
              as: "department",
            },
          },
          { $unwind: "$department" },
          { $sort: { _id: -1 } },
          { $skip: skip },
          { $limit: limit },
        ],

        count: [
          { $count: "totalCount" },
        ],
      },
    },
    {
      $project: {
        data: 1,
        totalCount: { $ifNull: [{ $arrayElemAt: ["$count.totalCount", 0] }, 0] },
      },
    },
  ]);

  return {data:result[0].data,totalPage:Math.ceil(result[0].totalCount / limit)}; // { data: [...], totalCount: N }
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
          },
          {
            $lookup: {
              from: "comments",
              localField: "_id",
              foreignField: "task_id",
              as: "comment",
              pipeline: [
                {
                  $lookup: {
                    from: "users",
                    localField: "creator",
                    foreignField: "_id",
                    as: "creator",
                    pipeline: [
                      { $project: { username: 1, full_name: 1, email: 1 } }
                    ]
                  }
                },
                { $addFields: { creator: { $arrayElemAt: ["$creator", 0] } } }
              ]
            }
          },
          {
            $lookup: {
              from: "users",
              localField: "creator",
              foreignField: "_id",
              as: "creator",
              pipeline: [
                { $project: { username: 1, full_name: 1, email: 1 } }
              ]
            }
          },
          {
            $lookup: {
              from: "users",
              localField: "assign",
              foreignField: "_id",
              as: "assign",
              pipeline: [
                { $project: { username: 1, full_name: 1, email: 1 } }
              ]
            }
          },
          { $unwind: { path: "$assign", preserveNullAndEmptyArrays: true } },
          { $unwind: { path: "$creator", preserveNullAndEmptyArrays: true } }
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
        as: "comment",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "creator",
              foreignField: "_id",
              as: "creator",
              pipeline: [
                { $project: { username: 1, full_name: 1, email: 1 } }
              ]
            }
          },
          { $addFields: { creator: { $arrayElemAt: ["$creator", 0] } } }
        ]
      }
    },
    {
      $lookup: {
        from: "departments",
        localField: "department",
        foreignField: "_id",
        as: "department"
      }
    },
    { $unwind: "$department" },
    { $match: { task: { $ne: [] } } },

    // ---- Facet for count + data ----
    {
      $facet: {
        data: [
          { $sort: { _id: -1 } },
          { $skip: skip },
          { $limit: limit }
        ],
        count: [
          { $count: "totalCount" }
        ]
      }
    },
    {
      $project: {
        data: 1,
        totalCount: { $ifNull: [{ $arrayElemAt: ["$count.totalCount", 0] }, 0] }
      }
    }
  ]);

  return {data:result[0].data,totalPage:Math.ceil(result[0].totalCount / limit)};
};


export const UpdateTicketService = async (id, data) => {
    const result = await TicketModel.findByIdAndUpdate(id, data, { new: true, lean: true });
    return result;
};

export const DeleteTicketService = async (id) => {
    const result = await TicketModel.findByIdAndDelete(id);
    return result;
};

export const GetSingleTicketByTicketId = async (id) => {
    const result = await TicketModel.aggregate([
        {
            $match: { ticket_id: id }
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
                            as: "comment",
                            pipeline: [
                                {
                                    $lookup: {
                                        from: "users",
                                        localField: "creator",
                                        foreignField: "_id",
                                        as: "creator",
                                        pipeline: [
                                            {
                                                $project: {
                                                    username: 1,
                                                    full_name: 1,
                                                    email: 1
                                                }
                                            }
                                        ]
                                    }
                                },
                            ]
                        }
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "creator",
                            foreignField: "_id",
                            as: "creator",
                            pipeline: [
                                {
                                    $project: {
                                        username: 1,
                                        full_name: 1,
                                        email: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "assign",
                            foreignField: "_id",
                            as: "assign",
                            pipeline: [
                                {
                                    $project: {
                                        username: 1,
                                        full_name: 1,
                                        email: 1
                                    }
                                }
                            ]
                        }
                    },

                    { $unwind: { path: "$assign", preserveNullAndEmptyArrays: true } },
                    { $unwind: { path: "$creator", preserveNullAndEmptyArrays: true } }

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
                as: "comment",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "creator",
                            foreignField: "_id",
                            as: "creator",
                            pipeline: [
                                {
                                    $project: {
                                        username: 1,
                                        full_name: 1,
                                        email: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            creator: { $arrayElemAt: ["$creator", 0] }
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "departments",
                localField: "department",
                foreignField: "_id",
                as: "department"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "creator",
                foreignField: "_id",
                as: "creator",
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            full_name: 1,
                            email: 1
                        }
                    },
                    {
                        $addFields: {
                            creator: { $arrayElemAt: ["$creator", 0] }
                        }
                    }
                ]
            }
        },
        { $unwind: "$department" },
        { $unwind: "$creator" },
    ]);
    return result[0];
}


export const getCardDataforAdmin = async (isAdmin, id) => {
    const matches = isAdmin ? {} : { creator: new mongoose.Types.ObjectId(id) };
    const now = new Date();

    const data = await TicketModel.aggregate([
        {
            $match: matches
        },
        {
            $lookup: {
                from: "statushistories",
                let: { ticketId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$ticket_id", "$$ticketId"] }
                        }
                    },
                    {
                        $sort: { createdAt: -1 }
                    },
                    {
                        $limit: 1
                    }
                ],
                as: "latestStatus"
            }
        },
        {
            $unwind: {
                path: "$latestStatus",
                preserveNullAndEmptyArrays: true // in case some tickets have no status history
            }
        },
        {
            $facet: {
                statusCounts: [
                    {
                        $group: {
                            _id: "$latestStatus.status",
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $project: {
                            status: "$_id",
                            count: 1,
                            _id: 0
                        }
                    }
                ],
                totalCount: [
                    {
                        $count: "total"
                    }
                ],
                overdueCount: [
                    {
                        $match: {
                            due_date: { $lt: now },
                            "latestStatus.status": { $ne: "Closed" } // only consider non-closed as overdue
                        }
                    },
                    {
                        $count: "overdue"
                    }
                ]
            }
        },
        {
            $project: {
                statusCounts: 1,
                total: { $arrayElemAt: ["$totalCount.total", 0] },
                overdue: { $arrayElemAt: ["$overdueCount.overdue", 0] }
            }
        }
    ]);

    return data[0]; // returns a single object
};

export const GetCardDataForUser = async (id) => {
    const now = new Date();

    const data = await TicketModel.aggregate([
        {
            $lookup: {
                from: "tasks",
                localField: "_id",
                foreignField: "ticket_id",
                as: "task",
                pipeline: [
                    {
                        $match: { assign: new mongoose.Types.ObjectId(id) }
                    }
                ]
            }
        },
        // ✅ Only keep tickets that have at least one task
        {
            $match: {
                task: { $ne: [] }
            }
        },
        {
            $lookup: {
                from: "statushistories",
                let: { ticketId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$ticket_id", "$$ticketId"] }
                        }
                    },
                    {
                        $sort: { createdAt: -1 }
                    },
                    {
                        $limit: 1
                    }
                ],
                as: "latestStatus"
            }
        },
        {
            $unwind: {
                path: "$latestStatus",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $facet: {
                statusCounts: [
                    {
                        $group: {
                            _id: "$latestStatus.status",
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $project: {
                            status: "$_id",
                            count: 1,
                            _id: 0
                        }
                    }
                ],
                totalCount: [
                    {
                        $count: "total"
                    }
                ],
                overdueCount: [
                    {
                        $match: {
                            due_date: { $lt: now },
                            "latestStatus.status": { $ne: "Closed" }
                        }
                    },
                    {
                        $count: "overdue"
                    }
                ]
            }
        },
        {
            $project: {
                statusCounts: 1,
                total: { $arrayElemAt: ["$totalCount.total", 0] },
                overdue: { $arrayElemAt: ["$overdueCount.overdue", 0] }
            }
        }
    ]);

    return data[0];
};














