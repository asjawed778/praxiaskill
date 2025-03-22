import { body, param } from "express-validator";
import * as CourseEnum from "./course.enum";

export const createCourse = [
    // Course ID Validation (if provided)
    param("courseId")
        .optional()
        .isMongoId().withMessage("Invalid courseId. Must be a valid MongoDB ObjectId"),

    // Basic Course Details
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
        .isIn(Object.values(CourseEnum.Language))
        .withMessage("Invalid language selection"),

    body("instructor")
        .notEmpty().withMessage("Instructor is required")
        .isMongoId().withMessage("Instructor must be a valid ObjectId"),

    body("courseMode")
        .notEmpty().withMessage("Course mode is required")
        .isIn(Object.values(CourseEnum.CourseMode))
        .withMessage("Invalid course mode selection"),

    body("thumbnail")
        .notEmpty().withMessage("Thumbnail is required")
        .isString().withMessage("Thumbnail URL must be a string")
        .isURL().withMessage("Thumbnail must be a valid URL")
        .matches(/^https?:\/\/.*\.amazonaws\.com\/.*/).withMessage("Invalid AWS S3 URL format"),

    body("brouchure")
        .notEmpty().withMessage("Brouchure is required")
        .isString().withMessage("Brouchure URL must be a string")
        .isURL().withMessage("Brouchure must be a valid URL")
        .matches(/^https?:\/\/.*\.amazonaws\.com\/.*/).withMessage("Invalid AWS S3 URL format"),

    // Additional Course Details
    body("keypoints")
        .notEmpty().withMessage("At least one keypoint is required")
        .isArray().withMessage("Keypoints must be an array")
        .custom((value: string[]) => value.every((item) => typeof item === "string"))
        .withMessage("Each keypoint must be a string"),

    body("tags")
        .notEmpty().withMessage("At least one tag is required")
        .isArray().withMessage("Tags must be an array")
        .custom((value: string[]) => value.every((item) => typeof item === "string"))
        .withMessage("Each tag must be a string"),

    body("whatWillYouLearn")
        .notEmpty().withMessage("At least one learning point is required")
        .isArray().withMessage("whatWillYouLearn must be an array")
        .custom((value: string[]) => value.every((item) => typeof item === "string"))
        .withMessage("Each learning point must be a string"),

    body("description")
        .notEmpty().withMessage("Description is required")
        .isString().withMessage("Description must be a string"),

    body("duration")
        .notEmpty().withMessage("Duration is required")
        .isString().withMessage("Duration must be a string"),

    body("totalLectures")
        .notEmpty().withMessage("Total lectures count is required")
        .isNumeric().withMessage("Total lectures must be a number"),

    body("trailerVideo")
        .optional()
        .isString().withMessage("Trailer video URL must be a string")
        .isURL().withMessage("Trailer video must be a valid URL")
        .matches(/^https?:\/\/.*\.amazonaws\.com\/.*/).withMessage("Invalid AWS S3 URL format"),

    // Price Validation
    body("price.actualPrice")
        .notEmpty().withMessage("Actual price is required")
        .isNumeric().withMessage("Actual price must be a number"),

    body("price.discountPercentage")
        .optional()
        .isNumeric().withMessage("Discount percentage must be a number"),

    body("price.finalPrice")
        .notEmpty().withMessage("Final price is required")
        .isNumeric().withMessage("Final price must be a number"),

    // Course Sections
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

    // Course Status
    body("courseStatus")
        .optional()
        .isIn(Object.values(CourseEnum.CourseStatus))
        .withMessage("Invalid course status selection"),
];

export const courseEnquiry = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("phone").isMobilePhone("any").withMessage("Invalid phone number"),
    body("education").notEmpty().withMessage("Education is required"),
    body("interestedCourse").notEmpty().withMessage("Interested course is required"),
    body("whatsAppOptIn").isBoolean().withMessage("WhatsApp Opt-in must be a boolean"),
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

export const changeEnquiryStatus = [
    param('enquiryId')
        .notEmpty().withMessage('enquiryId is required')
        .isMongoId().withMessage('Invalid enquiryId. Must be a valid MongoDB ObjectId'),

    body('status')
        .notEmpty().withMessage('Status is required')
        .isIn(Object.values(CourseEnum.EnquiryStatus))
        .withMessage(`Status must be one of: ${Object.values(CourseEnum.EnquiryStatus).join(', ')}`)
];

