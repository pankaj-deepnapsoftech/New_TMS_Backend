import { Router } from "express";

// -------------------------- local import here -------------------
import { CreateRole, deleteRole, getRole, updateRole } from "../controller/Role.controller.js";


const routes = Router();


routes.route("/create").post(CreateRole);
routes.route("/get/:creator").get(getRole);
routes.route("/update/:id").put(updateRole);
routes.route("/delete/:id").delete(deleteRole);



export default routes;







