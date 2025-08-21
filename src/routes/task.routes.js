import { Router } from "express";

// ------------------------- local imports here ---------------------------------------
import { CreateTask, DeleteTask, getTask, UpdateTask } from "../controller/task.controller.js";


const routes = Router();

routes.route("/create").post(CreateTask);
routes.route("/get/:ticket").get(getTask);
routes.route("/delete/:id").delete(DeleteTask);
routes.route("/update/:id").put(UpdateTask);


export default routes




