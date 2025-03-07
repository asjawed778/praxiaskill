import mongoose, { Document, Schema } from "mongoose";
import { IOTP } from "../dto/otp.dto";

interface IOTPDocument extends IOTP, Document {}

const OTPSchema = new Schema<IOTPDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 10 * 60 * 1000),
    },
  },
  { timestamps: true }
);

OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<IOTPDocument>("OTP", OTPSchema);