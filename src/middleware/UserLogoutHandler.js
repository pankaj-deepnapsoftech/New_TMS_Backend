import { StatusCodes } from "http-status-codes";

// ---------------------- local import here --------------------
import { FindByUserWithId } from "../Services/User.services.js";
import { NotFoundError } from "../utils/CoustomError.js";
import { VerifyToken } from "../utils/TokenHandler.js";


export const LogoutUserIfLoginAnyWere = async (req, res, next) => {
    const token = req.cookies.rt
    const { id } = VerifyToken(token);
    const user = await FindByUserWithId(id);
    if (!user) {
        throw new NotFoundError("User Not Exist", "LogoutUserIfLoginAnyWere function")
    }
    if (token !== user.refresh_token) {
        res.clearCookie('at').clearCookie('rt').status(StatusCodes.OK).json({
            message: "User logout successfully"
        });
    }
    next()
}