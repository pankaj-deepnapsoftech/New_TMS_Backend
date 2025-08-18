import http from "http";

import compression from "compression";
import cors from "cors";
// eslint-disable-next-line import/order
import { json, urlencoded } from "express";


// ----------- LOCAL IMPORTS HERE --------------------
import { StatusCodes } from "http-status-codes";

import { config } from "./config/env.config.js";
import MainRoutes from "./routes.js";
import { BadRequestError } from "./utils/CoustomError.js";
import getLogger from "./utils/logger.js";

const logger = getLogger('Server.js file');

const SERVER_PORT = 5001;


// ------------------------- this is main function hold all the function start ---------------------
export const Start = (app) => {
    MiddlewareHandler(app); // this function is manage all express middleware
    RouteHandler(app); // this function is handle all routes
    ErrorHandler(app); // this function is handle erros 
    startSerevr(app); // this function is start server 
};
// ------------------------- this is main function hold all the function end ---------------------



// ------------------ this is express middlewares function start ----------------------------------
function MiddlewareHandler(app) {
    app.set("trust proxy", true);
    app.use(json({ limit: "10mb" }));
    app.use(urlencoded({ limit: "10mb", extended: true }));
    app.use(compression());
    app.use(cors({
        origin: config.NODE_ENV === 'development' ? config.LOCAL_CLIENT_URL : config.CLIENT_URL,
        methods: ["POST", "PUT", "PATCH", "DELETE", "OPTION"],
        credentials: true
    }));
}
// ------------------ this is express middlewares function end ----------------------------------



// ----------------- route handler middleware start here ------------------------------
function RouteHandler(app) {
    app.use("/health", (_req, res) => res.send("Server is running healthy and Ok"));
    app.use("/api/v1", MainRoutes);
    app.use("/",(_req,_res,next)=> next(new BadRequestError("Path not found")));
}
// ----------------- route handler middleware end here ------------------------------



// --------------------- Error handler middleware function start here ----------------------------
function ErrorHandler(app) {
    app.use((error, _req, res, next) => {
        logger.error(`${error.comingFrom} or error is : ${error.message}`)
        res.status(StatusCodes.BAD_GATEWAY).json({
            message: error.message || 'somthing went Wrong',
            status: 'error',
            error: error.name,
        });
        next();
    });
}
// --------------------- Error handler middleware function end here ----------------------------



// ----------------------------- here is the start function code start --------------------- 
function startSerevr(app) {
    const server = http.createServer(app);
    server.listen(SERVER_PORT, () => {
        logger.info(`server is up and running on port : ${SERVER_PORT} `)
    })
}
// ----------------------------- here is the start function code end --------------------- 


