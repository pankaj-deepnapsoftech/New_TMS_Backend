
import { Router } from "express";

// ---------------- local imports here ---------------------------
import { CompletedTaskChart, DashboardCardData, DashboardTicketOverdueChart, DashboardUserTaskStatus, OpenTaskChart, TicketActivityChart, TicketOverViewChart } from "../controller/Dashboard.controller.js";

const routes = Router();

routes.route("/ticket-overview").get(TicketOverViewChart);
routes.route("/ticket-activity").get(TicketActivityChart);
routes.route("/open-task").get(OpenTaskChart);
routes.route("/complete-task").get(CompletedTaskChart);
routes.route("/card-data").get(DashboardCardData);
routes.route("/user-tasks/:id").get(DashboardUserTaskStatus);
routes.route("/overdue-tickets").get(DashboardTicketOverdueChart);


export default routes;







