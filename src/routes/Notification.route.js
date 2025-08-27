import { Router } from "express";

// ---------------- local import here --------------------------
import { GetNotification } from "../controller/Notification.controller.js";


const routes = Router()


routes.route("/get").get(GetNotification)


export default routes;







