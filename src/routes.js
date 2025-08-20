import { Router } from "express";

// ------------------------ local imports here --------------------------
import DepartmentRoutes from "./routes/department.routes.js";
import RoleRoutes from "./routes/roles.routes.js"
import UserRoute from "./routes/user.routes.js";


const routes = Router();

routes.use("/user",UserRoute);
routes.use("/department",DepartmentRoutes);
routes.use("/role",RoleRoutes);



export default routes




