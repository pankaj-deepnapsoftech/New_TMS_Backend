import { StatusCodes } from "http-status-codes";

// ---------------------------------------- local improts here ----------------------------
import { CreateAssetsService, DeleteAssetsService, GetAssetsService, UpdateAssetsService } from "../Services/Assets.service.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { NotFoundError } from "../utils/CoustomError.js";


// --------------------------------------  create assets api start here --------------------
export const CreateAssets =  AsyncHandler(async (req,res) => {
    const data = req.body;
    const result = await CreateAssetsService(data);
    return res.status(StatusCodes.CREATED).json({
        message:"Assets model created",
        data:result
    });
});
// --------------------------------------- create assets api end here -----------------------




// -------------------------------------- get assets api start here ------------------------
export const GetAssets = AsyncHandler(async (req,res) => {
    const {limit,page} = req.query;
    const pages = parseInt(page) || 1;
    const limits = parseInt(limit) || 10;
    const skip = (pages -1 ) * limits;
    const data = await GetAssetsService(skip,limits);
    return res.status(StatusCodes.OK).json({
        data
    });
});
// -------------------------------------- get assets api end here --------------------------




// ----------------------------------- update assets api start here ------------------------
export const UpdateAssets = AsyncHandler(async (req,res)=>{
    const {id} = req.params;
    const data = req.body;
    const result = await UpdateAssetsService(id,data);
    if(!result){
        throw new NotFoundError("Data not found","UpdateAssets function");
    };
    return res.status(StatusCodes.OK).json({
        message:"Assets update successfully",
        data:result
    });
});
// ----------------------------------- update assets api end here ---------------------------



// ---------------------------------- Delete assets api start here --------------------------
export const DeleteAssets = AsyncHandler(async (req,res) => {
    const {id} = req.params;
    const data = await DeleteAssetsService(id);
    if(!data){
        throw new NotFoundError("Assets already Deleted","DeleteAssets function");
    }

    return res.status(StatusCodes.OK).json({
        message:"Assets Deleted successfully",
        data
    })
});
// ----------------------------------- Delete assets api end here ----------------------------



























