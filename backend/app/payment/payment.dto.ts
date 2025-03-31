import mongoose from "mongoose";
import { BaseSchema } from "../common/dto/base.dto";
import * as PaymentEnum from "./payment.enum";

export interface ICoupon extends BaseSchema {
  code: string;
  discountType: PaymentEnum.DiscountType;
  discountValue: number;
  maxDiscountAmount?: number; 
  applicableCourses?: mongoose.Schema.Types.ObjectId[];
  allowedUsers?: mongoose.Schema.Types.ObjectId[];
  usageLimit?: number;
  perUserLimit?: number;
  expiresAt: Date;
  isActive?: boolean;
}

export interface BillingAddress {
  country: string;
  state: string;
  city: string;
  village: string;
}

export interface ITransaction extends BaseSchema {
  userId: mongoose.Schema.Types.ObjectId;
  courseId: mongoose.Schema.Types.ObjectId;
  orderId: string;
  paymentId: string;
  paymentStatus: PaymentEnum.PaymentStatus;
  amount: number;
  billingAddress: BillingAddress;
}


