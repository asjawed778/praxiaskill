import mongoose from "mongoose";
import { ISubSection } from "./course.dto";

const subSectionSchema = new mongoose.Schema<ISubSection>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    video: {
        link: {
            type: String,
            required: false
        },
        duration: {
            type: String,
            required: false
        },
        variants: [{
            resolution: {
                type: String,
                enum: ["360p", "480p", "720p", "1080p"],
                required: true
            },
            link: {
                type: String,
                required: true
            }
        }],
        hlsPlaylist: {
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