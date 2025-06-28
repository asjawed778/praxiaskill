import asyncHandler from 'express-async-handler';
import { type Request, type Response } from 'express';
import { UploadedFile } from "express-fileupload";
import createHttpError from 'http-errors';
import { createResponse } from '../common/helper/response.hepler';
import * as AWSservice from '../common/services/AWS.service';
import * as courseService from './course.service';
import * as UserService from '../user/user.service';
import * as CourseDTO from './course.dto';
import * as CourseEnum from './course.enum';
import * as CourseCategoryService from "../category/category.service";
import { courseEnquiryEmailTemplate } from '../common/template/courseEnquiry.template';
import { emailQueue } from '../common/queue/queues/email.queue';
import { UserRole } from '../user/user.schema';
import mongoose from 'mongoose';

// This controller handles the upload of public files related to courses, such as thumbnails, brochures, trailers, and videos.
export const uploadPublicFile = asyncHandler(async (req: Request, res: Response) => {

    if (!req.files || !req.files.file) {
        throw createHttpError(400, "No file were selected.");
    }
    const file = req.files.file as UploadedFile;
    const uploadPath = `public/course/assets/${file.name}`;
    const result = await AWSservice.putObject(file, uploadPath);
    res.send(createResponse(result, `File uploaded successfully to AWS`));
});

// course content upload controllers
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
    const { courseId, sectionId, subSectionId } = req.params;

    if (!Array.isArray(parts) || parts.length === 0) {
        throw createHttpError(400, "Parts array is required and cannot be empty");
    }

    const completedUpload = await AWSservice.completeMultipartUpload(uploadId, fileKey, parts);
    await courseService.isValidSectionSubsectionId(courseId, sectionId, subSectionId);

    await courseService.addContentLink(subSectionId, fileKey);

    res.send(createResponse(completedUpload, "Upload completed successfully"));
});

export const getCourseVideoAccessUrl = asyncHandler(async (req: Request, res: Response) => {
    const { courseId, sectionId, subSectionId } = req.params;
    if (!req.user) {
        throw createHttpError(401, "Unauthorized user, login again");
    }
    const userId = req.user._id;
    const role = req.user.role;
    await courseService.isValidSectionSubsectionId(courseId, sectionId, subSectionId);
    if (role !== 'SUPER_ADMIN') {
        const isUserCourseActive = await courseService.isUserCourseActive(courseId, userId);
        if (!isUserCourseActive) {
            res.send(createResponse({}, "This course may have expired, been canceled, or is no longer available"));
            return;
        }
    }

    const fileKeyData = await courseService.getSubSectionFileKey(subSectionId);

    if (!fileKeyData) {
        throw createHttpError(404, "Content not available, will be uploaded soon");
    }
    const { link, duration } = fileKeyData;
    if (!link) {
        res.send(createResponse({}, "Content not available, will be uploaded soon"));
        return;
    }
    const url = await AWSservice.getPresignedUrl(link);

    res.send(createResponse({ url, duration }, "Presigned url generated"));
});

export const createCourse = asyncHandler(async (req: Request, res: Response) => {

    const data = req.body;
    const { category, instructor } = data;
    if (instructor) {
        const isInstrucotrExist = await UserService.getInstructorById(instructor?.toString());
        if (!isInstrucotrExist) {
            throw createHttpError(404, "Instructor id is invalid, Not found");
        }
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

export const updateCourseDetails = asyncHandler(async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const isCourseExist = await courseService.isCourseExist(courseId);
    if (!isCourseExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    const data: CourseDTO.IUpdateCourseDetails = req.body;
    const { category, instructor } = data;
    if (instructor) {
        const isInstrucotrExist = await UserService.getInstructorById(instructor?.toString());
        if (!isInstrucotrExist) {
            throw createHttpError(404, "Instructor id is invalid, Not found");
        }
    }
    const isCategoryExist = await CourseCategoryService.getCourseCategoryById(category?.toString());
    if (!isCategoryExist) {
        throw createHttpError(404, "Category id is invalid, Not found");
    }

    const result = await courseService.updateCourseDetails(courseId, data);
    if (!result) {
        throw createHttpError(500, "Error in updating course details");
    }
    await CourseCategoryService.moveCourseToCategory(courseId, category.toString());
    res.send(createResponse(result, "Course details updated successfully"));
});


export const updateCourseCurriculum = asyncHandler(async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const isCourseExist = await courseService.isCourseExist(courseId);
    if (!isCourseExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    const data: CourseDTO.IUpdateCourseCurriculum = req.body;
    const result = await courseService.updateCourseCurriculum(courseId, data);
    res.send(createResponse(result, "Course Curriculum Updated Successfully"));  
});

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
    if (role !== 'SUPER_ADMIN') {
        const isUserCourseActive = await courseService.isUserCourseActive(courseId, userId);
        if (!isUserCourseActive) {
            res.send(createResponse({}, "This course may have expired, been canceled, or is no longer available"));
            return;
        }
    }
    const courseContent = await courseService.getCourseContent(courseId);
    res.send(createResponse(courseContent, "Course content fetched successfully"));
});

export const updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const isCourseExist = await courseService.isCourseExist(courseId);
    if (!isCourseExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    const status = req.query.status as CourseEnum.CourseStatus;
    await courseService.updateStatus(courseId, status);
    res.send(createResponse({}, "Course published successfully"));
});

