
import {Router} from "express";

// --------------- local imports here ---------------------
import { getLogedInUser, Loginuser, RegisterUser } from "../controller/User.controller.js";
import { Autherization } from "../middleware/Autherization.js";
import { Validater } from "../middleware/validator.js";
import { LoginValidation, RegisterValidation } from "../validation/user.validation.js";


const routes = Router();

routes.route("/register").post(Validater(RegisterValidation),RegisterUser);
routes.route("/login").post(Validater(LoginValidation),Loginuser);
routes.route("/loged-in-user").get(Autherization,getLogedInUser)


export default routes




