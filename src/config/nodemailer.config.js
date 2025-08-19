import nodemailer from "nodemailer";

// --------------------------- local imports here ----------------------
import { config } from "./env.config.js";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "me@gmail.com",
    pass: config.GOOGLE_APP_PASSWORD,
  },
});





