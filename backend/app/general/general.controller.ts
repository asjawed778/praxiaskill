import asyncHandler from 'express-async-handler';
import { type Request, type Response } from 'express';
import createHttpError from 'http-errors';
import { createResponse } from '../common/helper/response.hepler';
import { contactUsEmailTemplate } from '../common/template/contactus';
import { sendEmail } from '../common/services/email.service';


export const contactUs = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;

    const emailTemplate = contactUsEmailTemplate(data.name, data.email, data.subject, data.message);

    await sendEmail({
        from: `Praxia Skill <${process.env.MAIL_USER}>`,
        to: process.env.MAIL_USER,
        subject: "Contact Us",
        replyTo: data.email,
        html: emailTemplate,
    });
    res.send(createResponse({}, "Email sent successfully"));

});