import { StatusCodes } from "http-status-codes";

// ---------------------- local imports here ----------------------------
import { CreateDepartmentService, DeleteDepartmentService, DepartmentDataWithoutLimit, GetDepartmentByCreator, updateDepartmentService } from "../Services/department.services.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { BadRequestError } from "../utils/CoustomError.js";


// ------------------- department Createion api start here ---------------------------
export const CreateDepartment = AsyncHandler(async (req,res) => {
    const data = req.body;
    const result = await CreateDepartmentService(data);
    return res.status(StatusCodes.CREATED).json({
        message:"Department Created Ssuccessfully",
        data:result
    })
})
// ------------------ department creation api end here ---------------------------------



// --------------------- department get api start here -----------------------------
export const getDepartment = AsyncHandler(async (req,res) => {
    const {page,limit} = req.query;
    const pages = parseInt(page) || 1;
    const limits = parseInt(limit) || 10;
    const skip = (pages - 1) * limits;
    const data = await GetDepartmentByCreator(limits,skip);
    return res.status(StatusCodes.OK).json({
        data
    });
});
// -------------------- department get api end here -----------------------------------



// -------------------- department Delete api start here -------------------------------
export const deleteDepartment = AsyncHandler(async (req,res) => {
    const {id} =  req.params;
    const data = await DeleteDepartmentService(id);
    if(!data){
        throw new BadRequestError("Data already deleted","deleteDepartment method")
    }

    return res.status(StatusCodes.OK).json({
        message:"department Deleted Successfully",
        data 
    });
});
// -------------------------- department delete api end here -------------------------------


// ---------------------------- deaprtment update api start here --------------------------------
export const updateDepartment = AsyncHandler(async (req,res) => {
    const {id} =  req.params;
    const value = req.body;
    const data = await updateDepartmentService(id,value);
    if(!data){
        throw new BadRequestError("Data Not Found","updateDepartment method")
    }

    return res.status(StatusCodes.OK).json({
        message:"department Updated Successfully",
        data 
    });
});
// --------------------------- department update api end here ---------------------------



// ----------------------------- Get All department  Api Start here ------------------------
export const allDepartments = AsyncHandler(async(_req,res)=>{
    const data = await DepartmentDataWithoutLimit();
    return res.status(StatusCodes.OK).json({
        message:"all departments",
        data
    })
})
// ---------------------------- Get All Department api end here ---------------------------
















