import asyncHandler from 'express-async-handler';
import { type Request, type Response } from 'express';
import { createResponse } from '../common/helper/response.hepler';
import { contactUsEmailTemplate } from '../common/template/contactus';
import { emailQueue } from '../common/queue/queues/email.queue';
import { getUserAnalytics } from '../user/user.service';
import { getCourseAnalytics, getEnquiryAnalytics } from '../course/course.service';


export const contactUs = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;

    const emailTemplate = contactUsEmailTemplate(data.name, data.email, data.subject, data.message);

    await emailQueue.add('sendEmail', {
        from: process.env.MAIL_USER,
        to: process.env.MAIL_USER,
        subject: "Contact Us",
        replyTo: data.email,
        html: emailTemplate,
    });

    res.send(createResponse({}, "Email sent successfully"));
});

export const getDashboardData = asyncHandler(async (req: Request, res: Response) => {
    const userAnalytics = await getUserAnalytics();
    const courseAnalytics = await getCourseAnalytics();
    const enquiryAnalytics = await getEnquiryAnalytics();

    const dashboardData = {
        userAnalytics,
        courseAnalytics,
        enquiryAnalytics,
    };

    res.send(createResponse(dashboardData, "Dashboard data fetched successfully"));
});