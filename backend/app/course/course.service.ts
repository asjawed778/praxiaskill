import mongoose from "mongoose";
import * as CourseDTO from "./course.dto";
import courseSchema from "./course.schema";
import sectionSchema from "./section.schema";
import subSectionSchema from "./subSection.schema";
import CourseEnquirySchema from "./course.enquiry";
import * as courseEnum from "./course.enum";
import ratingAndReviewSchema from "./ratingAndReview.schema";
import enrollmentSchema from "./enrollment.schema";
import createHttpError from "http-errors";
import qnaSchema from "./qna.schema";
import { SortOrder } from 'mongoose';
import slugify from "slugify";
import courseNotesSchema from "./course.notes.schema";

export const courseSlug = async (title: string, excludeId?: string | mongoose.Types.ObjectId): Promise<string> => {
    const baseSlug = slugify(title, {
        lower: true,
        strict: true,
        trim: true,
    });

    let slug = baseSlug;
    let count = 1;
    let exists = true;

    while (exists) {
        const query: any = { slug };
        if (excludeId) {
            query._id = { $ne: excludeId };
        }

        const existing = await courseSchema.findOne(query);
        exists = !!existing;

        if (exists) {
            slug = `${baseSlug}-${count++}`;
        }
    }

    return slug;
}

export const isCourseExist = async (identifier: string): Promise<boolean> => {
    if (mongoose.Types.ObjectId.isValid(identifier)) {
        const courseExists = await courseSchema.exists({ _id: identifier });
        return courseExists !== null;
    }
    const courseExists = await courseSchema.exists({ slug: identifier });
    return courseExists !== null;
};

export const isValidSectionSubsectionId = async (courseId: string, sectionId: string, subSectionId?: string) => {
    const course = await courseSchema.findById(courseId);
    if (!course) {
        throw createHttpError(404, "Course not found, Invalid courseId");
    }
    if (!course.sections.includes(new mongoose.Types.ObjectId(sectionId) as unknown as mongoose.Schema.Types.ObjectId)) {
        throw createHttpError(404, "Section does not belong to the course");
    }
    if (!subSectionId) {
        return true;
    }
    const section = await sectionSchema.findById(sectionId);
    if (!section) {
        throw createHttpError(404, "Section not found, Invalid SectionId");
    }
    if (!section.subSections.includes(new mongoose.Types.ObjectId(subSectionId) as unknown as mongoose.Schema.Types.ObjectId)) {
        throw createHttpError(404, "Subsection does not belong to the section");
    }
    return true;
};

export const createCourse = async (data: Omit<CourseDTO.ICourse, "sections"> & { sections: (CourseDTO.ISection & { subSections: CourseDTO.ISubSection[] })[] }): Promise<any> => {

    const { sections, ...courseDetails } = data;
    const slug = await courseSlug(data.title);
    const course = await courseSchema.create({ ...courseDetails, slug });
    let totalLectures = 0;
    // Step 1: Check if sections exist and process them
    if (data.sections && data.sections.length > 0) {
        const sectionPromises = data.sections.map(async (section) => {
            const subsectionDocs = await subSectionSchema.insertMany(section.subSections);
            totalLectures += subsectionDocs.length;
            const subsectionIds = subsectionDocs.map((sub) => sub._id);

            // Step 2: Create section with subsection IDs
            const savedSection = await sectionSchema.create({
                title: section.title,
                description: section.description,
                duration: section.duration,
                subSections: subsectionIds,
                assignments: section.assignments,
                projects: section.projects
            });

            return savedSection._id;
        });

        // Execute all section insertions in parallel
        const sectionIds = await Promise.all(sectionPromises);

        // Step 3: Update Course with new section IDs
        const result = await courseSchema.findByIdAndUpdate(
            course._id,
            { $set: { sections: sectionIds, totalLectures } },
            { new: true }
        );
        return result;
    }
    return course as CourseDTO.ICourse;
};

export const updateCourseDetails = async (courseId: string, data: CourseDTO.IUpdateCourseDetails): Promise<any> => {
    const slug = await courseSlug(data.title);
    const course = await courseSchema.findByIdAndUpdate(courseId, { ...data, slug }, { new: true });
    return course as CourseDTO.ICourse;
};

export const getCourseContent = async (courseId: string): Promise<any> => {
    const coursesContent = await courseSchema.findById(courseId)
        .select("_id title sections")
        .populate({
            path: "sections",
            populate: {
                path: "subSections"
            },
        });
    return coursesContent;
};

