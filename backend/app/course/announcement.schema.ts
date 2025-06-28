import mongoose from "mongoose";
import { ICourseAnnouncement } from "./course.dto";


export const CourseAnnouncementSchema = new mongoose.Schema<ICourseAnnouncement>({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model<ICourseAnnouncement>("CourseAnnouncement", CourseAnnouncementSchema);