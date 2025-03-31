import mongoose from "mongoose";
import { ITransaction } from "./payment.dto";
import * as PaymentEnum from "./payment.enum";

const transactionSchema = new mongoose.Schema<ITransaction>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: Object.values(PaymentEnum.PaymentStatus),
        default: PaymentEnum.PaymentStatus.PENDING,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    billingAddress: {
        country: String,
        state: String,
        city: String,
        village: String,
    }
});

export default mongoose.model<ITransaction>("Transaction", transactionSchema);