export const getEnrolledCourseCountByUser = async (userId: string): Promise<number> => {
    const count = await enrollmentSchema.countDocuments({ userId });
    return count;
};

export const draftCourse = async (courseId: string): Promise<any> => {
    const result = await courseSchema.findByIdAndUpdate
        (courseId, { courseStatus: "DRAFT" }, { new: true });
    return result;
};

export const terminateCourse = async (courseId: string): Promise<any> => {
    const result = await courseSchema.findByIdAndUpdate
        (courseId, { courseStatus: "TERMINATED" }, { new: true });
    return result;
};

export const publishCourse = async (courseId: string): Promise<any> => {
    const result = await courseSchema.findByIdAndUpdate
        (courseId, { courseStatus: "PUBLISHED" }, { new: true });
    return result;
};

export const getCourseDetails = async (identifier: string): Promise<any> => {
    const query = mongoose.Types.ObjectId.isValid(identifier)
        ? { _id: identifier }
        : { slug: identifier };
    const course = await courseSchema
        .findOne(query)
        .populate({
            path: "instructor",
            select: "_id name email profilePic",
        })
        .populate({
            path: "category",
            select: "_id name",
        })
        .populate({
            path: "sections",
            select: "title description duration assignments projects subSections",
            populate: {
                path: "subSections",
                select: "_id title",
            },
        }).lean();

    if (!course) {
        return course;
    }

    let totalProjects = 0;
    let totalAssignments = 0;
    const result: any = course;

    result.sections.forEach((section: any) => {
        totalProjects += (section.projects as any)?.length || 0;
        totalAssignments += (section.assignments as any)?.length || 0;
    });
    const topRatings = await ratingAndReviewSchema
        .find({ courseId: course._id })
        .sort({ rating: -1 })
        .limit(10)
        .populate({
            path: "userId",
            select: "_id name profilePic",
        })
        .lean();
    return {
        ...course,
        totalProjects,
        totalAssignments,
        testimonials: topRatings
    };
};

export const getPublishedCoursesByCategory = async (categoryId: string, pageNo: number = 1): Promise<any> => {
    const pageSize = 10;
    const skip = (pageNo - 1) * pageSize;

    const result = await courseSchema.aggregate([
        {
            $match: {
                category: new mongoose.Types.ObjectId(categoryId),
                courseStatus: courseEnum.CourseStatus.PUBLISHED
            }
        },
        {
            $lookup: {
                from: "ratingandreviews",
                localField: "_id",
                foreignField: "courseId",
                as: "ratingsData"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "instructor",
                foreignField: "_id",
                as: "instructorDetails"
            }
        },
        {
            $lookup: {
                from: "coursecategories",
                localField: "category",
                foreignField: "_id",
                as: "categoryDetails"
            }
        },
        {
            $addFields: {
                totalRatings: { $size: "$ratingsData" },
                averageRating: {
                    $cond: {
                        if: { $eq: [{ $size: "$ratingsData" }, 0] },
                        then: 0,
                        else: { $avg: "$ratingsData.rating" }
                    }
                },
                instructor: { $arrayElemAt: ["$instructorDetails", 0] },
                category: { $arrayElemAt: ["$categoryDetails", 0] }
            }
        },
        {
            $project: {
                _id: 1,
                title: 1,
                subtitle: 1,
                tags: 1,
                slug: 1,
                duration: 1,
                thumbnail: 1,
                language: 1,
                courseMode: 1,
                totalLectures: 1,
                totalRatings: 1,
                averageRating: 1,
                "instructor._id": 1,
                "instructor.name": 1,
                "instructor.profilePic": 1,
                "category._id": 1,
                "category.name": 1
            }
        },
        { $skip: skip },
        { $limit: pageSize }
    ]);

    return {
        success: true,
        totalCourses: result.length,
        page: pageNo,
        pageSize,
        courses: result
    };
};

export const courseEnquiry = async (data: CourseDTO.ICourseEnquiry): Promise<any> => {
    const enquiry = new CourseEnquirySchema(data);
    await enquiry.save();
    return enquiry;
};

export const getCourseEnquiry = async (pageNo: number = 1): Promise<any> => {
    const pageSize = 10;
    const skip = (pageNo - 1) * pageSize;

    const totalResults = await CourseEnquirySchema.countDocuments();

    const enquiries = await CourseEnquirySchema.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize);

    const startEntry = skip + 1;
    const endEntry = Math.min(skip + pageSize, totalResults);

    return {
        enquiries,
        startEntry,
        endEntry,
        currentPage: pageNo,
        totalResults,
    };
};

