import Razorpay from "razorpay";
import { loadConfig } from "../common/helper/config.hepler";
import { ITransaction } from "./payment.dto";
import transactionSchema from "./payment.transaction";
import crypto from "crypto";
import { PaymentStatus } from "./payment.enum";
import createHttpError from "http-errors";
loadConfig();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});
export const createRazorpayOrder = async (amount: number, currency?: string) => {
    const options = {
        amount: amount * 100,
        currency: currency || "INR",
        receipt: `order_rcpt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    return order;
}

export const createTransaction = async (userId: string, courseId: string, data: ITransaction, orderId: string) => {
    const result = await transactionSchema.create({ ...data, orderId, userId, courseId });
    return result;
};

interface IVerifyPaymentData {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

export const verifyPayment = (data: IVerifyPaymentData) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;
    const secret = process.env.RAZORPAY_KEY_SECRET!;

    const generated_signature = crypto
        .createHmac("sha256", secret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

    return generated_signature===razorpay_signature;
}

export const updateTransaction = async (
    userId: string,
    courseId: string,
    orderId: string, 
    isPaymentVerified: boolean, 
    paymentId: string
) => {
    const result = await transactionSchema.findOneAndUpdate(
        { userId, courseId, orderId },
        {
            paymentId, 
            paymentStatus: isPaymentVerified ? PaymentStatus.SUCCESS : PaymentStatus.FAILED 
        },
        { new: true, upsert: false }
    );

    if (!result) {
        throw createHttpError(404, "Transaction not found for update");
    }
    return result;
};
