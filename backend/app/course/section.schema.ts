
import mongoose from "mongoose";
import { ISection } from "./course.dto";

const sectionSchema = new mongoose.Schema<ISection>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    assignments: [{
        type: String,
        required: false
    }],
    projects: [{
        type: String,
        required: false
    }],
    subSections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection"
    }],
    duration: {
        type: String,
        required: false
    }
}, { timestamps: true });

export default mongoose.model("Section", sectionSchema);