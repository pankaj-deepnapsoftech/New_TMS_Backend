import { StatusCodes } from "http-status-codes";

// ------------------------- local imports here -----------------------------------
import { CreateCommentService, DeleteCommentService, GetCommentService, UpdateCommentServices } from "../Services/Comments.services.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { BadRequestError } from "../utils/CoustomError.js";



// ------------------------------- Comment create api start here ------------------------
export const CreateComment = AsyncHandler(async (req,res) => {
    const data = req.body;
    const result = await CreateCommentService({...data,creator:req?.currentUser?._id});
    return res.status(StatusCodes.CREATED).json({
        message:"Comment Added Successful",
        data:result
    });
});
// ------------------------------- Comment create api end here ---------------------------



// -------------------------------- Comment get api start here -----------------------------
export const GetComment =  AsyncHandler(async (req,res) => {
    const {page,limit,task} = req.query;
    const pages = parseInt(page) || 1;
    const limits = parseInt(limit) || 20;
    const skip = (pages -1 ) * limits;
    const result = await GetCommentService(task,task,skip,limits); 
    return res.status(StatusCodes.ACCEPTED).json({
        data:result
    });
});
// --------------------------------- Comment get api end here ----------------------------



// ----------------------------------- Comment Delete api start here ----------------------
export const DeleteComment = AsyncHandler(async (req,res) => {
    const {id} = req.params;
    const data = await DeleteCommentService(id);
    if(!data){
        throw new BadRequestError("Comment already Deleted","DeleteComment function");
    }
    return res.status(StatusCodes.OK).json({
        message:"Comment Delete Successfully",
        data
    });
});
// ------------------------------------ Comment Delete api end here -------------------------



// ------------------------------------ Comment Update api start here ----------------------
export const UpdateComment = AsyncHandler(async (req,res) => {
    const {id} = req.params;
    const data = req.body;
    const result = await UpdateCommentServices(id,data);
    if(!result){
        throw new BadRequestError("Comment not Found","UpdateComment function"); 
    }
    return res.status(StatusCodes.OK).json({
        message:"Comment Update Successfully",
        data:result
    });
});
// ------------------------------------ Comment Update api end here -------------------------




















