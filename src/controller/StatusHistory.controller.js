import { StatusCodes } from "http-status-codes";

// -------------------------- local imports here ---------------------------
import { CreateStatusService, DeleteStatusService, GetStatusService, UpdateStatusService } from "../Services/StatusHistory.services.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { BadRequestError } from "../utils/CoustomError.js";



// ------------------------------- Status created api start here --------------------------
export const CreateStatus = AsyncHandler(async (req,res) => {
    const data = req.body;
    const result = await CreateStatusService(data);
    return res.status(StatusCodes.CREATED).json({
        message:"Status added successfully",
        data:result
    });
});
// ------------------------------- Status created api end here ----------------------------



// ------------------------------ Status get api start here ------------------------------
export const GetStatus = AsyncHandler(async (req,res) => {
    const {task_id} = req.params;
    const data = await GetStatusService(task_id,task_id);
    return res.status(StatusCodes.OK).json({
        data
    });
});
// ------------------------------ Status get api end here ---------------------------------



// --------------------------------- Status Delete api start here -------------------------
export const DeleteStatus =  AsyncHandler(async (req,res) => {
    const {id} = req.params;
    const data = await DeleteStatusService(id);
    if(!data){
        throw new BadRequestError("Data already Delete","DeleteStatus function");
    }
    return res.status(StatusCodes.OK).json({
        message:"Status Deleted Successfully",
        data
    })
});
// -------------------------------- Status Delete api end here ---------------------------



// --------------------------------- Status Update api Start here --------------------------
export const UpdateStatus = AsyncHandler(async (req,res) => {
    const {id} = req.params;
    const data = req.body;
    const result = await UpdateStatusService(id,data);
    if(!result){
        throw new BadRequestError("Status Data Not Found","UpdateStatus function")
    };
    return res.status(StatusCodes.OK).json({
        message:"Status update Successfully"
    })
});
// -------------------------------- Status Update api end here ---------------------------

























