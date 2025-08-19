import { StatusCodes } from "http-status-codes";

// ------------------------------ local import here ---------------------------
import { CreateUserService } from "../Services/User.services.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";


export const CreateUser = AsyncHandler(async (req, res) => {
    const data = req.body;
    await CreateUserService(data);
    return res.status(StatusCodes.CREATED).json({
        message: "User Created Successfully"
    });
});