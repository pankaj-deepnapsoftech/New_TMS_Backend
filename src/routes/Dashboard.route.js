
import { Router } from "express";

// ---------------- local imports here ---------------------------
import { TicketActivityChart, TicketOverViewChart } from "../controller/Dashboard.controller.js";

const routes = Router();

routes.route("/ticket-overview").get(TicketOverViewChart);
routes.route("/ticket-activity").get(TicketActivityChart);


export default routes;







