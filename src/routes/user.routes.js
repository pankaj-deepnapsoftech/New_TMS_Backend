
import {Router} from "express";

// --------------- local imports here ---------------------
import { Loginuser, RegisterUser } from "../controller/User.controller.js";
import { Validater } from "../middleware/validator.js";
import { RegisterValidation } from "../validation/user.validation.js";


const routes = Router();

routes.route("/register").post(Validater(RegisterValidation),RegisterUser);
routes.route("/login").post(Loginuser);


export default routes




