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
    brouchure: {
        type: String,
        required: false
    },
    thumbnail: {
        type: String,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: false
    },
    description: {
        type: String,
        required: true
    },
    keypoints: [{
        type: String,
        required: false
    }],
    tags: [{
        type: String,
        required: false
    }],
    whatWillYouLearn: [{
        type: String,
        required: false
    }],
    prerequisites: [{
        type: String,
        required: false
    }],
    courseLevel: {
        type: String,
        required: false,
    },
    tools: [{
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: false
        }
    }],
    faq: [{
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        },
        resourceUrl: {
            type: String,
            required: false
        }
    }],
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
        required: false
    },
    totalLectures: {
        type: Number,
        required: false
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
        default: CourseEnum.CourseStatus.PUBLISHED
    },
    validity: {
        type: String,
        required: true,
        enum: Object.values(CourseEnum.CourseValidity),
        default: CourseEnum.CourseValidity.LIFETIME
    }
}, { timestamps: true });

export default mongoose.model<ICourse>("Course", courseSchema);