export const getCourseDetails = asyncHandler(async (req: Request, res: Response) => {
    const { identifier } = req.params;
    const isCourseExist = await courseService.isCourseExist(identifier);
    if (!isCourseExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    const course = await courseService.getCourseDetails(identifier);
    if (!course) {
        throw createHttpError(404, "Course id invalid, course not found")
    }
    res.send(createResponse(course, "Full course details fetched successfully"));
});

export const getIntructorList = asyncHandler(async (req: Request, res: Response) => {
    const instructor = await UserService.getInstructorList();
    res.send(createResponse(instructor, "Instructor List fetched"));
});

export const courseEnquiry = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const result = await courseService.courseEnquiry(data);
    const emailContent = courseEnquiryEmailTemplate(result.ticketNo, data.name, data.email, data.phone, data.education, data.interestedCourse);

    const allMails = [
        {
            from: process.env.MAIL_USER,
            to: data.email,
            subject: `Course Enquiry Ticket No: ${result.ticketNo}`,
            html: emailContent,
        },
        {
            from: process.env.MAIL_USER,
            to: process.env.MAIL_USER,
            subject: `Course Enquiry Ticket No: ${result.ticketNo}`,
            html: emailContent,
        },
        {
            from: process.env.MAIL_USER,
            to: process.env.HR_MAIL,
            subject: `Course Enquiry Ticket No: ${result.ticketNo}`,
            html: emailContent,
        },
        {
            from: process.env.MAIL_USER,
            to: process.env.SHEKHAR_MAIL,
            subject: `Course Enquiry Ticket No: ${result.ticketNo}`,
            html: emailContent,
        }
    ]

    await Promise.all(
        allMails.map((data) => emailQueue.add('send-email', data))
    )
    res.send(createResponse({}, "Course enquiry submitted successfully"));
});


export const getCourseEnquiry = asyncHandler(async (req: Request, res: Response) => {
    const pageNo = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as CourseEnum.EnquiryStatus | undefined;
    const search = req.query.search as string | undefined;
    const sortBy = req.query.sortBy as 'latest' | 'oldest' | undefined;

    const result = await courseService.getCourseEnquiry(pageNo, limit, status, search, sortBy);
    res.send(createResponse(result, "Course enquiry fetched successfully"));
});



export const changeEnquiryStatus = asyncHandler(async (req: Request, res: Response) => {
    const enquiryId = req.params.enquiryId;
    const status = req.body.status;
    const result = await courseService.changeEnquiryStatus(enquiryId, status);
    res.send(createResponse(result, "Enquiry status changed successfully"));
});

// this controller will stay and all redudnat code removes
export const getCourses = asyncHandler(async (req: Request, res: Response) => {
    const pageNo = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const category = req.query.category as string | undefined;
    const status = req.query.status as CourseEnum.CourseStatus | undefined;
    const search = req.query.search as string | undefined;

    const result = await courseService.getCourses(pageNo, limit, category, status, search);
    res.send(createResponse(result, "courses fetched successfully"));
});


export const rateCourse = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        throw createHttpError(401, "Unauthorized user, login again");
    }
    const userId = req.user._id;
    const courseId = req.params.courseId;
    const isCourseExist = await courseService.isCourseExist(courseId);
    if (!isCourseExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    if (req.user.role === UserRole.USER) {
        const isPurchased = await courseService.isUserCoursePurchased(courseId, userId);
        if (!isPurchased) {
            throw createHttpError(401, "Unauthorized user, course not assigned");
        }
    }

    const data = req.body;
    const result = await courseService.rateCourse(courseId, userId, data);
    res.send(createResponse(result, "Course rated successfully"));
});

export const getRatings = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        throw createHttpError(401, "Unauthorized user, login again");
    }
    const userId = req.user._id;
    const courseId = req.params.courseId;
    const isCourseExist = await courseService.isCourseExist(courseId);
    if (!isCourseExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    const pageNo = parseInt(req.query.pageNo as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sort = req.query.sort as 'latest' | 'oldest';
    if (sort && !['latest', 'oldest'].includes(sort)) {
        throw createHttpError(400, "Invalid sort parameter, must be 'latest' or 'oldest'");
    }
    if (pageNo < 1 || limit < 1) {
        throw createHttpError(400, "Invalid page number or limit");
    }
    const result = await courseService.getRatings(courseId, pageNo, limit, userId, sort);
    res.send(createResponse(result, "Ratings fetched successfully"));
});