export const changeEnquiryStatus = async (enquiryId: string, status: string): Promise<CourseDTO.ICourseEnquiry> => {
    const enquiry = await CourseEnquirySchema.findByIdAndUpdate(enquiryId, { status }, { new: true });
    return enquiry as CourseDTO.ICourseEnquiry;
};

// this will be final course get service all redundant codes
export const getCourses = async (pageNo: number = 1, limit: number = 10, category?: string, status?: courseEnum.CourseStatus, search?: string): Promise<any> => {
    const skip = (pageNo - 1) * limit;
    const query: any = {
        courseStatus: status || courseEnum.CourseStatus.PUBLISHED
    };

    if (category) {
        query.category = new mongoose.Types.ObjectId(category);
    }

    const result = await courseSchema.aggregate([
        {
            $match: query
        },
        {
            $lookup: {
                from: "ratingandreviews",
                localField: "_id",
                foreignField: "courseId",
                as: "ratingsData"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "instructor",
                foreignField: "_id",
                as: "instructorDetails"
            }
        },
        {
            $lookup: {
                from: "coursecategories",
                localField: "category",
                foreignField: "_id",
                as: "categoryDetails"
            }
        },
        {
            $addFields: {
                totalRatings: { $size: "$ratingsData" },
                averageRating: {
                    $cond: {
                        if: { $eq: [{ $size: "$ratingsData" }, 0] },
                        then: 0,
                        else: { $avg: "$ratingsData.rating" }
                    }
                },
                instructor: { $arrayElemAt: ["$instructorDetails", 0] },
                category: { $arrayElemAt: ["$categoryDetails", 0] }
            }
        },
        {
            $project: {
                _id: 1,
                title: 1,
                subtitle: 1,
                tags: 1,
                slug: 1,
                duration: 1,
                thumbnail: 1,
                language: 1,
                courseMode: 1,
                totalLectures: 1,
                totalRatings: 1,
                averageRating: 1,
                "instructor._id": 1,
                "instructor.name": 1,
                "instructor.profilePic": 1,
                "category._id": 1,
                "category.name": 1
            }
        },
        { $skip: skip },
        { $limit: limit }
    ]);

    return {
        success: true,
        totalCourses: result.length,
        page: pageNo,
        pageSize: limit,
        courses: result
    };
};

export const getPublishedCourses = async (pageNo: number = 1, limit: number = 10, category?: string): Promise<any> => {
    const skip = (pageNo - 1) * limit;
    const query: any = {
        courseStatus: courseEnum.CourseStatus.PUBLISHED
    };

    if (category) {
        query.category = new mongoose.Types.ObjectId(category);
    }

    const result = await courseSchema.aggregate([
        {
            $match: query
        },
        {
            $lookup: {
                from: "ratingandreviews",
                localField: "_id",
                foreignField: "courseId",
                as: "ratingsData"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "instructor",
                foreignField: "_id",
                as: "instructorDetails"
            }
        },
        {
            $lookup: {
                from: "coursecategories",
                localField: "category",
                foreignField: "_id",
                as: "categoryDetails"
            }
        },
        {
            $addFields: {
                totalRatings: { $size: "$ratingsData" },
                averageRating: {
                    $cond: {
                        if: { $eq: [{ $size: "$ratingsData" }, 0] },
                        then: 0,
                        else: { $avg: "$ratingsData.rating" }
                    }
                },
                instructor: { $arrayElemAt: ["$instructorDetails", 0] },
                category: { $arrayElemAt: ["$categoryDetails", 0] }
            }
        },
        {
            $project: {
                _id: 1,
                title: 1,
                subtitle: 1,
                tags: 1,
                slug: 1,
                duration: 1,
                thumbnail: 1,
                language: 1,
                courseMode: 1,
                totalLectures: 1,
                totalRatings: 1,
                averageRating: 1,
                "instructor._id": 1,
                "instructor.name": 1,
                "instructor.profilePic": 1,
                "category._id": 1,
                "category.name": 1
            }
        },
        { $skip: skip },
        { $limit: limit }
    ]);

    return {
        success: true,
        totalCourses: result.length,
        page: pageNo,
        pageSize: limit,
        courses: result
    };
};

