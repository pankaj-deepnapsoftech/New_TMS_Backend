import { Router } from "express";

// ---------------- local import here --------------------------
import { GetNotification, UpdateNotification } from "../controller/Notification.controller.js";


const routes = Router()


routes.route("/get").get(GetNotification);
routes.route("/update/:id").put(UpdateNotification);


export default routes;







