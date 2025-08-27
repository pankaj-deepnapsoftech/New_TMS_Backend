import { StatusCodes } from "http-status-codes";

// -------------------------- local imports here ------------------
import { DeleteManyComments } from "../Services/Comments.services.js";
import { CreateNotificationService } from "../Services/notification.service.js";
import { CreateStatusService, DeleteManyStatusService } from "../Services/StatusHistory.services.js";
import { CreateTaskServices, DeleteTaskService, updateTaskService } from "../Services/task.services.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { BadRequestError } from "../utils/CoustomError.js";


// ----------------------------- Task Create api start here ----------------------------
export const CreateTask = AsyncHandler(async(req,res) => {
    const data = req.body;
    const result = await CreateTaskServices({...data,creator:req?.currentUser?._id});
    res.status(StatusCodes.CREATED).json({
        message:"task created successful",
        data:result
    });
    await CreateStatusService({task_id:result._id});
    await CreateNotificationService({creator:req?.currentUser?._id,recipientId:data.assign,title:"Task assign",message:" this task is assign by you",priority:data.priority || "medium"})
});
// ----------------------------- task Create api end here -------------------------------



// -------------------------------- task Delete api start here  --------------------------
export const DeleteTask = AsyncHandler(async (req,res) => {
    const {id} = req.params;
    const data = await DeleteTaskService(id);
    if(!data){
        throw new BadRequestError("Task already Deleted","DeleteTask function")
    }
     res.status(StatusCodes.OK).json({
        message:"Task deleted Successfully",
        data
    });
   
    await DeleteManyStatusService(data._id)
    await DeleteManyComments(data._id);
});
// -------------------------------- task Delete api end here -----------------------------



// -------------------------------- task update api start here ------------------------------
export const UpdateTask = AsyncHandler(async (req,res) => {
    const {id} = req.params;
    const data = req.body;
    const result = await updateTaskService(id,data);
     if(!result){
        throw new BadRequestError("Task Not Found","DeleteTask function")
    }
    return res.status(StatusCodes.OK).json({
        message:"Task Update Successfully",
        data:result
    });
});
// ------------------------------- task update api end here --------------------------------

