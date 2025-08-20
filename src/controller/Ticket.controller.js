import { StatusCodes } from "http-status-codes";

// ----------------------------- local import here -----------------------
import { CreateTicketService, DeleteTicketService, GetTicketServiceByCreator, UpdateTicketService } from "../Services/Ticket.services.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { BadRequestError } from "../utils/CoustomError.js";


// ------------------------------ ticket create api start here ------------------------
export const CreateTicket = AsyncHandler(async (req,res) => {
    const data = req.body;
    const result = await CreateTicketService(data);
    return res.status(StatusCodes.CREATED).json({
        message:"Ticket Created successfully",
        data:result
    })
});
// ----------------------------- ticket create api end here -------------------------------



// ------------------------------ ticket get api Start here ------------------------------
export const getTicket = AsyncHandler(async (req,res)=>{
    const {creator} = req.params;
    const {limit,page} = req.query;
    const pages = parseInt(page) || 1;
    const limits = parseInt(limit) || 10;
    const skip = (pages -1 ) * limits
    const data = await GetTicketServiceByCreator(creator,limits,skip);
    return res.status(StatusCodes.OK).json({
        data
    });
});
// ------------------------------- ticket get api end here ----------------------------------




// -------------------------------- ticket delete api start here ---------------------------------
export const DeleteTicket =  AsyncHandler(async (req,res) => {
    const {id} = req.params;
    const data = await DeleteTicketService(id);
    if(!data){
        throw new BadRequestError("Ticket already deleted","DeleteTicket function")
    }
    return res.status(StatusCodes.OK).json({
        message:"Ticket deleted Successfully",
        data
    })
});
//------------------------------- ticket delete api end here ---------------------------------


// -------------------------------- ticket update api start here ------------------------
export const UpdateTicket =  AsyncHandler(async (req,res) => {
    const {id} = req.params;
    const data = req.body;
    const result = await UpdateTicketService(id,data);
    if(!result){
        throw new BadRequestError("Ticket data not Found","UpdateTicket function")
    }
    return res.status(StatusCodes.OK).json({
        message:"Ticket deleted Successfully",
        data:result
    })
});












