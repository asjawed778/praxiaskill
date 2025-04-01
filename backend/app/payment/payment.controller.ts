import asyncHandler from 'express-async-handler';
import { type Request, type Response } from 'express';
import createHttpError from 'http-errors';
import { createResponse } from '../common/helper/response.hepler';
import * as PaymentService from './payment.service';
import * as CourseService from '../course/course.service';


export const createOrder = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const { courseId } = req.params;
    if (!req.user) {
        throw createHttpError(404, "User not found, Please Login again");
    }
    const userId = req.user._id;
    const result = await PaymentService.createRazorpayOrder(data.amount, data.currency);
    const response = await PaymentService.createTransaction(userId, courseId, data, result.id);
    res.send(createResponse(result, "order created sucessfully"));
});

export const verifyPayment = asyncHandler(async (req: Request, res: Response) => {

    const data = req.body;
    const { courseId } = req.params;
    if (!req.user) {
        throw createHttpError(404, "User not found, Please Login again");
    }
    const userId = req.user._id;
    const isPaymentVerified = PaymentService.verifyPayment(data);

    if (isPaymentVerified) {
        await PaymentService.updateTransaction(userId, courseId, data.razorpay_order_id, isPaymentVerified, data.razorpay_payment_id);
        await CourseService.enrollStudentIntoCourse(userId, courseId);
    } else {
        throw createHttpError(400, "Payment verification failed. Invalid signature.");
    }

    res.send(createResponse({}, "course purchased successfully"))
});

