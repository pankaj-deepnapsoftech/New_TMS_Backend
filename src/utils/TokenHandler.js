
import jwt from "jsonwebtoken";

// ------------------- local import here ------------------------
import { config } from "../config/env.config.js";

// ------------------ generate token here -------------------------
export const SingToken = (payload ,expiry) => {
    return jwt.sign(payload,config.JWT_SECRET,expiry && {expiresIn:expiry})
}


// ------------------------- verify token here -------------------------
export const VerifyToken = (token) => {
    return jwt.verify(token,config.JWT_SECRET)
}




