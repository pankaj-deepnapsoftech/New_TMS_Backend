
import {Router} from "express";

// --------------- local imports here ---------------------
import { CreateUser } from "../controller/User.controller.js";
import { Validater } from "../middleware/validator.js";
import { RegisterValidation } from "../validation/user.validation.js";


const routes = Router();

routes.route("/create").post(Validater(RegisterValidation),CreateUser);


export default routes




