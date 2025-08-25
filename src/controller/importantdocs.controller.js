

import { StatusCodes } from "http-status-codes";

// ------------------------------- local imports here ----------------------------------
import { AddImportantDocs, DeleteImportantDocsService, getImportantDocsService, updateImportantDocsService } from "../Services/importentDocs.services.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { BadRequestError } from "../utils/CoustomError.js";


// -------------------------------- create importants docs api code start here ------------------------
export const CreateImpDocs = AsyncHandler(async (req,res) => {
    const data = req.body;
    const result = await AddImportantDocs(data);
    res.status(StatusCodes.CREATED).json({
        message:"importants docs Created successfully",
        data:result
    });
});
// --------------------------------- create importants docs api code end here ------------------------


// ------------------------------- get importants docs api code start here -----------------------------
export const GetImpDocs = AsyncHandler(async (req,res) => {
    const {page,limit} = req.query;
    const pages = parseInt(page);
    const limits = parseInt(limit);
    const skip = (pages -1) * limits;
    const result = await getImportantDocsService(skip,limits);
    res.status(StatusCodes.OK).json({
        data:result
    })
});
// ------------------------------- get importants docs api code end here ----------------------------------



// ------------------------------------- Delete importants docs api Code Start here -----------------------
export const DeleteImpDocs = AsyncHandler(async (req,res) => {
    const {id} = req.params;
    const data = DeleteImportantDocsService(id);
    if(!data){
        throw new BadRequestError("Importants docs Already Delete","DeleteImpDocs function")
    }
    res.status(StatusCodes.OK).json({
        message:"Importants docs Deleted Successfully",
        data
    });
});
// ------------------------------------- Delete Importants docs api code end here -----------------------



// -------------------------------------- Update Importants docs api Code end here ------------------------
export const UpdateImpDocs = AsyncHandler(async (req,res) => {
    const {id} = req.params;
    const data = req.body;
    const result = await updateImportantDocsService(id,data);
    if(!result){
        throw new BadRequestError("Data Not Found","UpdateImpDocs function")
    }
    return res.status(StatusCodes.OK).json({
        message:"Importants docs updated successfully",
        data:result
    })
});
// ------------------------------------- update Importants docs api code end here -------------------------







































