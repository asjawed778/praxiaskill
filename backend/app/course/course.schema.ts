import mongoose from "mongoose";
import { ICourse } from "./course.dto";
import * as CourseEnum from "./course.enum";
import slugify from "slugify";

const courseSchema = new mongoose.Schema<ICourse>({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
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
    prerequisites: {
        type: String,
        required: false
    },
    courseLevel: {
        type: String,
        required: false,
    },
    tools: [{
        name: {
            type: String,
            required: true
        },
        iconName: {
            type: String,
            required: false
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
    totalLiveSession: {
        type: String,
        required: false
    },
    recordedContent: {
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

courseSchema.pre("save", async function (next) {
    const course = this as any;

    if (course.isNew || course.isModified("title")) {
        const baseSlug = slugify(course.title, {
            lower: true,
            strict: true,
            trim: true
        });

        let slug = baseSlug;
        let count = 1;
        let exists = true;

        while (exists) {
            const query = mongoose.model("Course").findOne({ slug });
            if (!course.isNew) {
                query.where("_id").ne(course._id); // Avoid self
            }

            const existingDoc = await query.exec();
            exists = !!existingDoc;

            if (exists) {
                slug = `${baseSlug}-${count++}`;
            }
        }

        course.slug = slug;
    }

    next();
});


export default mongoose.model<ICourse>("Course", courseSchema);
