import mongoose from "mongoose";
import { ICourseNotes } from "./course.dto";


export const CourseNotesSchema = new mongoose.Schema<ICourseNotes>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
    },
    subSectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection"
    },
    notes: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model<ICourseNotes>("CourseNotes", CourseNotesSchema);