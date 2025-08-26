import { StatusCodes } from "http-status-codes";

// ------------------------------- local imports here ----------------------------------
import { CreateRenualServices, DeleteRenualService, GetRenualServices, UpdateRenualService } from "../Services/Renuals.services.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { BadRequestError } from "../utils/CoustomError.js";


// -------------------------------- create Renual api code start here ------------------------
export const CreateRenual = AsyncHandler(async (req,res) => {
    const data = req.body;
    const result = await CreateRenualServices(data);
    res.status(StatusCodes.CREATED).json({
        message:"Renual Created successfully",
        data:result
    });
});
// --------------------------------- create Renual api code end here ------------------------


// ------------------------------- get Renual api code start here -----------------------------
export const GetRenual = AsyncHandler(async (req,res) => {
    const {page,limit} = req.query;
    const pages = parseInt(page) || 1;
    const limits = parseInt(limit) || 10;
    const skip = (pages -1) * limits;
    const result = await GetRenualServices(skip,limits);
    res.status(StatusCodes.OK).json({
        data:result
    })
});
// ------------------------------- get Renual api code end here ----------------------------------



// ------------------------------------- Delete Renual api Code Start here -----------------------
export const DeleteRenual = AsyncHandler(async (req,res) => {
    const {id} = req.params;
    const data = DeleteRenualService(id);
    if(!data){
        throw new BadRequestError("Renual Already Delete","DeleteRenual function")
    }
    res.status(StatusCodes.OK).json({
        message:"Renual Deleted Successfully",
        data
    });
});
// ------------------------------------- Delete renual api code end here -----------------------



// -------------------------------------- Update renual api Code end here ------------------------
export const UpdateRenual = AsyncHandler(async (req,res) => {
    const {id} = req.params;
    const data = req.body;
    const result = await UpdateRenualService(id,data);
    if(!result){
        throw new BadRequestError("Data Not Found","UpdateRenual function")
    }
    return res.status(StatusCodes.OK).json({
        message:"Renual updated successfully",
        data:result
    })
});
// ------------------------------------- update renual api code end here -------------------------



















