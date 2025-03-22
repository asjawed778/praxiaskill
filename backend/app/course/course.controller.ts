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


export const createCourse = asyncHandler(async(req: Request, res: Response) => {

    const data = req.body;
    const { category, instructor } = data;

    const isInstrucotrExist = await UserService.getInstructorById(instructor?.toString());
    if(!isInstrucotrExist) {
        throw createHttpError(404, "Instructor id is invalid, Not found");
    }
    const isCategoryExist = await CourseCategoryService.getCourseCategoryById(category?.toString());
    if(!isCategoryExist) {
        throw createHttpError(404, "Category id is invalid, Not found");
    }

    const result = await courseService.createCourse(data);

    if (!result) {
        throw createHttpError(500, "Error in creating course");
    }

    res.send(createResponse(result, "Course created successfully"));
}); 

export const getCourseContent = asyncHandler(async(req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const isCourseExist = await courseService.isCourseExist(courseId);
    if(!isCourseExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    const courseContent = await courseService.getCourseContent(courseId);
    res.send(createResponse(courseContent, "Course content fetched successfully")); 
});



// export const getCoursePreview = asyncHandler(async(req: Request, res: Response) => {
//     const courseId = req.params.courseId;
//     const course = await courseService.getCoursePreview(courseId);
//     if(!course) {
//         throw createHttpError(404, "Course id invalid, course not found")
//     }
//     res.send(createResponse({course}, "Course fetched successfully"));
// });

export const publishCourse = asyncHandler(async(req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const isCourseExist = await courseService.isCourseExist(courseId);
    if(!isCourseExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    await courseService.publishCourse(courseId);
    res.send(createResponse({}, "Course published successfully"));
});

export const draftCourse = asyncHandler(async(req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const isCourseExist = await courseService.isCourseExist(courseId);
    if(!isCourseExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    await courseService.draftCourse(courseId);
    res.send(createResponse({}, "Course drafted successfully"));
});

export const terminateCourse = asyncHandler(async(req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const isCourseExist = await courseService.isCourseExist(courseId);
    if(!isCourseExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    await courseService.terminateCourse(courseId);
    res.send(createResponse({}, "Course terminated successfully"));
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

    const emailContent = courseEnquiryEmailTemplate(result.ticketNo, data.name, data.email, data.phone, data.education, data.interestedCourse);
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