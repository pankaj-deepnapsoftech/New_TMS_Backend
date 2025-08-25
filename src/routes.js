import { Router } from "express";

// ------------------------ local imports here --------------------------
import { Autherization } from "./middleware/Autherization.js";
import CommentRoutes from "./routes/Comment.route.js"
import DepartmentRoutes from "./routes/department.routes.js";
import ImpDocsRoutes from "./routes/importantDocs.route.js";
import RenualRoutes from "./routes/Renuals.route.js";
import RoleRoutes from "./routes/roles.routes.js";
import StatusRoutes from "./routes/status.routes.js"
import TaskRoutes from "./routes/task.routes.js";
import TicketRoutes from "./routes/Ticket.routes.js";
import UserRoute from "./routes/user.routes.js";


const routes = Router();


routes.use("/user",UserRoute);
routes.use("/department",Autherization,DepartmentRoutes);
routes.use("/role",Autherization,RoleRoutes);
routes.use("/ticket",Autherization,TicketRoutes);
routes.use("/task",Autherization,TaskRoutes);
routes.use("/comment",Autherization,CommentRoutes);
routes.use("/status",Autherization,StatusRoutes);
routes.use("/renuals",Autherization,RenualRoutes);
routes.use("/imp-docs",Autherization,ImpDocsRoutes);



export default routes




