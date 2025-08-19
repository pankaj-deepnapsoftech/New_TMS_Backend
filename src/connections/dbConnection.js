import mongoose from "mongoose";

// ------------ local imports ---------------------------------
import { config } from "../config/env.config.js";
import getLogger from "../utils/logger.js";

const logger = getLogger("db Connection file")


// ----------------------- this function is  for databse connection --------------------------------
export const DbConnect = async() => {
    let isConnected = false ;

    do{
        try {
            const connected =  await mongoose.connect(config.MONGODB_URI,{dbName:"TMS"});
            logger.info(`database connected successfully and host is ${connected.connection.host}`);
            isConnected = true;
        } catch (error) {
            logger.error(error.message);
            logger.info("Database not connected Retrying .......");
        }
    } while(!isConnected)
}