import mongoose from "mongoose";
import { ICourseOverview } from "./course.dto";


export const CourseOverviewSchema = new mongoose.Schema<ICourseOverview>({
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
    overview: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model<ICourseOverview>("CourseOverview", CourseOverviewSchema);