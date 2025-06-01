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



export const isCourseExist = async (courseId: string): Promise<boolean> => {
    const courseExists = await courseSchema.exists({ _id: courseId });
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
    const course = await courseSchema.create(courseDetails);
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
    const course = await courseSchema.findByIdAndUpdate(courseId, data, { new: true });
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

export const getCourseDetails = async (courseId: string): Promise<any> => {
    const course = await courseSchema
        .findById(courseId)
        .populate({
            path: "instructor",
            select: "_id name email profilePic",
        })
        .populate({
            path: "category",
            select: "_id name",
        })
        .populate({
            path: "ratingAndReviews",
            select: "_id rating comment userId createdAt",
            options: {
                sort: { rating: -1 },
                limit: 10
            },
            populate: {
                path: "userId",
                select: "_id name profilePic",
            }
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

    return {
        ...course,
        totalProjects,
        totalAssignments,
        topReviews: course.ratingAndReviews
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

export const getPublishedCourses = async (pageNo: number = 1): Promise<any> => {
    const pageSize = 10;
    const skip = (pageNo - 1) * pageSize;

    const result = await courseSchema.aggregate([
        {
            $match: {
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