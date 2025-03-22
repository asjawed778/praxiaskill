import mongoose from "mongoose";
import { ICourse } from "./course.dto";
import * as CourseEnum from "./course.enum";

const courseSchema = new mongoose.Schema<ICourse>({ 
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    keypoints: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        required: true
    }],
    whatWillYouLearn: [{
        type: String,
        required: true
    }],
    brouchure: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    ratingAndReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReviews"
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseCategory",
        required: true
    },
    price: {
        actualPrice: {
            type: Number,
            required: true
        },
        discountPercentage: {
            type: Number
        },
        finalPrice: {
            type: Number,
            required: true
        }
    },
    language: {
        type: String,
        enum: Object.values(CourseEnum.Language),
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    totalLectures: {
        type: Number,
        required: true
    },
    courseMode: {
        type: String,
        enum: Object.values(CourseEnum.CourseMode),
        required: true
    },
    trailerVideo: {
        type: String
    },
    sections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
    }],
    courseStatus: {
        type: String,
        enum: Object.values(CourseEnum.CourseStatus),
        default: CourseEnum.CourseStatus.DRAFT
    },
}, { timestamps: true });

export default mongoose.model<ICourse>("Course", courseSchema);
