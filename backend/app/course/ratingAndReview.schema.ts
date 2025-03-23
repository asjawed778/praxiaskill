import mongoose from "mongoose";
import { IRatingAndReviews } from "./course.dto";

const ratingAndReviewSchema = new mongoose.Schema<IRatingAndReviews>({
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
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: false
    }
}, { timestamps: true });

export default mongoose.model("RatingAndReviews", ratingAndReviewSchema);