
import { Router } from "express";

// ---------------- local imports here ---------------------------
import { OpenTaskChart, TicketActivityChart, TicketOverViewChart } from "../controller/Dashboard.controller.js";

const routes = Router();

routes.route("/ticket-overview").get(TicketOverViewChart);
routes.route("/ticket-activity").get(TicketActivityChart);
routes.route("/open-task").get(OpenTaskChart);


export default routes;







