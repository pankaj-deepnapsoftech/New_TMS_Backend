import express from "express";

import { Start } from './server.js';


// --------------------------- this is the starting point of the server ----------------------------
const InitServer = () => {
    const app = express();
    Start(app);
};

InitServer();

