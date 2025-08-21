import { Router } from "express";

// -------------------------- local import here -------------------
import { CreateTicket, DeleteTicket, getTicket, UpdateTicket } from "../controller/Ticket.controller.js";


const routes = Router();


routes.route("/create").post(CreateTicket);
routes.route("/get/:creator").get(getTicket);
routes.route("/update/:id").put(UpdateTicket);
routes.route("/delete/:id").delete(DeleteTicket);



export default routes;







