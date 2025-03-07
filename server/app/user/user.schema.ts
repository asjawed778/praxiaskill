import mongoose from "mongoose";
import { type IUser } from "./user.dto";

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  USER = "USER",
  INSTRUCTOR = "INSTRUCTOR"
}

const UserSchema = new mongoose.Schema<IUser>(
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
    },
    profilePic: {
      type: String,
      required: false
    },
    refreshToken: {
      type: String,
      default: null
    },
    resetPasswordToken: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("user", UserSchema);
