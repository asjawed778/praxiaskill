import mongoose from "mongoose";
import { ICourse } from "./course.dto";
import * as CourseEnum from "./course.enum";

const courseSchema = new mongoose.Schema<ICourse>({ 
    title: {
        type: String,
        required: function(this: ICourse): boolean { return !this.isDraft; }
    },
    subtitle: {
        type: String,
        required: function(this: ICourse) { return !this.isDraft; }
    },
    keypoints: [{
        type: String,
        required: function(this: ICourse) { return !this.isDraft; }
    }],
    description: {
        type: String,
        required: function(this: ICourse) { return !this.isDraft; }
    },
    tags: [{
        type: String,
        required: function(this: ICourse): boolean { return !this.isDraft; }
    }],
    brouchure: {
        type: String,
        required: function(this: ICourse): boolean { return !this.isDraft; }
    },
    thumbnail: {
        type: String,
        required: function(this: ICourse): boolean { return !this.isDraft; }
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: function(this: ICourse): boolean { return !this.isDraft; }
    },
    ratingAndReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReviews"
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseCategory",
        required: function(this: ICourse): boolean { return !this.isDraft; }
    },
    price: {
        actualPrice: {
            type: Number,
            required: function(this: ICourse): boolean { return !this.isDraft; }
        },
        discountPercentage: {
            type: Number
        },
        finalPrice: {
            type: Number,
            required: function(this: ICourse): boolean { return !this.isDraft; }
        }
    },
    language: {
        type: String,
        enum: Object.values(CourseEnum.Language),
        required: function(this: ICourse): boolean { return !this.isDraft; }
    },
    duration: {
        type: String,
        required: function(this: ICourse): boolean { return !this.isDraft; }
    },
    totalLectures: {
        type: Number,
        required: function(this: ICourse): boolean { return !this.isDraft; }
    },
    courseMode: {
        type: String,
        enum: Object.values(CourseEnum.CourseMode),
        required: function(this: ICourse): boolean { return !this.isDraft; }
    },
    trailerVideo: {
        type: String
    },
    sections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
    }],
    isDraft: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default mongoose.model<ICourse>("Course", courseSchema);
