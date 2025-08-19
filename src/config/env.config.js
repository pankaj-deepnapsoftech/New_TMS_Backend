import dotenv from "dotenv";
dotenv.config();


class Config{
    NODE_ENV;
    MONGODB_URI;
    LOCAL_CLIENT_URL;
    CLIENT_URL;
    JWT_SECRET;
    GOOGLE_APP_PASSWORD;
    LOCAL_BACKEND_URL;
    BACKEND_URL;
    constructor(){
        this.NODE_ENV = process.env.NODE_ENV;
        this.MONGODB_URI = process.env.MONGODB_URI;
        this.LOCAL_CLIENT_URL = process.env.LOCAL_CLIENT_URL;
        this.CLIENT_URL = process.env.CLIENT_URL;
        this.JWT_SECRET = process.env.JWT_SECRET;
        this.EMAIL_ID = process.env.EMAIL_ID;
        this.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
        this.LOCAL_BACKEND_URL = process.env.LOCAL_BACKEND_URL;
        this.BACKEND_URL = process.env.BACKEND_URL;
    }
}

export const config = new Config();