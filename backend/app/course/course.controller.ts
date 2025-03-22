import asyncHandler from 'express-async-handler';
import { type Request, type Response } from 'express';
import { UploadedFile } from "express-fileupload";
import createHttpError from 'http-errors';
import { createResponse } from '../common/helper/response.hepler';
import * as AWSservice from '../common/services/AWS.service';
import * as courseService from './course.service';
import * as UserService from '../user/user.service';
import * as CourseCategoryService from "../category/category.service";
import { sendEmail } from '../common/services/email.service';
import { courseEnquiryEmailTemplate } from '../common/template/courseEnquiry.template';


export const uploadPublicFile = asyncHandler(async(req: Request, res: Response) => {
    const allowedFields = ["thumbnail", "brouchure", "trailerVideo", "video"];

    // Ensure req.files is not null or undefined
    if (!req.files) {
        throw createHttpError(400, "No files were uploaded.");
    }

    // Find which file is being uploaded
    let fileKey = allowedFields.find(field => req.files?.[field]);

    if (!fileKey) {
        throw createHttpError(400, "Please select a valid file to upload");
    }

    const file = req.files[fileKey] as UploadedFile;

    const uploadPath = `public/course/${fileKey}`;

    const result = await AWSservice.putObject(file, uploadPath);

    res.send(createResponse(result, `${fileKey} uploaded successfully to AWS`));
});

// new course creation function 
export const createCourse = asyncHandler(async(req: Request, res: Response) => {
    if (!req.user) {
        throw createHttpError(401, "User not authenticated");
    }
    const userId = req.user._id;
    const courseId = req.params.courseId;
    const data = req.body;
    let previousCategoryId: string | null = null;

    if(courseId) {
        const course = await courseService.getCourseById(courseId);
        if(!course) {
            throw createHttpError(404, "Course id invalid, course not found")
        }
        previousCategoryId = course.category?.toString() || null;
    }

    const { category, instructor } = data;

    const isInstrucotrExist = await UserService.getInstructorById(instructor?.toString());
    if(!isInstrucotrExist) {
        throw createHttpError(404, "Instructor id is invalid, Not found");
    }
    const isCategoryExist = await CourseCategoryService.getCourseCategoryById(category?.toString());
    if(!isCategoryExist) {
        throw createHttpError(404, "Category id is invalid, Not found");
    }

    const result = await courseService.addCourseDetails(courseId, data);

    if (!result) {
        throw createHttpError(500, "Error in creating/updating course");
    }

    if (previousCategoryId && previousCategoryId !== category?.toString()) {
        await CourseCategoryService.removeCourseId(result._id?.toString(), previousCategoryId);
    }
}); 


export const addCourseDetails = asyncHandler(async(req: Request, res: Response) => {
    if (!req.user) {
        throw createHttpError(401, "User not authenticated");
    }
    const userId = req.user._id;
    const courseId = req.params.courseId;
    const data = req.body;
    let previousCategoryId: string | null = null;

    if(courseId) {
        const course = await courseService.getCourseById(courseId);
        if(!course) {
            throw createHttpError(404, "Course id invalid, course not found")
        }
        const isCourseOwner = await courseService.isCourseOwner(userId, courseId);
        if(!isCourseOwner) {
            throw createHttpError(401, "You are not authorized to update this course");
        }
        previousCategoryId = course.category?.toString() || null;
    }

    const { category, instructor } = data;

    const isInstrucotrExist = await UserService.getInstructorById(instructor?.toString());
    if(!isInstrucotrExist) {
        throw createHttpError(404, "Instructor id is invalid, Not found");
    }
    const isCategoryExist = await CourseCategoryService.getCourseCategoryById(category?.toString());
    if(!isCategoryExist) {
        throw createHttpError(404, "Category id is invalid, Not found");
    }

    const result = await courseService.addCourseDetails(courseId, data);

    if (!result) {
        throw createHttpError(500, "Error in creating/updating course");
    }

    if (previousCategoryId && previousCategoryId !== category?.toString()) {
        await CourseCategoryService.removeCourseId(result._id?.toString(), previousCategoryId);
    }

    await CourseCategoryService.addCourseId(result?._id?.toString(), category?.toString());

    if(!courseId) {
        await courseService.draftCourse(userId, result._id?.toString());
    }
    res.send(createResponse(result, "CourseDetails Added/Updated successfully"));
});

// Todo : complete this function -- this for course details step 1
export const getCourseDetails = asyncHandler(async(req: Request, res: Response) => {
    if (!req.user) {
        throw createHttpError(401, "User not authenticated");
    }
    const userId = req.user._id;
    const courseId = req.params.courseId;

    const isCourseOwner = await courseService.isCourseOwner(userId, courseId);
    if(!isCourseOwner) {
        throw createHttpError(401, "You are not authorized to view this course");
    }

    
});

export const addAdditionalDetails = asyncHandler(async(req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const data = req.body;

    if(courseId) {
        const course = await courseService.getCourseById(courseId);
        if(!course) {
            throw createHttpError(404, "Course id invalid, course not found")
        }
    }

    const result = await courseService.addAdditionalDetails(courseId, data);
    res.send(createResponse(result, "Additional details added successfully"));
});