export const rateCourse = async (courseId: string, userId: string, data: CourseDTO.IRatingAndReviews): Promise<any> => {
    const existingRating = await ratingAndReviewSchema.findOne({ courseId, userId });
    console.log("Existing Rating:", existingRating);
    if (existingRating) {
        existingRating.rating = data.rating;
        existingRating.comment = data.comment;
        await existingRating.save();
        return existingRating;
    }
    const rating = new ratingAndReviewSchema({
        ...data,
        courseId,
        userId,
    });
    await rating.save();
    return rating;
};

export const getRatings = async (
    courseId: string,
    pageNo: number = 1,
    pageSize: number = 10,
    userId?: string,
    sort?: 'latest' | 'oldest'
): Promise<{
    ratings: CourseDTO.IRatingAndReviews[];
    totalRatings: number;
    averageRating: number;
    pageNo: number;
    pageSize: number;
    totalPages: number;
    isRated: boolean;
}> => {
    const skip = (pageNo - 1) * pageSize;

    const isRated = userId ? await ratingAndReviewSchema.exists({ courseId: new mongoose.Types.ObjectId(courseId), userId: new mongoose.Types.ObjectId(userId) }) : false;
    console.log("Israted:", isRated);
    const totalRatings = await ratingAndReviewSchema.countDocuments({ courseId });

    const averageRatingResult = await ratingAndReviewSchema.aggregate([
        { $match: { courseId: new mongoose.Types.ObjectId(courseId) } },
        { $group: { _id: null, averageRating: { $avg: "$rating" } } }
    ]);

    const averageRating = averageRatingResult[0]?.averageRating || 0;

    const sortOptions: Record<string, SortOrder> = sort === 'oldest'
        ? { createdAt: 1 }
        : { createdAt: -1 };

    const ratings = await ratingAndReviewSchema.find({ courseId })
        .populate({
            path: "userId",
            select: "_id name profilePic"
        })
        .sort(sortOptions)
        .skip(skip)
        .limit(pageSize)
        .lean();

    return {
        ratings,
        totalRatings,
        averageRating: Number(averageRating.toFixed(1)),
        pageNo,
        pageSize,
        totalPages: Math.ceil(totalRatings / pageSize),
        isRated: !!isRated
    };
};

export const isUserCoursePurchased = async (courseId: string, userId: string): Promise<boolean> => {
    const isPurchased = await enrollmentSchema.exists({ courseId, userId });
    return isPurchased !== null;
};

export const isInstructor = async (courseId: string, userId: string): Promise<boolean> => {
    const course = await courseSchema.findById(courseId);
    if (!course) {
        throw createHttpError(404, "Course not found");
    }
    return course.instructor?.toString() === userId;
};

export const isUserCourseActive = async (courseId: string, userId: string): Promise<boolean> => {
    const enrollment = await enrollmentSchema.findOne({ courseId, userId });
    if (!enrollment) return false;

    const isActive = enrollment.status === courseEnum.Status.ACTIVE;
    const isNotExpired = !enrollment.expiresAt || enrollment.expiresAt > new Date();

    return isActive && isNotExpired;
};

export const deleteSection = async (courseId: string, sectionId: string): Promise<any> => {
    const course = await courseSchema.findById(courseId);
    if (!course) {
        throw createHttpError(404, "Course not found");
    }
    if (!course.sections.includes(new mongoose.Types.ObjectId(sectionId) as unknown as mongoose.Schema.Types.ObjectId)) {
        throw createHttpError(404, "Section does not belong to the course");
    }

    await courseSchema.findByIdAndUpdate(courseId, { $pull: { sections: sectionId } });

    const section = await sectionSchema.findById(sectionId);
    if (section) {
        await subSectionSchema.deleteMany({ _id: { $in: section.subSections } });
    }
    await sectionSchema.findByIdAndDelete(sectionId);

};

export const deleteSubSection = async (courseId: string, sectionId: string, subSectionId: string): Promise<any> => {
    const course = await courseSchema.findById(courseId);
    if (!course) {
        throw createHttpError(404, "Course not found");
    }
    if (!course.sections.includes(new mongoose.Types.ObjectId(sectionId) as unknown as mongoose.Schema.Types.ObjectId)) {
        throw createHttpError(404, "Section does not belong to the course");
    }

    const section = await sectionSchema.findById(sectionId);
    if (!section) {
        throw new Error("Section not found");
    }
    if (!section.subSections.includes(new mongoose.Types.ObjectId(subSectionId) as unknown as mongoose.Schema.Types.ObjectId)) {
        throw new Error("Subsection does not belong to the section");
    }

    await sectionSchema.findByIdAndUpdate(sectionId, { $pull: { subSections: subSectionId } });
    await subSectionSchema.findByIdAndDelete(subSectionId);
};

