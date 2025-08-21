import { StatusCodes } from "http-status-codes";

// ---------------------- local imports here ----------------------------
import { AllRolesService, CreateRoleService, DeleteRolesService, GetRoleByCreator, updateRoleService } from "../Services/role.services.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { BadRequestError } from "../utils/CoustomError.js";


// ------------------- Role Createion api start here ---------------------------
export const CreateRole = AsyncHandler(async (req,res) => {
    const data = req.body;
    const result = await CreateRoleService({...data,creator:req?.currentUser?._id});
    return res.status(StatusCodes.CREATED).json({
        message:"Role Created Ssuccessfully",
        data:result
    })
});
// ------------------ role creation api end here ---------------------------------



// --------------------- Role get api start here -----------------------------
export const getRole = AsyncHandler(async (req,res) => {
    const {page,limit} = req.query;
    const {creator} =  req.params;
    const pages = parseInt(page) || 1;
    const limits = parseInt(limit) || 10;
    const skip = (pages - 1) * limits;
    const data = await GetRoleByCreator(creator,limit,skip);
    return res.status(StatusCodes.OK).json({
        data
    });
});
// -------------------- role get api end here -----------------------------------



// -------------------- Role Delete api start here -------------------------------
export const deleteRole = AsyncHandler(async (req,res) => {
    const {id} =  req.params;
    const data = await DeleteRolesService(id);
    if(!data){
        throw new BadRequestError("Data already deleted","deleteRole method")
    }

    return res.status(StatusCodes.OK).json({
        message:"Role Deleted Successfully",
        data 
    });
});
// -------------------------- role delete api end here -------------------------------



// ---------------------------- role update api start here --------------------------------
export const updateRole = AsyncHandler(async (req,res) => {
    const {id} =  req.params;
    const value = req.body;
    const data = await updateRoleService(id,value);
    if(!data){
        throw new BadRequestError("Data Not Found","updateRole method")
    }

    return res.status(StatusCodes.OK).json({
        message:"Update Role  Successfully",
        data 
    });
});
// --------------------------- role update api end here ---------------------------



// ------------------------------ get All role api start here --------------------------
export const getAllRole =  AsyncHandler(async (req,res) => {
    const data = await AllRolesService();
    return res.status(StatusCodes.OK).json({
        message:"all roles",
        data
    })
});
// -------------------------------get all role api end here -----------------------------


















