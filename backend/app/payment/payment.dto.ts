import mongoose from "mongoose";
import { BaseSchema } from "../common/dto/base.dto";
import { DiscountType } from "./payment.enum";

export interface ICoupon extends BaseSchema {
  code: string;
  discountType: DiscountType;
  discountValue: number;
  maxDiscountAmount?: number; 
  applicableCourses?: mongoose.Schema.Types.ObjectId[];
  allowedUsers?: mongoose.Schema.Types.ObjectId[];
  usageLimit?: number;
  perUserLimit?: number;
  expiresAt: Date;
  isActive?: boolean;
}