export const addContentLink = async (subSectionId: string, fileKey: string) => {
    await subSectionSchema.findByIdAndUpdate(subSectionId, {
        "video.link": fileKey
    });
};

export const getSubSectionFileKey = async (subSectionId: string) => {
    const subsection = await subSectionSchema.findById(subSectionId);
    if (!subsection || !subsection.video) return null;

    return {
        link: subsection.video.link,
        duration: subsection.video.duration,
    };
}

export const enrollStudentIntoCourse = async (userId: string, courseId: string) => {
    const result = await enrollmentSchema.create({ userId, courseId });
    return result;
}

export const isAlreadyEnrolledInCourse = async (userId: string, courseId: string) => {
    return await enrollmentSchema.exists({
        userId,
        courseId,
        status: courseEnum.Status.ACTIVE,
        $or: [
            { expiresAt: null },
            { expiresAt: { $gt: new Date() } }
        ]
    });
};

export const getMyCourses = async (userId: string, pageNo: number = 1, pageSize: number = 10) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw createHttpError(400, "Invalid user ID format");
    }

    const skip = (pageNo - 1) * pageSize;

    const result = await enrollmentSchema.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        {
            $lookup: {
                from: "courses",
                localField: "courseId",
                foreignField: "_id",
                as: "course"
            }
        },
        { $unwind: "$course" },
        {
            $lookup: {
                from: "users",
                localField: "course.instructor",
                foreignField: "_id",
                as: "instructor"
            }
        },
        { $unwind: "$instructor" },
        {
            $lookup: {
                from: "coursecategories",
                localField: "course.category",
                foreignField: "_id",
                as: "category"
            }
        },
        { $unwind: "$category" },
        {
            $addFields: {
                isExpired: {
                    $cond: {
                        if: { $and: [{ $ne: ["$expiresAt", null] }, { $lte: ["$expiresAt", new Date()] }] },
                        then: true,
                        else: false
                    }
                },
                courseStatus: {
                    $switch: {
                        branches: [
                            { case: { $eq: ["$expiresAt", null] }, then: courseEnum.Status.ACTIVE }, // Lifetime access
                            { case: { $lte: ["$expiresAt", new Date()] }, then: courseEnum.Status.EXPIRED }
                        ],
                        default: courseEnum.Status.ACTIVE
                    }
                },
                validTill: {
                    $cond: {
                        if: { $eq: ["$expiresAt", null] },
                        then: courseEnum.CourseValidity.LIFETIME,
                        else: {
                            $switch: {
                                branches: [
                                    { case: { $gte: ["$expiresAt", new Date(new Date().setFullYear(new Date().getFullYear() + 2))] }, then: courseEnum.CourseValidity.TWO_YEAR },
                                    { case: { $gte: ["$expiresAt", new Date(new Date().setFullYear(new Date().getFullYear() + 1))] }, then: courseEnum.CourseValidity.ONE_YEAR }
                                ],
                                default: courseEnum.CourseValidity.LIFETIME
                            }
                        }
                    }
                }
            }
        },
        {
            $project: {
                _id: "$course._id",
                title: "$course.title",
                subtitle: "$course.subtitle",
                tags: "$course.tags",
                thumbnail: "$course.thumbnail",
                language: "$course.language",
                duration: "$course.duration",
                totalLectures: "$course.totalLectures",
                courseMode: "$course.courseMode",
                validTill: 1,
                courseStatus: 1,
                "instructor._id": 1,
                "instructor.name": 1,
                "instructor.profilePic": 1,
                "category._id": 1,
                "category.name": 1
            }
        },
        { $skip: skip },
        { $limit: pageSize }
    ]);

    return {
        success: true,
        totalCourses: result.length,
        page: pageNo,
        pageSize,
        courses: result
    };
};

export const assignCourseByAdmin = async (userId: string, courseId: string) => {
    const course = await courseSchema.findById(courseId);
    if (!course) {
        throw createHttpError(404, "Course not found");
    }
    const enrollment = await enrollmentSchema.findOne({
        userId,
        courseId,
        status: courseEnum.Status.ACTIVE,
        $or: [
            { expiresAt: null },
            { expiresAt: { $gt: new Date() } }
        ]
    });
    if (enrollment) {
        throw createHttpError(400, "User already enrolled in this course");
    }
    const newEnrollment = await enrollmentSchema.create({ userId, courseId });
    return { course, enrollment: newEnrollment };
};

