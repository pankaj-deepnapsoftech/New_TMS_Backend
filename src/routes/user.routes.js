
import {Router} from "express";

// --------------- local imports here ---------------------
import { AllUsers, assignedAllUserData, getLogedInUser, Loginuser, logoutUser, RegisterUser, updateUserData, verifyEmail } from "../controller/User.controller.js";
import { Autherization } from "../middleware/Autherization.js";
import { Validater } from "../middleware/validator.js";
import { LoginValidation, RegisterValidation } from "../validation/user.validation.js";


const routes = Router();

routes.route("/register").post(Validater(RegisterValidation),RegisterUser);
routes.route("/login").post(Validater(LoginValidation),Loginuser);
routes.route("/loged-in-user").get(Autherization,getLogedInUser);
routes.route("/logout-user").post(Autherization,logoutUser);
routes.route("/all-users").get(Autherization,AllUsers);
routes.route("/update-user/:id").put(Autherization,updateUserData);
routes.route("/get-all-users").get(Autherization,assignedAllUserData);
routes.route("/verify").put(Autherization,verifyEmail);


export default routes




