import mongoose from "mongoose";
import * as CourseEnum from "./course.enum";
import { IEnrollment } from "./course.dto";

const enrollmentSchema = new mongoose.Schema<IEnrollment>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    certificate: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(CourseEnum.Status),
      default: CourseEnum.Status.ACTIVE,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IEnrollment>("Enrollment", enrollmentSchema);