export const createQna = async (userId: string, courseId: string, sectionId: string | undefined, subSectionId: string | undefined, data: { title: string, description: string }) => {
    const qnaData: CourseDTO.ICreateQna = {
        userId: new mongoose.Types.ObjectId(userId) as unknown as mongoose.Schema.Types.ObjectId,
        courseId: new mongoose.Types.ObjectId(courseId) as unknown as mongoose.Schema.Types.ObjectId,
        question: {
            title: data.title,
            description: data.description,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    };

    if (sectionId) {
        qnaData.sectionId = new mongoose.Types.ObjectId(sectionId) as unknown as mongoose.Schema.Types.ObjectId;
    }

    if (subSectionId) {
        qnaData.subSectionId = new mongoose.Types.ObjectId(subSectionId) as unknown as mongoose.Schema.Types.ObjectId;
    }

    const result = await qnaSchema.create(qnaData);
    return result;
};

export const getQnaById = async (qnaId: string) => {
    return await qnaSchema.findById(qnaId).exec();
};

export const addReplyToQna = async (qnaId: string, userId: string, answer: string) => {
    const reply = {
        userId: new mongoose.Types.ObjectId(userId) as unknown as mongoose.Schema.Types.ObjectId,
        answer,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    const updatedQna = await qnaSchema.findByIdAndUpdate(
        qnaId,
        {
            $push: { answers: reply },
            $set: { 'question.updatedAt': new Date() }
        },
        { new: true }
    ).exec();

    if (!updatedQna) {
        throw createHttpError(404, "QnA not found");
    }

    return updatedQna;
};

export const editQnaQuestion = async (
    qnaId: string,
    data: { title: string; description?: string }
) => {
    const updateData: { 'question.title': string; 'question.updatedAt': Date; 'question.description'?: string } = {
        'question.title': data.title,
        'question.updatedAt': new Date()
    };

    // Only add description if it's provided
    if (data.description !== undefined) {
        updateData['question.description'] = data.description;
    }

    const updatedQna = await qnaSchema.findByIdAndUpdate(
        qnaId,
        { $set: updateData },
        { new: true }
    ).exec();

    if (!updatedQna) {
        throw createHttpError(404, "QnA not found");
    }

    return updatedQna;
};

export const editQnaAnswer = async (
    qnaId: string,
    answerIndex: number,
    newAnswer: string
) => {
    const qna = await qnaSchema.findById(qnaId);
    if (!qna || !qna.answers || answerIndex < 0 || answerIndex >= qna.answers.length) {
        throw createHttpError(404, "QnA or answer not found");
    }

    // Construct the update object using array index
    const updateObject = {
        [`answers.${answerIndex}.answer`]: newAnswer,
        [`answers.${answerIndex}.updatedAt`]: new Date(),
        "question.updatedAt": new Date()
    };

    const updatedQna = await qnaSchema.findByIdAndUpdate(
        qnaId,
        { $set: updateObject },
        { new: true }
    ).exec();

    if (!updatedQna) {
        throw createHttpError(404, "QnA not found after update attempt");
    }

    return updatedQna;
};

export const deleteQnaQuestion = async (qnaId: string) => {
    const deletedQna = await qnaSchema.findByIdAndDelete(qnaId).exec();

    if (!deletedQna) {
        throw createHttpError(404, "QnA not found");
    }

    return deletedQna;
};

export const deleteQnaAnswer = async (
    qnaId: string,
    answerIndex: number
) => {
    // First verify the answer exists at the given index
    const qna = await qnaSchema.findById(qnaId);
    if (!qna || !qna.answers || answerIndex < 0 || answerIndex >= qna.answers.length) {
        throw createHttpError(404, "QnA or answer not found");
    }

    // Remove the answer from the array
    const updatedQna = await qnaSchema.findByIdAndUpdate(
        qnaId,
        {
            $pull: { answers: { $exists: true } }, // Temporary pull all to access by index
            $set: { "question.updatedAt": new Date() }
        },
        { new: true }
    );

    // Rebuild the answers array without the deleted answer
    if (updatedQna && updatedQna.answers) {
        const newAnswers = [...updatedQna.answers];
        newAnswers.splice(answerIndex, 1);

        updatedQna.answers = newAnswers;
        await updatedQna.save();
    }

    return updatedQna;
};

interface GetQnasParams {
    courseId: string;
    sectionId?: string;
    subSectionId?: string;
    search?: string;
    sort?: 'latest' | 'oldest';
    upvote?: boolean;
    page?: number;
    limit?: number;
}

export const getQnas = async ({
    courseId,
    sectionId,
    subSectionId,
    search,
    sort = 'latest',
    upvote,
    page = 1,
    limit = 10
}: GetQnasParams) => {
    const pageNum = Math.max(1, Number(page));
    const perPageNum = Math.max(1, Number(limit));
    console.log("$$$$$$$$$$$$$$$$");

    // Base query
    const query: any = {
        courseId: new mongoose.Types.ObjectId(courseId)
    };

    // Add section/subsection filters if provided
    if (sectionId) {
        query.sectionId = new mongoose.Types.ObjectId(sectionId);

        if (subSectionId) {
            query.subSectionId = new mongoose.Types.ObjectId(subSectionId);
        }
    }

    // Add search filter if provided
    if (search) {
        query.$or = [
            { 'question.title': { $regex: search, $options: 'i' } },
            { 'question.description': { $regex: search, $options: 'i' } },
            { 'answers.answer': { $regex: search, $options: 'i' } }
        ];
    }

    // Build sort options
    let sortOptions: any = {};
    if (upvote) {
        sortOptions = { upvotesCount: -1 };
    } else if (sort === 'latest') {
        sortOptions = { createdAt: -1 };
    } else if (sort === 'oldest') {
        sortOptions = { createdAt: 1 };
    }

    // Get total count for pagination
    const totalItems = await qnaSchema.countDocuments(query);

    // Calculate pagination values
    const totalPages = Math.ceil(totalItems / perPageNum);
    const hasNext = pageNum < totalPages;
    const hasPrev = pageNum > 1;
    const skip = (pageNum - 1) * perPageNum;

    // Enhanced aggregation pipeline with user details
    const aggregationPipeline: any[] = [
        { $match: query },
        { $addFields: { upvotesCount: { $size: "$upvotes" } } },
        { $sort: sortOptions },
        { $skip: skip },
        { $limit: perPageNum },
        // Populate question author details
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userDetails',
                pipeline: [{
                    $project: {
                        _id: 1,
                        name: 1,
                        role: 1,
                        profilePic: 1,
                        email: 1
                    }
                }]
            }
        },
        { $unwind: '$userDetails' },
        {
            $lookup: {
                from: 'users',
                localField: 'answers.userId',
                foreignField: '_id',
                as: 'answerUserDetails',
                pipeline: [{
                    $project: {
                        _id: 1,
                        name: 1,
                        role: 1,
                        profilePic: 1,
                    }
                }]
            }
        },
        {
            $addFields: {
                answers: {
                    $map: {
                        input: "$answers",
                        as: "answer",
                        in: {
                            $mergeObjects: [
                                "$$answer",
                                {
                                    userDetails: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$answerUserDetails",
                                                    as: "user",
                                                    cond: { $eq: ["$$user._id", "$$answer.userId"] }
                                                }
                                            },
                                            0
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        {
            $project: {
                courseId: 1,
                sectionId: 1,
                subSectionId: 1,
                question: 1,
                answers: 1,
                upvotes: 1,
                upvotesCount: 1,
                createdAt: 1,
                updatedAt: 1,
                userDetails: 1,
                // answerUserDetails: 0
            }
        }
    ];

    const data = await qnaSchema.aggregate(aggregationPipeline).exec();

    return {
        data,
        currentPage: pageNum,
        perPage: perPageNum,
        totalItems,
        totalPages,
        hasNext,
        hasPrev
    };
};

// course notes service
export const createCourseNotes = async (data: CourseDTO.ICourseNotesCreate): Promise<any> => {
    const courseNotes = await courseNotesSchema.create(data);
    return courseNotes;
};

export const updateCourseNotes = async (notesId: string, notes: string): Promise<any> => {
    const updatedNotes = await courseNotesSchema.findByIdAndUpdate(
        notesId,
        { $set: { notes } },
        { new: true }
    );
    if (!updatedNotes) {
        throw createHttpError(404, "Course notes not found");
    }
    return updatedNotes;
};

export const deleteNotes = async (notesId: string): Promise<any> => {
    const deletedNotes = await courseNotesSchema.findByIdAndDelete(notesId);
    if (!deletedNotes) {
        throw createHttpError(404, "Course notes not found");
    }
    return deletedNotes;
};

export const getCourseNotes = async (queryParam: Record<string, any>): Promise<any> => {
    const skip = (queryParam.pageNo - 1) * queryParam.pageSize;
    const query: any = { userId: new mongoose.Types.ObjectId(queryParam.userId) };

    if (queryParam.courseId) {
        query.courseId = new mongoose.Types.ObjectId(queryParam.courseId);
    }
    if (queryParam.sectionId) {
        query.sectionId = new mongoose.Types.ObjectId(queryParam.sectionId);
    }
    if (queryParam.subSectionId) {
        query.subSectionId = new mongoose.Types.ObjectId(queryParam.subSectionId);
    }
    if (queryParam.search) {
        query.notes = { $regex: queryParam.search, $options: 'i' };
    }

    const sortOptions: Record<string, SortOrder> = queryParam.sort === 'latest'
        ? { createdAt: -1 }
        : { createdAt: 1 };

    const totalNotes = await courseNotesSchema.countDocuments(query);
    const totalPages = Math.ceil(totalNotes / queryParam.pageSize);

    const notes = await courseNotesSchema.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(queryParam.pageSize)
        .lean();

    return {
        notes,
        totalNotes,
        totalPages,
        currentPage: queryParam.pageNo,
        pageSize: queryParam.pageSize,
    };
};

export const getCourseAnalytics = async () => {
    const results = await Promise.all([
        courseSchema.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    active: {
                        $sum: { $cond: [{ $eq: ["$courseStatus", courseEnum.CourseStatus.PUBLISHED] }, 1, 0] }
                    },
                    draft: {
                        $sum: { $cond: [{ $eq: ["$courseStatus", courseEnum.CourseStatus.DRAFT] }, 1, 0] }
                    },
                    terminated: {
                        $sum: { $cond: [{ $eq: ["$courseStatus", courseEnum.CourseStatus.TERMINATED] }, 1, 0] }
                    }
                }
            }
        ]),
        enrollmentSchema.countDocuments({})
    ]);

    return {
        courseOverview: {
            totalCourses: results[0][0]?.total || 0,
            activeCourses: results[0][0]?.active || 0,
            draftCourses: results[0][0]?.draft || 0,
            terminatedCourses: results[0][0]?.archived || 0
        },
        enrollmentMetrics: {
            totalEnrollments: results[1] || 0
        }
    };
};

export const getEnquiryAnalytics = async () => {
    const now = new Date();

    const periods = {
        today: new Date(now.setHours(0, 0, 0, 0)),
        week: new Date(now.setDate(now.getDate() - 7)),
        month: new Date(now.setMonth(now.getMonth() - 1)),
        sixMonths: new Date(now.setMonth(now.getMonth() - 6)),
        year: new Date(now.setFullYear(now.getFullYear() - 1))
    };

    const results = await CourseEnquirySchema.aggregate([
        {
            $facet: {
                total: [{ $count: "count" }],
                today: [
                    { $match: { createdAt: { $gte: periods.today } } },
                    { $count: "count" }
                ],
                thisWeek: [
                    { $match: { createdAt: { $gte: periods.week } } },
                    { $count: "count" }
                ],
                thisMonth: [
                    { $match: { createdAt: { $gte: periods.month } } },
                    { $count: "count" }
                ],
                lastSixMonths: [
                    { $match: { createdAt: { $gte: periods.sixMonths } } },
                    { $count: "count" }
                ],
                thisYear: [
                    { $match: { createdAt: { $gte: periods.year } } },
                    { $count: "count" }
                ],
                byStatus: [
                    { $group: { _id: "$status", count: { $sum: 1 } } }
                ]
            }
        }
    ]);

    const getCount = (field: string) => results[0][field][0]?.count || 0;



    return {
        totalEnquiries: getCount("total"),
        today: getCount("today"),
        thisWeek: getCount("thisWeek"),
        thisMonth: getCount("thisMonth"),
        lastSixMonths: getCount("lastSixMonths"),
        thisYear: getCount("thisYear"),
        byStatus: (results[0].byStatus as CourseDTO.EnquiryStatusCount[]).reduce((acc: Record<string, number>, curr: CourseDTO.EnquiryStatusCount) => {
            acc[curr._id] = curr.count;
            return acc;
        }, {})
    } as CourseDTO.EnquiryAnalyticsResult;
};