import asyncHandler from 'express-async-handler';
import { type Request, type Response } from 'express';
import createHttpError from 'http-errors';
import { createResponse } from '../common/helper/response.hepler';
import * as PaymentService from './payment.service';

export const createOrder = asyncHandler(async(req: Request, res: Response) => {
    const { amount, currency } = req.body;

    const result = await PaymentService.createRazorpayOrder(amount, currency);
    res.send(createResponse(result, "order created sucessfully"));
    
});

