import { body, param } from "express-validator";
import createHttpError from "http-errors";
import { Language, CourseMode } from "./course.enum";

export const courseDetails = [
    param('courseId')
        .optional()
        .isMongoId().withMessage('Invalid courseId. Must be a valid MongoDB ObjectId'),

    body("title")
        .notEmpty().withMessage("Title is required")
        .isString().withMessage("Title must be a string"),
    body("subtitle")
        .notEmpty().withMessage("Subtitle is required")
        .isString().withMessage("Subtitle must be a string"),
    body("category")
        .notEmpty().withMessage("Category is required")
        .isMongoId().withMessage("Category must be a valid ObjectId"),
    body("language")
        .notEmpty().withMessage("Language is required")
        .isIn(Object.values(Language))
        .withMessage("Invalid language selection"),
    body("instructor")
        .notEmpty().withMessage("Instructor is required")
        .isMongoId().withMessage("Instructor must be a valid ObjectId"),
    body("courseMode")
        .notEmpty().withMessage("Course mode is required")
        .isIn(Object.values(CourseMode))
        .withMessage("Invalid course mode selection"),
    body("thumbnail")
        .notEmpty().withMessage("Thumbnail is required")
        .isString().withMessage("Thumbnail url must be a string")
        .isURL().withMessage("Thumbnail must be a valid URL") 
        .matches(/^https?:\/\/.*\.amazonaws\.com\/.*/).withMessage("Invalid AWS S3 URL format"),
    body("brouchure")
        .notEmpty().withMessage("Brouchure is required")
        .isString().withMessage("Brouchure url must be a string")
        .isURL().withMessage("Brouchure must be a valid URL") 
        .matches(/^https?:\/\/.*\.amazonaws\.com\/.*/).withMessage("Invalid AWS S3 URL format")  
    
];

export const AdditionalDetails = [
    param('courseId')
        .notEmpty().withMessage('courseId is required')
        .isMongoId().withMessage('Invalid courseId. Must be a valid MongoDB ObjectId'),

    body('keypoints')
        .notEmpty().withMessage('At least one keypoint is required')
        .isArray().withMessage('Keypoints must be an array')
        .customSanitizer((value: unknown) => Array.isArray(value) ? value.map(String) : []) // Prevent undefined errors
        .custom((value: string[]) => value.every((item) => typeof item === 'string'))
        .withMessage('Each keypoint must be a string'),

    body('tags')
        .notEmpty().withMessage('At least one tag is required')
        .isArray().withMessage('Tags must be an array')
        .customSanitizer((value: unknown) => Array.isArray(value) ? value.map(String) : []) // Prevent undefined errors
        .custom((value: string[]) => value.every((item) => typeof item === 'string'))
        .withMessage('Each tag must be a string'),

    body('description')
        .notEmpty().withMessage('Description is required')
        .isString().withMessage('Description must be a string'),

    body('duration')
        .optional()
        .trim()
        .isString().withMessage('Duration must be a string'),

    body('totalLecture')
        .optional()
        .trim()
        .isString().withMessage('TotalLecture must be a string'),

    body('trailerVideo')
        .optional()
        .isString().withMessage('Trailer video URL must be a string')
        .isURL().withMessage('Trailer video must be a valid URL') 
        .matches(/^https?:\/\/.*\.amazonaws\.com\/.*/).withMessage('Invalid AWS S3 URL format')  
];

export const courseContentStructure = [
    param("courseId")
        .notEmpty().withMessage("courseId is required")
        .isMongoId().withMessage("Invalid courseId. Must be a valid MongoDB ObjectId"),

    body("sections")
        .isArray({ min: 1 }).withMessage("Sections must be an array with at least one section"),

    body("sections.*.title")
        .notEmpty().withMessage("Section title is required")
        .isString().withMessage("Section title must be a string"),

    body("sections.*.description")
        .optional()
        .isString().withMessage("Section description must be a string"),

    body("sections.*.subSections")
        .isArray().withMessage("SubSections must be an array"),

    body("sections.*.subSections.*.title")
        .notEmpty().withMessage("SubSection title is required")
        .isString().withMessage("SubSection title must be a string"),

];

export const coursePreview = [
    param('courseId')
        .notEmpty().withMessage('courseId is required')
        .isMongoId().withMessage('Invalid courseId. Must be a valid MongoDB ObjectId'),
];

export const publishCourse = [
    param('courseId')
        .notEmpty().withMessage('courseId is required')
        .isMongoId().withMessage('Invalid courseId. Must be a valid MongoDB ObjectId'),
];

export const unpublishCourse = [
    param('courseId')
        .notEmpty().withMessage('courseId is required')
        .isMongoId().withMessage('Invalid courseId. Must be a valid MongoDB ObjectId'),
];

export const terminateCourse = [
    param('courseId')
        .notEmpty().withMessage('courseId is required')
        .isMongoId().withMessage('Invalid courseId. Must be a valid MongoDB ObjectId'),
];

export const getFullCourseDetails = [
    param('courseId')
        .notEmpty().withMessage('courseId is required')
        .isMongoId().withMessage('Invalid courseId. Must be a valid MongoDB ObjectId'),
];

export const draftCourse = [
    param('courseId')
        .notEmpty().withMessage('courseId is required')
        .isMongoId().withMessage('Invalid courseId. Must be a valid MongoDB ObjectId'),
];

export const getPublishedCourseByCategory = [
    param('categoryId')
        .notEmpty().withMessage('categoryId is required')
        .isMongoId().withMessage('Invalid categoryId. Must be a valid MongoDB ObjectId'),
];


