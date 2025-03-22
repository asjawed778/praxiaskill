import mongoose from "mongoose";
import { ICourse, ICourseEnquiry, ISection, ISubSection } from "./course.dto";
import courseSchema from "./course.schema";
import sectionSchema from "./section.schema";
import subSectionSchema from "./subSection.schema";
import CourseEnquirySchema from "./course.enquiry";
import * as courseEnum from "./course.enum";

export const createCourse = async (data: Omit<ICourse, "sections"> & { sections: (ISection & { subSections: ISubSection[] })[] }) => {

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
    return course as ICourse;
};

export const getCourseContent = async (courseId: string) => {
    // console.log(courseId);
    const coursesContent = await courseSchema.findById(courseId)
    .select("_id title sections")
        .populate({
            path: "sections",
            populate: {
                path: "subSections",
            },
        });
    // const coursesContent = await courseSchema.findById(courseId);
    return coursesContent;
};


export const isCourseExist = async (courseId: string): Promise<boolean> => {
    const courseExists = await courseSchema.exists({ _id: courseId });
    return courseExists !== null;
};




export const draftCourse = async (courseId: string) => {
    const result = await courseSchema.findByIdAndUpdate
        (courseId, { courseStatus: "DRAFT" }, { new: true });
    return result;
};

export const terminateCourse = async (courseId: string) => {
    const result = await courseSchema.findByIdAndUpdate
        (courseId, { courseStatus: "TERMINATED" }, { new: true });
    return result;
};

export const publishCourse = async (courseId: string) => {
    const result = await courseSchema.findByIdAndUpdate
        (courseId, { courseStatus: "PUBLISHED" }, { new: true });
    return result;
};

export const getCoursePreview = async (courseId: string) => {
    const course = await courseSchema
        .findById(courseId)
        .populate({
            path: "sections",
            populate: {
                path: "subSections",
            },
        });

    return course;
};

export const getFullCourseDetails = async (courseId: string) => {
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
            path: "sections",
            populate: {
                path: "subSections",
                select: "_id title",
            },
        });

    return course;

};

// export const getPublishedCoursesByCategory = async (categoryId: string, pageNo = 1) => {
//     const pageSize = 10; // Number of courses per page
//     const skip = (pageNo - 1) * pageSize; // Calculate the number of documents to skip

//     const result = await courseSchema.find({ category: categoryId, courseStatus: "PUBLISHED" })
//         .select("_id title subtitle tags duration thumbnail lanugage courseMode totalLeactures")
//         .populate({
//             path: "instructor",
//             select: "_id name profilePic",
//         })
//         .populate({
//             path: "category",
//             select: "_id name",
//         })

//     return {
//         success: true,
//         totalCourses: result.length,
//         page: pageNo,
//         pageSize,
//         courses: result
//     };
// };

export const getPublishedCoursesByCategory = async (categoryId: string, pageNo = 1) => {
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


export const courseEnquiry = async (data: ICourseEnquiry) => {
    const enquiry = new CourseEnquirySchema(data);
    await enquiry.save();
    return enquiry;
};

export const getCourseEnquiry = async (pageNo = 1) => {
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

export const changeEnquiryStatus = async (enquiryId: string, status: string) => {
    const enquiry = await CourseEnquirySchema.findByIdAndUpdate(enquiryId, { status }, { new: true });
    return enquiry;
};

export const getPublishedCourses = async (pageNo = 1) => {
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





