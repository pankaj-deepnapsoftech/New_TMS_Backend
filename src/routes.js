import { Router } from "express";

// ------------------------ local imports here --------------------------
import { Autherization } from "./middleware/Autherization.js";
import DepartmentRoutes from "./routes/department.routes.js";
import RoleRoutes from "./routes/roles.routes.js"
import TicketRoutes from "./routes/Ticket.routes.js"
import UserRoute from "./routes/user.routes.js";


const routes = Router();

routes.use("/user",UserRoute);
routes.use("/department",Autherization,DepartmentRoutes);
routes.use("/role",Autherization,RoleRoutes);
routes.use("/ticket",Autherization,TicketRoutes);



export default routes




