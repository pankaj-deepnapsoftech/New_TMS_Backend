import { Router } from "express";

import { allDepartments, CreateDepartment, deleteDepartment, getDepartment, updateDepartment } from "../controller/Department.controller.js";

const routes = Router();

routes.route("/create").post(CreateDepartment);
routes.route("/get").get(getDepartment);
routes.route("/update/:id").put(updateDepartment);
routes.route("/delete/:id").delete(deleteDepartment);
routes.route("/all-department").get(allDepartments);

export default routes;