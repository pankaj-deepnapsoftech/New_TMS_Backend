import { StatusCodes } from "http-status-codes";

// ----------------------------- local import here -----------------------
import { CreateStatusService } from "../Services/StatusHistory.services.js";
import { DeleteManyTasks } from "../Services/task.services.js";
import { CreateTicketService, DeleteTicketService, GetTicketServiceByAssign, GetTicketServiceByCreator, UpdateTicketService } from "../Services/Ticket.services.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { BadRequestError } from "../utils/CoustomError.js";


// ------------------------------ ticket create api start here ------------------------
export const CreateTicket = AsyncHandler(async (req, res) => {
    const data = req.body;
    const result = await CreateTicketService({ ...data, creator: req?.currentUser?._id });
    res.status(StatusCodes.CREATED).json({
        message: "Ticket Created successfully",
        data: result
    });
    await CreateStatusService({ ticket_id: result._id });
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
    return res.status(StatusCodes.OK).json({
        data
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
        data
    });
});
// --------------------------- ticket get api by assignj end here --------------------------










