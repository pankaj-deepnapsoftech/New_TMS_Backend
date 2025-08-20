import nodemailer from "nodemailer";

// --------------------------- local imports here ----------------------
import { config } from "./env.config.js";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.EMAIL_ID,
    pass: config.EMAIL_PASSWORD,
  },
});





