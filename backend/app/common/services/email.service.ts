import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import createHttpError from "http-errors";
import { loadConfig } from "../helper/config.hepler";

loadConfig();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/**
 * Sends an email using the configured transporter (Gmail service).
 * 
 * @param {Mail.Options} mailOptions - The options for the email, including the recipient, subject, and content.
 * @returns {Promise<any>} - A promise that resolves with the result of sending the email.
 * @throws {HttpError} - Throws an HTTP error if sending the email fails.
 */
export const sendEmail = async (mailOptions: Mail.Options): Promise<any> => {
  try {
    return await transporter.sendMail(mailOptions);
  } catch (error: any) {
    createHttpError(500, { message: error.message });
  }
};

