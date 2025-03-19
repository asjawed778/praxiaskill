import asyncHandler from 'express-async-handler';
import { type Request, type Response } from 'express';
import createHttpError from 'http-errors';
import * as eventService from './event.service';
import { createResponse } from '../common/helper/response.hepler';
import { sendEmail } from '../common/services/email.service';
import { at } from 'lodash';
import { text } from 'pdfkit';

export const ccfsEvent = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const pdfBuffer = await eventService.ccfsEvent(data);

    // Set headers for PDF response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="event.pdf"');
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: process.env.MAIL_USER,
        subject: "Event created successfully",
        text: "CCFS | Startovation 2025, Registration successful",
        attachments: [
            {
                filename: "event.pdf",
                content: pdfBuffer,
                contentType: "application/pdf",
            },
        ],
    }
    await sendEmail(mailOptions);

    res.send(createResponse({}, "Event created successfully"));
    // res.send(pdfBuffer);
});