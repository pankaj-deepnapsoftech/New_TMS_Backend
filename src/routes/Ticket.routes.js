import { Router } from "express";

// -------------------------- local import here -------------------
import { CreateTicket, DeleteTicket, getTicket, getTicketbyAssign, UpdateTicket } from "../controller/Ticket.controller.js";


const routes = Router();


routes.route("/create").post(CreateTicket);
routes.route("/get").get(getTicket);
routes.route("/update/:id").put(UpdateTicket);
routes.route("/delete/:id").delete(DeleteTicket);
routes.route("/get-assign").get(getTicketbyAssign);



export default routes;







