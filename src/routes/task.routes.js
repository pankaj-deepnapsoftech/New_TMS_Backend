import { Router } from "express";

// ------------------------- local imports here ---------------------------------------
import { CreateTask, DeleteTask, UpdateTask } from "../controller/task.controller.js";


const routes = Router();

routes.route("/create").post(CreateTask);
routes.route("/delete/:id").delete(DeleteTask);
routes.route("/update/:id").put(UpdateTask);


export default routes




