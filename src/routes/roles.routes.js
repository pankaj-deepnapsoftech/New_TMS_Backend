import { Router } from "express";

// -------------------------- local import here -------------------
import { CreateRole, deleteRole, getAllRole, getRole, updateRole } from "../controller/Role.controller.js";


const routes = Router();

routes.route("/create").post(CreateRole);
routes.route("/get/:creator").get(getRole);
routes.route("/update/:id").put(updateRole);
routes.route("/delete/:id").delete(deleteRole);
routes.route("/all-role").get(getAllRole);



export default routes;







