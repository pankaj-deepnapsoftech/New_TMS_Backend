import {Router} from "express";

// ------------------------------ local imports here ---------------------------------
import { CreateRenual, DeleteRenual, GetRenual, UpdateRenual } from "../controller/Renual.controller.js";

const routes = Router();

routes.route("/create").post(CreateRenual);
routes.route("/get").post(GetRenual);
routes.route("/delete/:id").post(DeleteRenual);
routes.route("/update/:id").post(UpdateRenual);


export default routes



