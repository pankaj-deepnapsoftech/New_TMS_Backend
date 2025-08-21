import { Router } from "express";

// ------------------------ local imports here -------------------------
import { CreateStatus, DeleteStatus, GetStatus, UpdateStatus } from "../controller/StatusHistory.controller.js";

const routes = Router();

routes.route("/add").post(CreateStatus);
routes.route("/get").get(GetStatus);
routes.route("/update/:id").put(UpdateStatus);
routes.route("/delete/:id").delete(DeleteStatus);



export default routes;