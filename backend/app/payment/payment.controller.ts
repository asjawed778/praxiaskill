import asyncHandler from 'express-async-handler';
import { type Request, type Response } from 'express';
import createHttpError from 'http-errors';
import { createResponse } from '../common/helper/response.hepler';
import * as PaymentService from './payment.service';

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const { courseId } = req.params;
    if(!req.user) {
        throw createHttpError(404, "User not found, Please Login again");
    }
    const userId = req.user._id;
    const result = await PaymentService.createRazorpayOrder(data.amount, data.currency);
    const response = await PaymentService.createTransaction(userId, courseId, data, result.id);
    res.send(createResponse({result, response}, "order created sucessfully"));

});

