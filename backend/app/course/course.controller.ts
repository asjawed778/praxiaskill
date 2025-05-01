import asyncHandler from 'express-async-handler';
import { type Request, type Response } from 'express';
import { UploadedFile } from "express-fileupload";
import createHttpError from 'http-errors';
import { createResponse } from '../common/helper/response.hepler';
import * as AWSservice from '../common/services/AWS.service';
import * as courseService from './course.service';
import * as UserService from '../user/user.service';
import * as CourseDTO from './course.dto';
import * as CourseCategoryService from "../category/category.service";
import { courseEnquiryEmailTemplate } from '../common/template/courseEnquiry.template';
import { emailQueue } from '../common/queue/queues/email.queue';

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

export const getCourseVideoAccessUrl = asyncHandler(async (req: Request, res: Response) => {
    const { courseId, sectionId, subSectionId} = req.params;
    if (!req.user) {
        throw createHttpError(401, "Unauthorized user, login again");
    }
    const userId = req.user._id;
    const role = req.user.role;
    await courseService.isValidSectionSubsectionId(courseId, sectionId, subSectionId);
    if(role !== 'SUPER_ADMIN') {
        const isUserCourseActive = await courseService.isUserCourseActive(courseId, userId);
        if(!isUserCourseActive) {
            res.send(createResponse({}, "This course may have expired, been canceled, or is no longer available"));
            return;
        }
    }

    const fileKeyData = await courseService.getSubSectionFileKey(subSectionId);
    
    if (!fileKeyData) {
        throw createHttpError(404, "Content not available, will be uploaded soon");
    }
    const { link, duration } = fileKeyData;
    if(!link) {
        res.send(createResponse({}, "Content not available, will be uploaded soon"));
        return;
    }
    const url = await AWSservice.getPresignedUrl(link);

    res.send(createResponse({url, duration}, "Presigned url generated"));
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

export const updateCourseDetails = asyncHandler(async(req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const isCourseExist = await courseService.isCourseExist(courseId);
    if (!isCourseExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    const data: CourseDTO.IUpdateCourseDetails = req.body;
    const { category, instructor } = data;
    const isInstrucotrExist = await UserService.getInstructorById(instructor?.toString());
    if(!isInstrucotrExist) {
        throw createHttpError(404, "Instructor id is invalid, Not found");
    }
    const isCategoryExist = await CourseCategoryService.getCourseCategoryById(category?.toString());
    if(!isCategoryExist) {
        throw createHttpError(404, "Category id is invalid, Not found");
    } 

    const result = await courseService.updateCourseDetails(courseId, data);
    if(!result) {
        throw createHttpError(500, "Error in updating course details");
    }
    await CourseCategoryService.moveCourseToCategory(courseId, category.toString());
    res.send(createResponse(result, "Course details updated successfully"));
});

// export const 

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
    if (!req.user) {
        throw createHttpError(401, "Unauthorized user, login again");
    }
    const userId = req.user._id;
    const role = req.user.role;
    if(role !== 'SUPER_ADMIN') {
        const isUserCourseActive = await courseService.isUserCourseActive(courseId, userId);
        if(!isUserCourseActive) {
            res.send(createResponse({}, "This course may have expired, been canceled, or is no longer available"));
            return;
        }
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

    await emailQueue.add('sendEmail', {
        from: process.env.MAIL_USER,
        to: data.email,
        subject: `Course Enquiry Ticket No: ${result.ticketNo}`,
        html: emailContent,
    });
    await emailQueue.add('sendEmail', {
        from: process.env.MAIL_USER,
        to: process.env.MAIL_USER,
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

export const getMyCourses = asyncHandler(async(req:Request, res:Response) => {
    if(!req.user) {
        throw createHttpError(401, "Unauthorized user, login again");
    }
    const userId = req.user._id;
    const pageNo = req.query.pageNo ? parseInt(req.query.pageNo as string, 10) : undefined;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : undefined;
    const result = await courseService.getMyCourses(userId, pageNo, pageSize);

    res.send(createResponse(result, "My Course fetched successfull"));
});

export const createQna = asyncHandler(async(req:Request, res:Response) => {
    if(!req.user) {
        throw createHttpError(401, "Unauthorized user, login again");
    }
    const userId = req.user._id;
    const courseId = req.query.courseId as string | undefined;
    const sectionId = req.query.sectionId as string | undefined;
    const subSectionId = req.query.subSectionId as string | undefined;

    if (!courseId) {
        throw createHttpError(400, "Course ID is required");
    }
    const data = req.body;

    if(sectionId) {
        await courseService.isValidSectionSubsectionId(courseId, sectionId, subSectionId);
    }
    const isCourseExist = await courseService.isCourseExist(courseId);
    if(!isCourseExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    const isPurchased = await courseService.isUserCoursePurchased(courseId, userId);
    const isInstructor = await courseService.isInstructor(courseId, userId);
    if(!isPurchased && !isInstructor) {
        throw createHttpError(401, "Unauthorized user, course not purchased or instructor");
    }
    console.log("courseId", courseId, "sectionId", sectionId, "subSectionId", subSectionId);

    const result = await courseService.createQna(userId, courseId, sectionId, subSectionId, data);
    res.send(createResponse(result, "QnA created successfully"));
});

export const addReplyToQna = asyncHandler(async(req: Request, res: Response) => {
    if (!req.user) {
        throw createHttpError(401, "Unauthorized user, login again");
    }
    
    const userId = req.user._id;
    const qnaId = req.params.qnaId;
    const { answer } = req.body;

    const qna = await courseService.getQnaById(qnaId);
    if (!qna) {
        throw createHttpError(404, "QnA not found");
    }

    const isPurchased = await courseService.isUserCoursePurchased(userId, qna.courseId.toString());
    const isInstructor = await courseService.isInstructor(qna.courseId.toString(), userId);

    if (!isPurchased && !isInstructor) {
        throw createHttpError(401, "Unauthorized user, course not purchased or not instructor");
    }

    const result = await courseService.addReplyToQna(qnaId, userId, answer);
    res.send(createResponse(result, "Reply added successfully"));
});

export const editQnaQuestion = asyncHandler(async(req: Request, res: Response) => {
    if (!req.user) {
        throw createHttpError(401, "Unauthorized user, login again");
    }
    
    const userId = req.user._id;
    const qnaId = req.params.qnaId;
    const { title, description } = req.body;

    if (!title) {
        throw createHttpError(400, "Title is required");
    }

    // Check if QnA exists and user is the owner
    const qna = await courseService.getQnaById(qnaId);
    if (!qna) {
        throw createHttpError(404, "QnA not found");
    }

    // Verify the user is the one who asked the question
    if (qna.userId.toString() !== userId.toString()) {
        throw createHttpError(403, "Only the question owner can edit this question");
    }

    const result = await courseService.editQnaQuestion(qnaId, { title, description });
    res.send(createResponse(result, "QnA question updated successfully"));
});

export const editQnaAnswer = asyncHandler(async(req: Request, res: Response) => {
    if (!req.user) {
        throw createHttpError(401, "Unauthorized user, login again");
    }
    
    const userId = req.user._id;
    const qnaId = req.params.qnaId;
    const answerIndex = parseInt(req.params.answerIndex);
    const { answer } = req.body;

    if (isNaN(answerIndex)) {
        throw createHttpError(400, "Invalid answer index");
    }

    if (!answer) {
        throw createHttpError(400, "Answer content is required");
    }

    // Get the QnA document
    const qna = await courseService.getQnaById(qnaId);
    if (!qna) {
        throw createHttpError(404, "QnA not found");
    }

    // Check if answer exists at the given index
    if (!qna.answers || answerIndex < 0 || answerIndex >= qna.answers.length) {
        throw createHttpError(404, "Answer not found at the specified index");
    }

    // Check if user is the owner of the answer
    if (qna.answers[answerIndex].userId.toString() !== userId.toString()) {
        throw createHttpError(403, "Only the answer owner can edit this answer");
    }

    const result = await courseService.editQnaAnswer(qnaId, answerIndex, answer);
    res.send(createResponse(result, "Answer updated successfully"));
});

export const deleteQnaQuestion = asyncHandler(async(req: Request, res: Response) => {
    if (!req.user) {
        throw createHttpError(401, "Unauthorized user, login again");
    }
    
    const userId = req.user._id;
    const qnaId = req.params.qnaId;

    // Check if QnA exists
    const qna = await courseService.getQnaById(qnaId);
    if (!qna) {
        throw createHttpError(404, "QnA not found");
    }

    // Verify the user is either the question owner or course instructor
    const isOwner = qna.userId.toString() === userId.toString();
    const isInstructor = await courseService.isInstructor(qna.courseId.toString(), userId);

    if (!isOwner && !isInstructor) {
        throw createHttpError(403, "Only question owner or course instructor can delete this question");
    }

    const result = await courseService.deleteQnaQuestion(qnaId);
    res.send(createResponse(result, "QnA question deleted successfully"));
});

export const deleteQnaAnswer = asyncHandler(async(req: Request, res: Response) => {
    if (!req.user) {
        throw createHttpError(401, "Unauthorized user, login again");
    }
    
    const userId = req.user._id;
    const qnaId = req.params.qnaId;
    const answerIndex = parseInt(req.params.answerIndex);

    if (isNaN(answerIndex)) {
        throw createHttpError(400, "Invalid answer index");
    }

    // Get the QnA document
    const qna = await courseService.getQnaById(qnaId);
    if (!qna) {
        throw createHttpError(404, "QnA not found");
    }

    // Check if answer exists at the given index
    if (!qna.answers || answerIndex < 0 || answerIndex >= qna.answers.length) {
        throw createHttpError(404, "Answer not found at the specified index");
    }

    // Check authorization: answer owner, question owner, or instructor
    const isAnswerOwner = qna.answers[answerIndex].userId.toString() === userId.toString();
    const isQuestionOwner = qna.userId.toString() === userId.toString();
    const isInstructor = await courseService.isInstructor(qna.courseId.toString(), userId);

    if (!isAnswerOwner && !isQuestionOwner && !isInstructor) {
        throw createHttpError(403, "Only answer owner, question owner, or instructor can delete this answer");
    }

    const result = await courseService.deleteQnaAnswer(qnaId, answerIndex);
    res.send(createResponse(result, "Answer deleted successfully"));
});

export const getQnas = asyncHandler(async (req: Request, res: Response) => {
    console.log("getQnas called");
    const {
        courseId, 
        sectionId, 
        subSectionId, 
        search, 
        sort, 
        upvote,
        page = 1,
        limit = 10
    } = req.query;
    console.log("courseId", courseId, "sectionId", sectionId, "subSectionId", subSectionId, "search", search, "sort", sort, "upvote", upvote, "page", page, "limit", limit);

    if (!courseId) {
        throw createHttpError(400, "Course ID is required");
    }

    const result = await courseService.getQnas({
        courseId: courseId as string,
        sectionId: sectionId as string | undefined,
        subSectionId: subSectionId as string | undefined,
        search: search as string | undefined,
        sort: sort as 'latest' | 'oldest' | undefined,
        upvote: upvote === 'true',
        page: Number(page),
        limit: Number(limit)
    });

    res.send(createResponse("result", "QnAs fetched successfully"));
});

