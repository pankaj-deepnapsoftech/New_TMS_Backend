import { StatusCodes } from "http-status-codes";

// ----------------------------- local import here -----------------------
import { DeleteManyComments } from "../Services/Comments.services.js";
import { CreateStatusService, DeleteManyStatusService } from "../Services/StatusHistory.services.js";
import { DeleteManyTasks } from "../Services/task.services.js";
import { CreateTicketService, DeleteTicketService, getCardDataforAdmin, GetCardDataForUser, GetSingleTicketByTicketId, GetTicketServiceByAssign, GetTicketServiceByCreator, UpdateTicketService } from "../Services/Ticket.services.js";
import { PushTicketData } from "../socket/tickets.socket.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { BadRequestError } from "../utils/CoustomError.js";
import { mergeCardData } from "../utils/ReducerFunction.js";


// ------------------------------ ticket create api start here ------------------------
export const CreateTicket = AsyncHandler(async (req, res) => {
    const data = req.body;
    const result = await CreateTicketService({ ...data, creator: req?.currentUser?._id });
    res.status(StatusCodes.CREATED).json({
        message: "Ticket Created successfully",
        data: result
    });
    await CreateStatusService({ ticket_id: result._id });
    const pushTicket = await GetSingleTicketByTicketId(result.ticket_id)
    PushTicketData(pushTicket);
});
// ----------------------------- ticket create api end here -------------------------------



// ------------------------------ ticket get api Start here ------------------------------
export const getTicket = AsyncHandler(async (req, res) => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { admin, _id: id } = req?.currentUser;
    const { limit, page } = req.query;
    const pages = parseInt(page) || 1;
    const limits = parseInt(limit) || 10;
    const skip = (pages - 1) * limits
    const data = await GetTicketServiceByCreator(admin, id, limits, skip);
    res.status(StatusCodes.OK).json({
        data: data.data,
        totalPage: data.totalPage
    });
});
// ------------------------------- ticket get api end here ----------------------------------




// -------------------------------- ticket delete api start here ---------------------------------
export const DeleteTicket = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = await DeleteTicketService(id);
    if (!data) {
        throw new BadRequestError("Ticket already deleted", "DeleteTicket function")
    }
    res.status(StatusCodes.OK).json({
        message: "Ticket deleted Successfully",
        data
    })
    await DeleteManyTasks(data._id);
    await DeleteManyStatusService(data._id);
    await DeleteManyComments(data._id)
});
//------------------------------- ticket delete api end here ---------------------------------


// -------------------------------- ticket update api start here ------------------------
export const UpdateTicket = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const result = await UpdateTicketService(id, data);
    if (!result) {
        throw new BadRequestError("Ticket data not Found", "UpdateTicket function")
    }
    return res.status(StatusCodes.OK).json({
        message: "Ticket deleted Successfully",
        data: result
    })
});
// ------------------------------- ticket updaet api end here ----------------------------




// ------------------------------ ticket get api by assign start here ----------------------
export const getTicketbyAssign = AsyncHandler(async (req, res) => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { _id: id } = req?.currentUser;
    const { limit, page } = req.query;
    const pages = parseInt(page) || 1;
    const limits = parseInt(limit) || 10;
    const skip = (pages - 1) * limits
    const data = await GetTicketServiceByAssign(id, limits, skip);
    return res.status(StatusCodes.OK).json({
        data: data.data,
        totalPage: data.totalPage
    });
});
// --------------------------- ticket get api by assignj end here --------------------------



// ----------------------------- get Single Ticket data By Ticket id  ---------------------------
export const getSingleTicket = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = await GetSingleTicketByTicketId(id);
    return res.status(StatusCodes.OK).json({
        data
    })
});
// ----------------------------- get Single Ticket data By Ticket id  end ---------------------------



// ---------------------------- ticket card Data code start here -------------------------
export const TicketDashboardData = AsyncHandler(async (req, res) => {
    const user = req?.currentUser;
    const data = await getCardDataforAdmin(user?.admin, user?._id);
    const more = await GetCardDataForUser(user?._id);
    const newData = mergeCardData(data, more)
    return res.status(StatusCodes.OK).json({
        data: newData,
    })
});
// -------------------------------- ticket card Data code end here ------------------------









