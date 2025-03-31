import Razorpay from "razorpay";
import { loadConfig } from "../common/helper/config.hepler";
import { ITransaction } from "./payment.dto";
import transactionSchema from "./payment.transaction";
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

export const createTransaction = async(userId: string, courseId: string, data: ITransaction, orderId: string) => {
    const result = await transactionSchema.create({...data, orderId, userId, courseId});
    return result;
};