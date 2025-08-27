import { StatusCodes } from "http-status-codes";

// ------------------------------- local import links -------------------------------
import { GetNotificationService } from "../Services/notification.service.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";



// -------------------------------- Get notification api start here -----------------------
export const GetNotification = AsyncHandler(async (req,res) => {
    const {page,limit} = req.query;
    const pages = parseInt(page) || 1;
    const limits = parseInt(limit) || 10;
    const skip = (pages -1) * limits;
    const data = await GetNotificationService(req?.currentUser?._id,skip,limit);
    return res.status(StatusCodes.OK).json({
        data
    })
});
// ------------------------------------ get notification api end here -----------------------
































