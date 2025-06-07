import mongoose from "mongoose";
import { BaseSchema } from "../common/dto/base.dto";

interface IVisitor extends BaseSchema {
    ip: string;
    path: string;
    device: "desktop" | "mobile" | "tablet";
    country: string;
    region?: string;
    city?: string;
    browser?: string;
    os?: string;
}

const VisitorSchema = new mongoose.Schema<IVisitor>({
    ip: { type: String, required: true },
    path: { type: String, required: true },
    device: {
        type: String,
        enum: ["desktop", "mobile", "tablet"],
        required: true
    },
    country: { type: String, default: "Unknown" },
    region: String,
    city: String,
    browser: String,
    os: String
}, { timestamps: true });

export default mongoose.model<IVisitor>("Visitor", VisitorSchema);