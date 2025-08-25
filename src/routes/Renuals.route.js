import {Router} from "express";

// ------------------------------ local imports here ---------------------------------
import { CreateRenual, DeleteRenual, GetRenual, UpdateRenual } from "../controller/Renual.controller.js";

const routes = Router();

routes.route("/create").post(CreateRenual);
routes.route("/get").get(GetRenual);
routes.route("/delete/:id").delete(DeleteRenual);
routes.route("/update/:id").put(UpdateRenual);


export default routes