export const addCourseStructure = asyncHandler(async(req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const { sections } = req.body;

    if(courseId) {
        const course = await courseService.getCourseById(courseId);
        if(!course) {
            throw createHttpError(404, "Course id invalid, course not found")
        }
    }

    const result = await courseService.addCourseStructure(courseId, sections);
    res.send(createResponse({ course: result }, "Course structure added successfully"));
    
});

export const getCoursePreview = asyncHandler(async(req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const course = await courseService.getCoursePreview(courseId);
    if(!course) {
        throw createHttpError(404, "Course id invalid, course not found")
    }
    res.send(createResponse({course}, "Course fetched successfully"));
});

export const publishCourse = asyncHandler(async(req: Request, res: Response) => {
    if (!req.user) {
        throw createHttpError(401, "User not authenticated");
    }
    const userId = req.user._id;
    const courseId = req.params.courseId;
    const isCourseExist = await courseService.getCourseById(courseId);
    if(!isCourseExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    await courseService.publishCourse(userId, courseId);
    res.send(createResponse({}, "Course published successfully"));
});

export const draftCourse = asyncHandler(async(req: Request, res: Response) => {
    if (!req.user) {
        throw createHttpError(401, "User not authenticated");
    }
    const userId = req.user._id;
    const courseId = req.params.courseId;
    const isCourseExist = await courseService.getCourseById(courseId);
    if(!isCourseExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    await courseService.draftCourse(userId, courseId);
    res.send(createResponse({}, "Course drafted successfully"));
});

export const terminateCourse = asyncHandler(async(req: Request, res: Response) => {
    if (!req.user) {
        throw createHttpError(401, "User not authenticated");
    }
    const userId = req.user._id;
    const courseId = req.params.courseId;
    const isCourseExist = await courseService.getCourseById(courseId);
    if(!isCourseExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    await courseService.terminateCourse(userId, courseId);
    res.send(createResponse({}, "Course terminated successfully"));
});

export const unpublishCourse = asyncHandler(async(req: Request, res: Response) => {
    if (!req.user) {
        throw createHttpError(401, "User not authenticated");
    }
    const userId = req.user._id;
    const courseId = req.params.courseId;
    const isCourseExist = await courseService.getCourseById(courseId);
    if(!isCourseExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    await courseService.unpublishCourse(userId, courseId);
    res.send(createResponse({}, "Course unpublished successfully"));
});

export const getPublishedCourseByCategory = asyncHandler(async(req: Request, res: Response) => {
    const categoryId = req.params.categoryId;
    const pageNo = parseInt(req.query.pageNo as string) || 1;
    const category = await CourseCategoryService.getCourseCategoryById(categoryId);
    if(!category) {
        throw createHttpError(404, "Category id invalid, category not found")
    }

    const courses = await courseService.getPublishedCoursesByCategory(categoryId, pageNo);
    res.send(createResponse(courses, "Published courses by category fetched successfully"));
});

export const getFullCourseDetails = asyncHandler(async(req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const course = await courseService.getFullCourseDetails(courseId);
    if(!course) {
        throw createHttpError(404, "Course id invalid, course not found")
    }
    res.send(createResponse(course, "Full course details fetched successfully"));
});

export const getIntructorList = asyncHandler(async(req: Request, res: Response) => {
    const instructor = await UserService.getInstructorList();
    res.send(createResponse(instructor, "Instructor List fetched"));
});

export const courseEnquiry = asyncHandler(async(req: Request, res: Response) => {
    const data = req.body;
    const result = await courseService.courseEnquiry(data);

    const emailContent = courseEnquiryEmailTemplate(result.ticketNo, data.name, data.email, data.phone, data.education, data.intrestedCourse);
    await sendEmail({ 
        from: process.env.MAIL_USER,
        to: data.email,
        subject: `Course Enquiry Ticket No: ${result.ticketNo}`,
        html: emailContent,
    });

    res.send(createResponse({}, "Course enquiry submitted successfully"));
});

export const getCourseEnquiry = asyncHandler(async(req: Request, res: Response) => {
    const pageNo = parseInt(req.query.pageNo as string) || 1;
    const result = await courseService.getCourseEnquiry(pageNo);
    res.send(createResponse(result, "Course enquiry fetched successfully"));
});

export const changeEnquiryStatus = asyncHandler(async(req: Request, res: Response) => {
    const enquiryId = req.params.enquiryId;
    const status = req.body.status;
    const result = await courseService.changeEnquiryStatus(enquiryId, status);
    res.send(createResponse({}, "Enquiry status changed successfully"));
});

export const getPublishedCourses = asyncHandler(async(req: Request, res: Response) => {
    const pageNo = parseInt(req.query.pageNo as string) || 1;
    const result = await courseService.getPublishedCourses(pageNo);
    res.send(createResponse(result, "Published courses fetched successfully"));
});