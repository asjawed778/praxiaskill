import mongoose from "mongoose";
import { ICourseEnquiry } from "./course.dto";
import { EnquiryStatus } from "./course.enum";

const CourseEnquirySchema = new mongoose.Schema<ICourseEnquiry>({
    ticketNo: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        required: true,
    },
    intrestedCourse: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(EnquiryStatus),
        default: EnquiryStatus.PENDING,
    },
    whatsAppOptIn: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

// Middleware to generate a unique 6-digit ticket number before saving
CourseEnquirySchema.pre("save", async function (next) {
    if (!this.ticketNo) {
        let ticketExists = true;
        while (ticketExists) {
            const randomTicket = Math.floor(100000 + Math.random() * 900000).toString();
            const existingTicket = await mongoose.model("CourseEnquiry").findOne({ ticketNo: randomTicket });
            if (!existingTicket) {
                this.ticketNo = randomTicket;
                ticketExists = false;
            }
        }
    }
    next();
});

export default mongoose.model<ICourseEnquiry>("CourseEnquiry", CourseEnquirySchema);