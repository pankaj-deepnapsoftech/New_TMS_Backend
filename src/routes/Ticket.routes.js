import { Router } from "express";

// -------------------------- local import here -------------------
import { CreateTicket, DeleteTicket, getSingleTicket, getTicket, getTicketbyAssign, TicketDashboardData, UpdateTicket } from "../controller/Ticket.controller.js";


const routes = Router();


routes.route("/create").post(CreateTicket);
routes.route("/get").get(getTicket);
routes.route("/update/:id").put(UpdateTicket);
routes.route("/delete/:id").delete(DeleteTicket);
routes.route("/get-assign").get(getTicketbyAssign);
routes.route("/get-ticket/:id").get(getSingleTicket);
routes.route("/ticket-card-admin").get(TicketDashboardData);



export default routes;