export const deleteCourseContent = asyncHandler(async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const { sectionId, subSectionId } = req.query;
    const isCourseExist = await courseService.isCourseExist(courseId);
    if (!isCourseExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    let result;
    if (subSectionId) {
        result = await courseService.deleteSection(courseId, sectionId as string);
    } else {
        result = await courseService.deleteSubSection(courseId, sectionId as string, subSectionId as string);
    }
    res.send(createResponse(result, "Subsection deleted successfully"));
});


export const getMyCourses = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        throw createHttpError(401, "Unauthorized user, login again");
    }
    const userId = req.user._id;
    const pageNo = req.query.pageNo ? parseInt(req.query.pageNo as string, 10) : undefined;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : undefined;
    const result = await courseService.getMyCourses(userId, pageNo, pageSize);

    res.send(createResponse(result, "My Course fetched successfull"));
});


// QNA related controllers
export const createQna = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
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

    if (sectionId) {
        await courseService.isValidSectionSubsectionId(courseId, sectionId, subSectionId);
    }
    const isCourseExist = await courseService.isCourseExist(courseId);
    if (!isCourseExist) {
        throw createHttpError(404, "Course id is invalid, Not found");
    }
    const isPurchased = await courseService.isUserCoursePurchased(courseId, userId);
    const isInstructor = await courseService.isInstructor(courseId, userId);
    if (!isPurchased && !isInstructor) {
        throw createHttpError(401, "Unauthorized user, course not purchased or instructor");
    }
    console.log("courseId", courseId, "sectionId", sectionId, "subSectionId", subSectionId);

    const result = await courseService.createQna(userId, courseId, sectionId, subSectionId, data);
    res.send(createResponse(result, "QnA created successfully"));
});

export const addReplyToQna = asyncHandler(async (req: Request, res: Response) => {
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

export const editQnaQuestion = asyncHandler(async (req: Request, res: Response) => {
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

export const editQnaAnswer = asyncHandler(async (req: Request, res: Response) => {
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

export const deleteQnaQuestion = asyncHandler(async (req: Request, res: Response) => {
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

export const deleteQnaAnswer = asyncHandler(async (req: Request, res: Response) => {
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

    res.send(createResponse(result, "QnAs fetched successfully"));
});

// Notes related controllers
export const createCourseNotes = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        throw createHttpError(401, "Unauthorized user, login again");
    }
    const userId = req.user._id;
    const { courseId, sectionId, subSectionId } = req.query;

    if (req.user.role === UserRole.USER && courseId) {
        const isAlreadyEnrolledInCourse = await courseService.isUserCoursePurchased(courseId as string, userId);
        if (!isAlreadyEnrolledInCourse) {
            throw createHttpError(401, "Unauthorized user, course not purchased");
        }
    }

    const data: CourseDTO.ICourseNotesCreate = {
        userId: new mongoose.Types.ObjectId(userId),
        courseId: courseId ? new mongoose.Types.ObjectId(courseId as string) : undefined,
        sectionId: sectionId ? new mongoose.Types.ObjectId(sectionId as string) : undefined,
        subSectionId: subSectionId ? new mongoose.Types.ObjectId(subSectionId as string) : undefined,
        notes: req.body.notes
    };


    const result = await courseService.createCourseNotes(data);
    res.send(createResponse(result, "Course notes created successfully"));
});

export const updateCourseNotes = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        throw createHttpError(401, "Unauthorized user, login again");
    }

    const result = await courseService.updateCourseNotes(req.params.noteId, req.body.notes);
    res.send(createResponse(result, "Course notes updated successfully"));
});

export const deleteNotes = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        throw createHttpError(401, "Unauthorized user, login again");
    }
    const noteId = req.params.noteId;

    const result = await courseService.deleteNotes(noteId);
    res.send(createResponse(result, "Course notes deleted successfully"));
});

export const getCourseNotes = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        throw createHttpError(401, "Unauthorized user, login again");
    }
    const userId = req.user._id;
    const { courseId, sectionId, subSectionId, page, limit, search, sort } = req.query;
    const pageNo = page ? parseInt(page as string, 10) : 1;
    const pageSize = limit ? parseInt(limit as string, 10) : 10;

    const query: Record<string, any> = {
        userId: userId as string,
        pageNo,
        pageSize
    }
    if (courseId) {
        query.courseId = courseId as string;
    }
    if (sectionId) {
        query.sectionId = sectionId as string;
    }
    if (subSectionId) {
        query.subSectionId = subSectionId as string;
    }
    if (search) {
        query.search = search as string;
    }
    if (sort) {
        query.sort = sort as string
    }


    const result = await courseService.getCourseNotes(query);
    res.send(createResponse(result, "Course notes fetched successfully"));
});
