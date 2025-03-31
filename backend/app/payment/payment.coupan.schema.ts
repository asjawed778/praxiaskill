import mongoose from "mongoose";
import * as PaymentEnum from "./payment.enum";
import { ICoupon } from "./payment.dto";

const couponSchema = new mongoose.Schema<ICoupon>({
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    discountType: {
      type: String,
      enum: Object.values(PaymentEnum.DiscountType),
      default: PaymentEnum.DiscountType.PERCENTAGE,
      required: true,
    },
    discountValue: {
      type: Number,
      default: 0,
      required: true,
    },
    maxDiscountAmount: {
      type: Number,
      default: null,
      validate: {
        validator: function (this: any, value: number) {
          if (this.discountType === PaymentEnum.DiscountType.PERCENTAGE) {
            return value >= 1 && value <= 100;
          }
          return true;
        },
        message: "For percentage discounts, max discount amount must be between 1 and 100",
      },
    },
    applicableCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    allowedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    usageLimit: {
      type: Number,
      default: null,
    },
    perUserLimit: {
      type: Number,
      default: 1,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ICoupon>("Coupon", couponSchema);
