import { Router } from "express";

import UserRoute from "./routes/user.routes.js"


const routes = Router();

routes.use("/user",UserRoute);



export default routes




