import { FindById } from "../Services/User.services.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { BadRequestError } from "../utils/CoustomError.js";
import { VerifyToken } from "../utils/TokenHandler.js";

import { LogoutUserIfLoginAnyWere } from "./UserLogoutHandler.js";


export const Autherization = AsyncHandler(async (req,res,next) => {
    LogoutUserIfLoginAnyWere(req,res,next)
    const token = req.cookies.at || req.headers.authorization?.split(" ")[1]
    
    const {id} = VerifyToken(token);
    const user = await FindById(id);
    if(!user){
        throw new BadRequestError("Unauthorize User","Autherization function");
    }
    req.currentUser = user;
    next()
});