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

/**
 * Uploads a public file to AWS S3.
 *
 * @param {Request} req - The Express request object, containing the uploaded file.
 * @param {Response} res - The Express response object.
 * @throws {HttpError} If no files are uploaded or an invalid file type is selected.
 * @returns {void} Sends a response with the upload result.
 */
export const uploadPublicFile = asyncHandler(async (req: Request, res: Response) => {
    const allowedFields = ["thumbnail", "brouchure", "trailerVideo", "video"];

    // Ensure req.files is not null or undefined
    if (!req.files) {
        throw createHttpError(400, "No files were selected.");
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

export const startUpload = asyncHandler(async (req: Request, res: Response) => {
    const { fileName, fileType, courseTitle } = req.body;
    const { courseId, sectionId, subSectionId } = req.params;

    await courseService.isValidSectionSubsectionId(courseId, sectionId, subSectionId);

    const courseName = courseTitle.replace(/\s+/g, "_");
    const fileNameNew = fileName.replace(/\s+/g, "_");

    const fileKey = `private/course/${courseName}/${fileNameNew}-${Date.now()}`;

    const uploadId = await AWSservice.startMultipartUpload(fileKey, fileType);
    res.send(createResponse({ uploadId, fileKey }, "Multipart Upload Started"));
});

export const uploadChunk = asyncHandler(async (req: Request, res: Response) => {
    const { uploadId, fileKey } = req.body;
    const chunk = req.files!.chunk as UploadedFile;

    const PartNumber = Number(req.body.partNumber);

    const ETag = await AWSservice.uploadChunk(uploadId, fileKey, PartNumber, chunk);

    res.send(createResponse({ ETag, PartNumber }, "Chunk uploaded successfully"));
});

export const completeUpload = asyncHandler(async (req: Request, res: Response) => {
    const { uploadId, fileKey, parts } = req.body;
    const { courseId, sectionId, subSectionId} = req.params;

    if (!Array.isArray(parts) || parts.length === 0) {
        throw createHttpError(400, "Parts array is required and cannot be empty");
    }

    const completedUpload = await AWSservice.completeMultipartUpload(uploadId, fileKey, parts);
    await courseService.isValidSectionSubsectionId(courseId, sectionId, subSectionId);

    await courseService.addContentLink(subSectionId, fileKey);

    res.send(createResponse(completedUpload, "Upload completed successfully"));
});

// this section will implement wiht some modificaion in enrolment schema
export const getCourseVideoAccessUrl = asyncHandler(async (req: Request, res: Response) => {
    const { courseId, sectionId, subSectionId} = req.params;

    await courseService.isValidSectionSubsectionId(courseId, sectionId, subSectionId);

    // const url = await AWSservice.getPresignedUrl(fileKey);

    // res.send(createResponse(url, "Presigned url generated"));
});


/**
 * Creates a new course.
 *
 * @param {Request} req - The Express request object containing course data.
 * @param {Response} res - The Express response object.
 * @throws {HttpError} If the instructor ID or category ID is invalid or not found.
 * @throws {HttpError} If there is an error in creating the course.
 * @returns {void} Sends a response with the created course details.
 */
export const createCourse = asyncHandler(async (req: Request, res: Response) => {

    const data = req.body;
    const { category, instructor } = data;

    const isInstrucotrExist = await UserService.getInstructorById(instructor?.toString());
    if (!isInstrucotrExist) {
        throw createHttpError(404, "Instructor id is invalid, Not found");
    }
    const isCategoryExist = await CourseCategoryService.getCourseCategoryById(category?.toString());
    if (!isCategoryExist) {
        throw createHttpError(404, "Category id is invalid, Not found");
    }

    const result = await courseService.createCourse(data);

    if (!result) {
        throw createHttpError(500, "Error in creating course");
    }
    await CourseCategoryService.addCourseId(result._id, category);

    res.send(createResponse(result, "Course created successfully"));
});

// export const updateCourse = asyncHandler(async(req: Request, res: Response) => {
//     const courseId = req.params.courseId;
//     const data = req.body;
//     const { category, instructor } = data;
//     const isInstrucotrExist = await UserService.getInstructorById(instructor?.toString());
//     if(!isInstrucotrExist) {
//         throw createHttpError(404, "Instructor id is invalid, Not found");
//     }
//     const isCategoryExist = await CourseCategoryService.getCourseCategoryById(category?.toString());
//     if(!isCategoryExist) {
//         throw createHttpError(404, "Category id is invalid, Not found");
//     }

//     const result = await courseService.updateCourse(courseId, data);

// });

/**
 * Retrieves the content of a specific course.
 *
 * @param {Request} req - The Express request object containing the course ID in params.
 * @param {Response} res - The Express response object.
 * @throws {HttpError} If the course ID is invalid or not found.
 * @returns {void} Sends a response with the course content.
 */
export const getCourseContent = asyncHandler(async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const isCourseExist = await courseService.isCourseExist(courseId);
    if (!isCourseExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    const courseContent = await courseService.getCourseContent(courseId);
    res.send(createResponse(courseContent, "Course content fetched successfully"));
});

/**
 * Publishes a course, making it available for users.
 *
 * @param {Request} req - The Express request object containing the course ID in params.
 * @param {Response} res - The Express response object.
 * @throws {HttpError} If the course ID is invalid or not found.
 * @returns {void} Sends a response confirming the course has been published.
 */
export const publishCourse = asyncHandler(async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const isCourseExist = await courseService.isCourseExist(courseId);
    if (!isCourseExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    await courseService.publishCourse(courseId);
    res.send(createResponse({}, "Course published successfully"));
});

/**
 * Moves a course to draft status, making it unavailable for users.
 *
 * @param {Request} req - The Express request object containing the course ID in params.
 * @param {Response} res - The Express response object.
 * @throws {HttpError} If the course ID is invalid or not found.
 * @returns {void} Sends a response confirming the course has been drafted.
 */
export const draftCourse = asyncHandler(async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const isCourseExist = await courseService.isCourseExist(courseId);
    if (!isCourseExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    await courseService.draftCourse(courseId);
    res.send(createResponse({}, "Course drafted successfully"));
});

/**
 * Terminates a course, making it permanently unavailable for users.
 *
 * @param {Request} req - The Express request object containing the course ID in params.
 * @param {Response} res - The Express response object.
 * @throws {HttpError} If the course ID is invalid or not found.
 * @returns {void} Sends a response confirming the course has been terminated.
 */
export const terminateCourse = asyncHandler(async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const isCourseExist = await courseService.isCourseExist(courseId);
    if (!isCourseExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    await courseService.terminateCourse(courseId);
    res.send(createResponse({}, "Course terminated successfully"));
});

/**
 * Retrieves published courses by category.
 *
 * @param {Request} req - The Express request object containing the category ID in params and optional page number in query.
 * @param {Response} res - The Express response object.
 * @throws {HttpError} If the category ID is invalid or not found.
 * @returns {void} Sends a response with the list of published courses in the specified category.
 */
export const getPublishedCourseByCategory = asyncHandler(async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;
    const pageNo = parseInt(req.query.pageNo as string) || 1;
    const category = await CourseCategoryService.getCourseCategoryById(categoryId);
    if (!category) {
        throw createHttpError(404, "Category id invalid, category not found")
    }

    const courses = await courseService.getPublishedCoursesByCategory(categoryId, pageNo);
    res.send(createResponse(courses, "Published courses by category fetched successfully"));
});

/**
 * Retrieves the full details of a specific course.
 *
 * @param {Request} req - The Express request object containing the course ID in params.
 * @param {Response} res - The Express response object.
 * @throws {HttpError} If the course ID is invalid or not found.
 * @returns {void} Sends a response with the complete course details.
 */
export const getCourseDetails = asyncHandler(async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const isCourseExist = await courseService.isCourseExist(courseId);
    if (!isCourseExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    const course = await courseService.getCourseDetails(courseId);
    if (!course) {
        throw createHttpError(404, "Course id invalid, course not found")
    }
    res.send(createResponse(course, "Full course details fetched successfully"));
});

/**
 * Retrieves the list of all instructors.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {void} Sends a response with the list of instructors.
 */
export const getIntructorList = asyncHandler(async (req: Request, res: Response) => {
    const instructor = await UserService.getInstructorList();
    res.send(createResponse(instructor, "Instructor List fetched"));
});

/**
 * Submits a course enquiry and sends a confirmation email.
 *
 * @param {Request} req - The Express request object containing enquiry details in the request body.
 * @param {Response} res - The Express response object.
 * @returns {void} Sends a response confirming the course enquiry submission.
 */
export const courseEnquiry = asyncHandler(async (req: Request, res: Response) => {
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

/**
 * Retrieves a paginated list of course enquiries.
 *
 * @param {Request} req - The Express request object containing the page number in query parameters.
 * @param {Response} res - The Express response object.
 * @returns {void} Sends a response with the list of course enquiries.
 */
export const getCourseEnquiry = asyncHandler(async (req: Request, res: Response) => {
    const pageNo = parseInt(req.query.pageNo as string) || 1;
    const result = await courseService.getCourseEnquiry(pageNo);
    res.send(createResponse(result, "Course enquiry fetched successfully"));
});

/**
 * Changes the status of a course enquiry.
 *
 * @param {Request} req - The Express request object containing the enquiry ID in params and the new status in the request body.
 * @param {Response} res - The Express response object.
 * @returns {void} Sends a response confirming the enquiry status change.
 */
export const changeEnquiryStatus = asyncHandler(async (req: Request, res: Response) => {
    const enquiryId = req.params.enquiryId;
    const status = req.body.status;
    const result = await courseService.changeEnquiryStatus(enquiryId, status);
    res.send(createResponse({}, "Enquiry status changed successfully"));
});

/**
 * Retrieves a paginated list of published courses.
 *
 * @param {Request} req - The Express request object containing the page number in query parameters.
 * @param {Response} res - The Express response object.
 * @returns {void} Sends a response with the list of published courses.
 */
export const getPublishedCourses = asyncHandler(async (req: Request, res: Response) => {
    const pageNo = parseInt(req.query.pageNo as string) || 1;
    const result = await courseService.getPublishedCourses(pageNo);
    res.send(createResponse(result, "Published courses fetched successfully"));
});

/**
 * Allows a user to rate a course if they have purchased it.
 *
 * @param {Request} req - The Express request object containing the course ID in params and rating details in the request body.
 * @param {Response} res - The Express response object.
 * @throws {HttpError} If the user is not authenticated, the course ID is invalid, or the user has not purchased the course.
 * @returns {void} Sends a response confirming the course rating submission.
 */
export const rateCourse = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        throw createHttpError(401, "Unauthorized user, login again");
    }
    const userId = req.user._id;
    const courseId = req.params.courseId;
    const isCategoryExist = await courseService.isCourseExist(courseId);
    if (!isCategoryExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    const isPurchased = await courseService.isUserCoursePurchased(userId, courseId);
    if (!isPurchased) {
        throw createHttpError(401, "Unauthorized user, course not purchased");
    }

    const data = req.body;
    const result = await courseService.rateCourse(userId, courseId, data);
    res.send(createResponse(result, "Course rated successfully"));
});

export const deleteSection = asyncHandler(async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const sectionId = req.params.sectionId;
    const isCourseExist = await courseService.isCourseExist(courseId);
    if (!isCourseExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    const result = await courseService.deleteSection(courseId, sectionId);
    res.send(createResponse(result, "Section deleted successfully"));
});

export const deleteSubSection = asyncHandler(async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const sectionId = req.params.sectionId;
    const subSectionId = req.params.subSectionId;
    const isCourseExist = await courseService.isCourseExist(courseId);
    if (!isCourseExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    const result = await courseService.deleteSubSection(courseId, sectionId, subSectionId);
    res.send(createResponse(result, "Subsection deleted successfully"));
});

