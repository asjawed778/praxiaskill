import asyncHandler from 'express-async-handler';
import { type Request, type Response } from 'express';
import * as eventService from './event.service';
import { createResponse } from '../common/helper/response.hepler';
import { emailQueue } from '../common/queue/queues/email.queue';

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
        html: '<p>CCFS | Startovation 2025, Registration successful</p>',
        attachments: [
            {
                filename: "event.pdf",
                content: pdfBuffer,
                contentType: "application/pdf",
            },
        ],
    }

    await emailQueue.add('sendEmail', mailOptions);

    res.send(createResponse({}, "Event created successfully"));
});