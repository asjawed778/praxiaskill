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

/**
 * Checks whether a course exists in the database.
 *
 * @param {string} courseId - The unique identifier of the course.
 * @returns {Promise<boolean>} True if the course exists, false otherwise.
 */
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

/**
 * Creates a new course along with its sections and subsections.
 *
 * @param {Omit<CourseDTO.ICourse, "sections"> & { sections: (ISection & { subSections: ISubSection[] })[] }} data 
 *        - The course details including sections and subsections.
 * @returns {Promise<any>} The newly created course with section references.
 */
export const createCourse = async (data: Omit<CourseDTO.ICourse, "sections"> & { sections: (CourseDTO.ISection & { subSections: CourseDTO.ISubSection[] })[] }): Promise<any> => {

    const { sections, ...courseDetails } = data;
    const course = await courseSchema.create(courseDetails);

    // Step 1: Check if sections exist and process them
    if (data.sections && data.sections.length > 0) {
        const sectionPromises = data.sections.map(async (section) => {
            const subsectionDocs = await subSectionSchema.insertMany(section.subSections);
            const subsectionIds = subsectionDocs.map((sub) => sub._id);

            // Step 2: Create section with subsection IDs
            const savedSection = await sectionSchema.create({
                title: section.title,
                description: section.description,
                duration: section.duration,
                subSections: subsectionIds,
            });

            return savedSection._id;
        });

        // Execute all section insertions in parallel
        const sectionIds = await Promise.all(sectionPromises);

        // Step 3: Update Course with new section IDs
        const result = await courseSchema.findByIdAndUpdate(
            course._id,
            { $set: { sections: sectionIds } },
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

/**
 * Retrieves course content including sections and subsections.
 *
 * @param {string} courseId - The unique identifier of the course.
 * @returns {Promise<any>} The course content including sections and subsections.
 */
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


/**
 * Moves a course to draft by updating its status to "DRAFT".
 *
 * @param {string} courseId - The unique identifier of the course.
 * @returns {Promise<any>} The updated course document.
 */
export const draftCourse = async (courseId: string): Promise<any> => {
    const result = await courseSchema.findByIdAndUpdate
        (courseId, { courseStatus: "DRAFT" }, { new: true });
    return result;
};

/**
 * Terminates a course by updating its status to "TERMINATED".
 *
 * @param {string} courseId - The unique identifier of the course.
 * @returns {Promise<any>} The updated course document.
 */
export const terminateCourse = async (courseId: string): Promise<any> => {
    const result = await courseSchema.findByIdAndUpdate
        (courseId, { courseStatus: "TERMINATED" }, { new: true });
    return result;
};

/**
 * Publishes a course by updating its status to "PUBLISHED".
 *
 * @param {string} courseId - The unique identifier of the course.
 * @returns {Promise<any>} The updated course document.
 */
export const publishCourse = async (courseId: string): Promise<any> => {
    const result = await courseSchema.findByIdAndUpdate
        (courseId, { courseStatus: "PUBLISHED" }, { new: true });
    return result;
};

/**
 * Retrieves detailed information about a specific course.
 *
 * @param {string} courseId - The unique identifier of the course.
 * @returns {Promise<any>} The course document populated with instructor, category, ratings, and sections.
 */
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
            select: "_id rating comment userId",
            populate: {
                path: "userId",
                select: "_id name profilePic",
            }
        })
        .populate({
            path: "sections",
            populate: {
                path: "subSections",
                select: "_id title",
            },
        });
    return course;
};

/**
 * Fetches published courses based on a specific category with pagination.
 *
 * @param {string} categoryId - The unique identifier of the category.
 * @param {number} [pageNo=1] - The page number for pagination.
 * @returns {Promise<any>} An object containing success status, total courses, page details, and course data.
 */
export const getPublishedCoursesByCategory = async (categoryId: string, pageNo: number = 1): Promise<any> => {
    const pageSize = 10; // Number of courses per page
    const skip = (pageNo - 1) * pageSize; // Calculate the number of documents to skip

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

/**
 * Creates a new course enquiry and saves it to the database.
 *
 * @param {ICourseEnquiry} data - The enquiry data containing user details and message.
 * @returns {Promise<any>} The newly created enquiry document.
 */
export const courseEnquiry = async (data: CourseDTO.ICourseEnquiry): Promise<any> => {
    const enquiry = new CourseEnquirySchema(data);
    await enquiry.save();
    return enquiry;
};

/**
 * Retrieves course enquiries with pagination.
 *
 * @param {number} [pageNo=1] - The page number for pagination.
 * @returns {Promise<any>} An object containing enquiries, start and end entry indices, current page, and total results.
 */
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

/**
 * Updates the status of a specific course enquiry.
 *
 * @param {string} enquiryId - The unique identifier of the enquiry.
 * @param {string} status - The new status of the enquiry.
 * @returns {Promise<CourseDTO.ICourseEnquiry>} The updated enquiry document.
 */
export const changeEnquiryStatus = async (enquiryId: string, status: string): Promise<CourseDTO.ICourseEnquiry> => {
    const enquiry = await CourseEnquirySchema.findByIdAndUpdate(enquiryId, { status }, { new: true });
    return enquiry as CourseDTO.ICourseEnquiry;
};

/**
 * Retrieves a paginated list of published courses.
 *
 * @param {number} [pageNo=1] - The page number for pagination.
 * @returns {Promise<any>} An object containing success status, total courses, page details, and course data.
 */
export const getPublishedCourses = async (pageNo: number = 1): Promise<any> => {
    const pageSize = 10; // Number of courses per page
    const skip = (pageNo - 1) * pageSize; // Calculate the number of documents to skip

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

/**
 * Submits a rating and review for a specific course.
 *
 * @param {string} courseId - The unique identifier of the course.
 * @param {string} userId - The unique identifier of the user submitting the review.
 * @param {CourseDTO.IRatingAndReviews} data - The rating and review data.
 * @returns {Promise<any>} The newly created rating and review document.
 */
export const rateCourse = async (courseId: string, userId: string, data: CourseDTO.IRatingAndReviews): Promise<any> => {
    const rating = new ratingAndReviewSchema({
        ...data,
        courseId,
        userId,
    });
    await rating.save();
    return rating;
};

/**
 * Checks if a user has purchased a specific course.
 *
 * @param {string} courseId - The unique identifier of the course.
 * @param {string} userId - The unique identifier of the user.
 * @returns {Promise<boolean>} A boolean indicating whether the user has purchased the course.
 */
export const isUserCoursePurchased = async (courseId: string, userId: string): Promise<boolean> => {
    const isPurchased = await enrollmentSchema.exists({ courseId, userId });
    return isPurchased !== null;
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

