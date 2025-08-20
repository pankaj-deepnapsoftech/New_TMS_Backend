import { Router } from "express";

import { CreateDepartment, deleteDepartment, getDepartment, updateDepartment } from "../controller/Department.controller.js";

const routes = Router();

routes.route("/create").post(CreateDepartment);
routes.route("/get/:creator").get(getDepartment);
routes.route("/update/:id").put(updateDepartment);
routes.route("/delete/:id").delete(deleteDepartment);

export default routes;