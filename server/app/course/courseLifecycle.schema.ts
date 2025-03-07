import mongoose from "mongoose";
import { ICourseLifeCycle } from "./course.dto";

const courseLifecycleSchema = new mongoose.Schema<ICourseLifeCycle>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    allCourses: [{  // Stores all courses, regardless of status
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }],
    DRAFT: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    PUBLISHED: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    UNPUBLISHED: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    TERMINATED: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }]
}, { timestamps: true });

/**
 * Middleware to ensure a course is only in one status
 */
courseLifecycleSchema.pre("save", function (next) {
    const doc = this as ICourseLifeCycle;

    // Ensure all courses in status fields exist in `allCourses`
    const statusCourses = [
        ...doc.DRAFT,
        ...doc.PUBLISHED,
        ...doc.UNPUBLISHED,
        ...doc.TERMINATED
    ];

    doc.allCourses = [...new Set(statusCourses.map(course => new mongoose.Schema.Types.ObjectId(course?.toString())))] as mongoose.Schema.Types.ObjectId[];

    // Check if any course appears in multiple statuses
    const courseSet = new Set(statusCourses.map(course => course?.toString()));

    if (courseSet.size !== statusCourses.length) {
        return next(new Error("A course can only belong to one status field."));
    }
    
    next();
});

export default mongoose.model<ICourseLifeCycle>("CourseLifecycle", courseLifecycleSchema);
