import mongoose from "mongoose";
import { ISubSection } from "./course.dto";

const subSectionSchema = new mongoose.Schema<ISubSection>({
    title: {
        type: String,
        required: true
    },
    video: {
        link: {
            type: String,
            required: false
        },
        duration: {
            type: String,
            required: false
        }
    },
    pdf: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    resources: [{
        type: String,
        required: false
    }],
    isPreview: {
        type: Boolean,
        required: false
    },
}, { timestamps: true });

export default mongoose.model("SubSection", subSectionSchema);