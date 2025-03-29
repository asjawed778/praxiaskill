import mongoose from "mongoose";
import { IEnrollment } from "./course.dto";
import * as CourseEnum from "./course.enum";

const enrollmentSchema = new mongoose.Schema<IEnrollment>({
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
    enrolledAt: {
        type: Date,
        required: true
    },
    expiresAt: {
        type: Date
    },
    progress: {
        type: Number,
        required: true,
        default: 0
    },
    isCompleted: {
        type: Boolean,
        required: true
    },
    certificate: {
        type: String
    },
    status: {
        type: String,
        enum: Object.values(CourseEnum.Status),
        required: true,
        default: CourseEnum.Status.ACTIVE
    }
}, { timestamps: true });

export default mongoose.model("Enrollment", enrollmentSchema);