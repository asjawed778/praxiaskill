import mongoose from "mongoose";
import { type ITempUser } from "./user.dto";
import { UserRole } from "./user.schema";

const TempUserSchema = new mongoose.Schema<ITempUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String, 
      enum: Object.values(UserRole),
      default: UserRole.USER,
      required: true,
    }
  },
  { timestamps: true }
);

// Create TTL index to delete unverified users after 15 minutes
TempUserSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

export default mongoose.model<ITempUser>("TempUser", TempUserSchema);
