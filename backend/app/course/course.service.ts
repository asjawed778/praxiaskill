import mongoose from "mongoose";
import { ICourse, ICourseEnquiry, ISection, ISubSection } from "./course.dto";
import courseSchema from "./course.schema";
import courseLifecycleSchema from "./courseLifecycle.schema";
import sectionSchema from "./section.schema";
import subSectionSchema from "./subSection.schema";
import CourseEnquirySchema from "./course.enquiry";



export const isCourseOwner = async (userId: string, courseId: string): Promise<boolean> => {
    
    const courseLifecycle = await courseLifecycleSchema.findOne({
        userId: new mongoose.Types.ObjectId(userId),
        allCourses: new mongoose.Types.ObjectId(courseId),
    });

    return !!courseLifecycle;
};


export const addCourseDetails = async (courseId: string, data: ICourse) => {
    let course;

    if (courseId) {
        course = await courseSchema.findByIdAndUpdate(courseId, { ...data });
    } else {
        course = await courseSchema.create({ ...data });
    }

    return course as ICourse;
};

export const getCourseDetails = async (courseId: string) => {
    const courseDetails = await courseSchema
        .findById(courseId)
        .select("title subtitle category language instructor courseMode thumbnail brouchure")
        .lean();
    return courseDetails;
};

export const addAdditionalDetails = async (courseId: string, data: ICourse) => {
    const course = await courseSchema.findByIdAndUpdate(
        courseId,
        { $set: data },
        { new: true }
    );

    return course as ICourse;
};

export const addCourseStructure = async (courseId: string, data: (ISection & { subSections: ISubSection[] })[]) => {
    // Step 1: Create all subsections in parallel for each section
    const sectionPromises = data.map(async (section) => {
        const subsectionDocs = await subSectionSchema.insertMany(section.subSections);
        const subsectionIds = subsectionDocs.map((sub) => sub._id);

        // Step 2: Create section with subsection IDs
        const savedSection = await sectionSchema.create({
            title: section.title,
            description: section.description,
            subSections: subsectionIds,
        });

        return savedSection._id;
    });

    // Execute all section insertions in parallel
    const sectionIds = await Promise.all(sectionPromises);

    // Step 3: Update Course with new sections
    const updatedCourse = await courseSchema.findByIdAndUpdate(
        courseId,
        { $push: { sections: { $each: sectionIds } } },
        { new: true }
    );

    return updatedCourse;
};

export const getCourseById = async (courseId: string) => {
    const course = await courseSchema.findById(courseId);
    return course as ICourse;
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

export const draftCourse = async (userId: string, courseId: string) => {
    let lifeCycle = await courseLifecycleSchema.findOne({ userId });

    if (!lifeCycle) {
        lifeCycle = new courseLifecycleSchema({ userId, allCourses: [], DRAFT: [], PUBLISHED: [], UNPUBLISHED: [], TERMINATED: [] });
    }

    lifeCycle.PUBLISHED = lifeCycle.PUBLISHED.filter(id => id.toString() !== courseId);
    lifeCycle.UNPUBLISHED = lifeCycle.UNPUBLISHED.filter(id => id.toString() !== courseId);
    lifeCycle.TERMINATED = lifeCycle.TERMINATED.filter(id => id.toString() !== courseId);

    if (!lifeCycle.DRAFT.some(id => id.toString() === courseId)) {
        lifeCycle.DRAFT.push(new mongoose.Types.ObjectId(courseId) as unknown as mongoose.Schema.Types.ObjectId);
    }

    if (!lifeCycle.allCourses.some(id => id.toString() === courseId)) {
        lifeCycle.allCourses.push(new mongoose.Types.ObjectId(courseId) as unknown as mongoose.Schema.Types.ObjectId);
    }

    await lifeCycle.save();
    return lifeCycle;
};

// Todo : edge case verify is that user is owner of the course
export const publishCourse = async (userId: string, courseId: string) => {
    let lifeCycle = await courseLifecycleSchema.findOne({ userId });

    if (!lifeCycle) {
        lifeCycle = new courseLifecycleSchema({ userId, allCourses: [], DRAFT: [], PUBLISHED: [], UNPUBLISHED: [], TERMINATED: [] });
    }

    // Remove the course from all other status fields
    lifeCycle.DRAFT = lifeCycle.DRAFT.filter(id => id.toString() !== courseId);
    lifeCycle.UNPUBLISHED = lifeCycle.UNPUBLISHED.filter(id => id.toString() !== courseId);
    lifeCycle.TERMINATED = lifeCycle.TERMINATED.filter(id => id.toString() !== courseId);

    // Add the course to PUBLISHED if it's not already present
    if (!lifeCycle.PUBLISHED.some(id => id.toString() === courseId)) {
        lifeCycle.PUBLISHED.push(new mongoose.Types.ObjectId(courseId) as unknown as mongoose.Schema.Types.ObjectId);
    }

    if (!lifeCycle.allCourses.some(id => id.toString() === courseId)) {
        lifeCycle.allCourses.push(new mongoose.Types.ObjectId(courseId) as unknown as mongoose.Schema.Types.ObjectId);
    }

    await lifeCycle.save();
    return lifeCycle;
};

export const unpublishCourse = async (userId: string, courseId: string) => {
    let lifeCycle = await courseLifecycleSchema.findOne({ userId });

    if (!lifeCycle) {
        lifeCycle = new courseLifecycleSchema({ userId, allCourses: [], DRAFT: [], PUBLISHED: [], UNPUBLISHED: [], TERMINATED: [] });
    }

    // Remove the course from all other status fields
    lifeCycle.DRAFT = lifeCycle.DRAFT.filter(id => id.toString() !== courseId);
    lifeCycle.PUBLISHED = lifeCycle.PUBLISHED.filter(id => id.toString() !== courseId);
    lifeCycle.TERMINATED = lifeCycle.TERMINATED.filter(id => id.toString() !== courseId);

    // Add the course to UNPUBLISHED if it's not already present
    if (!lifeCycle.UNPUBLISHED.some(id => id.toString() === courseId)) {
        lifeCycle.UNPUBLISHED.push(new mongoose.Types.ObjectId(courseId) as unknown as mongoose.Schema.Types.ObjectId);
    }

    // ✅ Ensure course is in allCourses
    if (!lifeCycle.allCourses.some(id => id.toString() === courseId)) {
        lifeCycle.allCourses.push(new mongoose.Types.ObjectId(courseId) as unknown as mongoose.Schema.Types.ObjectId);
    }

    await lifeCycle.save();
    return lifeCycle;
};

export const terminateCourse = async (userId: string, courseId: string) => {
    let lifeCycle = await courseLifecycleSchema.findOne({ userId });

    if (!lifeCycle) {
        lifeCycle = new courseLifecycleSchema({ userId, allCourses: [], DRAFT: [], PUBLISHED: [], UNPUBLISHED: [], TERMINATED: [] });
    }

    // Remove the course from all other status fields
    lifeCycle.DRAFT = lifeCycle.DRAFT.filter(id => id.toString() !== courseId);
    lifeCycle.PUBLISHED = lifeCycle.PUBLISHED.filter(id => id.toString() !== courseId);
    lifeCycle.UNPUBLISHED = lifeCycle.UNPUBLISHED.filter(id => id.toString() !== courseId);

    // Add the course to TERMINATED if it's not already present
    if (!lifeCycle.TERMINATED.some(id => id.toString() === courseId)) {
        lifeCycle.TERMINATED.push(new mongoose.Types.ObjectId(courseId) as unknown as mongoose.Schema.Types.ObjectId);
    }

    // ✅ Ensure course is in allCourses
    if (!lifeCycle.allCourses.some(id => id.toString() === courseId)) {
        lifeCycle.allCourses.push(new mongoose.Types.ObjectId(courseId) as unknown as mongoose.Schema.Types.ObjectId);
    }

    await lifeCycle.save();
    return lifeCycle;
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

export const getPublishedCoursesByCategory = async (categoryId: string, pageNo = 1) => {
    const pageSize = 10; // Number of courses per page
    const skip = (pageNo - 1) * pageSize; // Calculate the number of documents to skip

    const result = await courseLifecycleSchema.aggregate([
        {
            $match: { PUBLISHED: { $exists: true, $ne: [] } } // Ensure published courses exist
        },
        {
            $unwind: "$PUBLISHED" // Unwind the published courses array
        },
        {
            $lookup: {
                from: "courses",
                localField: "PUBLISHED",
                foreignField: "_id",
                as: "courseDetails"
            }
        },
        {
            $unwind: "$courseDetails" // Flatten course details
        },
        {
            $match: { "courseDetails.category": new mongoose.Types.ObjectId(categoryId) } // Filter by category
        },
        {
            $project: {
                _id: "$courseDetails._id",
                title: "$courseDetails.title",
                subtitle: "$courseDetails.subtitle",
                thumbnail: "$courseDetails.thumbnail",
                language: "$courseDetails.language",
                courseMode: "$courseDetails.courseMode"
            }
        },
        { $skip: skip }, // Skip previous pages
        { $limit: pageSize } // Limit results per page
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






