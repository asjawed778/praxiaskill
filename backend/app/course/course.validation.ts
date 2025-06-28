import { body, param, query } from "express-validator";
import * as CourseEnum from "./course.enum";

const allowedVideoTypes = [
    "video/mp4", "video/mov", "video/avi",
    "video/mkv", "video/webm", "video/flv", "video/wmv"
];

const allowedImageTypes = [
    "image/png", "image/jpeg", "image/jpg", "image/gif"
];

const allowedFileTypes = [
    ...allowedVideoTypes,
    "application/pdf",
    ...allowedImageTypes
];

// export const createCourse = [

//     // Basic Course Details
//     body("title")
//         .notEmpty().withMessage("Title is required")
//         .isString().withMessage("Title must be a string"),

//     body("subtitle")
//         .notEmpty().withMessage("Subtitle is required")
//         .isString().withMessage("Subtitle must be a string"),

//     body("category")
//         .notEmpty().withMessage("Category is required")
//         .isMongoId().withMessage("Category must be a valid ObjectId"),

//     body("language")
//         .notEmpty().withMessage("Language is required")
//         .isIn(Object.values(CourseEnum.Language))
//         .withMessage("Invalid language selection"),

//     body("instructor")
//         .notEmpty().withMessage("Instructor is required")
//         .isMongoId().withMessage("Instructor must be a valid ObjectId"),

//     body("courseMode")
//         .notEmpty().withMessage("Course mode is required")
//         .isIn(Object.values(CourseEnum.CourseMode))
//         .withMessage("Invalid course mode selection"),

//     body("thumbnail")
//         .notEmpty().withMessage("Thumbnail is required")
//         .isString().withMessage("Thumbnail URL must be a string")
//         .isURL().withMessage("Thumbnail must be a valid URL")
//         .matches(/^https?:\/\/.*\.amazonaws\.com\/.*/).withMessage("Invalid AWS S3 URL format"),

//     body("brouchure")
//         .notEmpty().withMessage("Brouchure is required")
//         .isString().withMessage("Brouchure URL must be a string")
//         .isURL().withMessage("Brouchure must be a valid URL")
//         .matches(/^https?:\/\/.*\.amazonaws\.com\/.*/).withMessage("Invalid AWS S3 URL format"),

//     // Additional Course Details
//     body("keypoints")
//         .notEmpty().withMessage("At least one keypoint is required")
//         .isArray().withMessage("Keypoints must be an array")
//         .custom((value: string[]) => value.every((item) => typeof item === "string"))
//         .withMessage("Each keypoint must be a string"),

//     body("tags")
//         .notEmpty().withMessage("At least one tag is required")
//         .isArray().withMessage("Tags must be an array")
//         .custom((value: string[]) => value.every((item) => typeof item === "string"))
//         .withMessage("Each tag must be a string"),

//     body("whatWillYouLearn")
//         .notEmpty().withMessage("At least one learning point is required")
//         .isArray().withMessage("whatWillYouLearn must be an array")
//         .custom((value: string[]) => value.every((item) => typeof item === "string"))
//         .withMessage("Each learning point must be a string"),

//     body("description")
//         .notEmpty().withMessage("Description is required")
//         .isString().withMessage("Description must be a string"),

//     body("duration")
//         .notEmpty().withMessage("Duration is required")
//         .isString().withMessage("Duration must be a string"),

//     body("totalLectures")
//         .notEmpty().withMessage("Total lectures count is required")
//         .isNumeric().withMessage("Total lectures must be a number"),

//     body("trailerVideo")
//         .optional()
//         .isString().withMessage("Trailer video URL must be a string")
//         .isURL().withMessage("Trailer video must be a valid URL")
//         .matches(/^https?:\/\/.*\.amazonaws\.com\/.*/).withMessage("Invalid AWS S3 URL format"),

//     body("tools")
//         .optional()
//         .isArray().withMessage("Tools must be an array")
//         .custom((tools: any[]) => tools.every(tool =>
//             typeof tool.name === "string" &&
//             (!tool.url || typeof tool.url === "string")
//         ))
//         .withMessage("Each tool must have a valid name (string) and optional url (string)"),

//     body("faq")
//         .optional()
//         .isArray().withMessage("FAQ must be an array")
//         .custom((faqItems: any[]) => faqItems.every(item =>
//             typeof item.question === "string" &&
//             typeof item.answer === "string"
//         ))
//         .withMessage("Each FAQ item must have a valid question and answer (both strings)"),

//     // Price Validation
//     body("price.actualPrice")
//         .notEmpty().withMessage("Actual price is required")
//         .isNumeric().withMessage("Actual price must be a number"),

//     body("price.discountPercentage")
//         .optional()
//         .isNumeric().withMessage("Discount percentage must be a number"),

//     body("price.finalPrice")
//         .notEmpty().withMessage("Final price is required")
//         .isNumeric().withMessage("Final price must be a number"),

//     // Course Sections
//     body("sections")
//         .isArray({ min: 1 }).withMessage("Sections must be an array with at least one section"),

//     body("sections.*.title")
//         .notEmpty().withMessage("Section title is required")
//         .isString().withMessage("Section title must be a string"),

//     body("sections.*.description")
//         .optional()
//         .isString().withMessage("Section description must be a string"),

//     body("sections.*.subSections")
//         .isArray().withMessage("SubSections must be an array"),

//     body("sections.*.subSections.*.title")
//         .notEmpty().withMessage("SubSection title is required")
//         .isString().withMessage("SubSection title must be a string"),

//     // Course Status
//     body("courseStatus")
//         .optional()
//         .isIn(Object.values(CourseEnum.CourseStatus))
//         .withMessage("Invalid course status selection"),
// ];

export const createCourse = [
    // Basic Course Details
    body("title")
        .notEmpty().withMessage("Title is required")
        .isString().withMessage("Title must be a string")
        .trim(),

    body("subtitle")
        .notEmpty().withMessage("Subtitle is required")
        .isString().withMessage("Subtitle must be a string")
        .trim(),

    body("brouchure")
        .optional()
        .isString().withMessage("Brouchure URL must be a string")
        .trim()
        .isURL().withMessage("Brouchure must be a valid URL")
        .matches(/^https?:\/\/.*\.amazonaws\.com\/.*/).withMessage("Invalid AWS S3 URL format"),

    body("thumbnail")
        .notEmpty().withMessage("Thumbnail is required")
        .isString().withMessage("Thumbnail URL must be a string")
        .trim()
        .isURL().withMessage("Thumbnail must be a valid URL")
        .matches(/^https?:\/\/.*\.amazonaws\.com\/.*/).withMessage("Invalid AWS S3 URL format"),

    body("instructor")
        .optional()
        .isMongoId().withMessage("Instructor must be a valid ObjectId"),

    body("description")
        .notEmpty().withMessage("Description is required")
        .isString().withMessage("Description must be a string")
        .trim(),

    // Arrays with optional items
    body("keypoints")
        .optional()
        .isArray().withMessage("Keypoints must be an array")
        .custom((value: string[]) => value.every((item) => typeof item === "string"))
        .withMessage("Each keypoint must be a string"),

    body("tags")
        .optional()
        .isArray().withMessage("Tags must be an array")
        .custom((value: string[]) => value.every((item) => typeof item === "string"))
        .withMessage("Each tag must be a string"),

    body("whatWillYouLearn")
        .optional()
        .isArray().withMessage("whatWillYouLearn must be an array")
        .custom((value: string[]) => value.every((item) => typeof item === "string"))
        .withMessage("Each learning point must be a string"),

    body("prerequisites")
        .optional()
        .isString().withMessage("prerequisite must be a string"),

    body("courseLevel")
        .optional()
        .isString().withMessage("Course level must be a string")
        .trim(),

    // Tools validation
    body("tools")
        .optional()
        .isArray().withMessage("Tools must be an array"),

    body("tools.*.name")
        .if(body("tools").exists().isArray())
        .notEmpty().withMessage("Tool name is required")
        .isString().withMessage("Tool name must be a string")
        .trim(),

    body("tools.*.iconName")
        .if(body("tools").exists().isArray())
        .optional()
        .isString().withMessage("Tool icon name must be a string")
        .trim(),

    body("tools.*.url")
        .if(body("tools").exists().isArray())
        .optional()
        .isString().withMessage("Tool URL must be a string")
        .trim()
        .isURL().withMessage("Tool URL must be a valid URL"),

    // FAQ validation
    body("faq")
        .optional()
        .isArray().withMessage("FAQ must be an array"),

    body("faq.*.question")
        .if(body("faq").exists().isArray())
        .notEmpty().withMessage("FAQ question is required")
        .isString().withMessage("FAQ question must be a string")
        .trim(),

    body("faq.*.answer")
        .if(body("faq").exists().isArray())
        .notEmpty().withMessage("FAQ answer is required")
        .isString().withMessage("FAQ answer must be a string")
        .trim(),

    body("faq.*.resourceUrl")
        .if(body("faq").exists().isArray())
        .optional()
        .isString().withMessage("FAQ resource URL must be a string")
        .trim()
        .isURL().withMessage("FAQ resource must be a valid URL"),

    // Category and pricing
    body("category")
        .notEmpty().withMessage("Category is required")
        .isMongoId().withMessage("Category must be a valid ObjectId"),

    body("price.actualPrice")
        .notEmpty().withMessage("Actual price is required")
        .isFloat({ min: 0 }).withMessage("Actual price must be a positive number"),

    body("price.discountPercentage")
        .optional()
        .isFloat({ min: 0, max: 100 }).withMessage("Discount percentage must be between 0 and 100"),

    body("price.finalPrice")
        .notEmpty().withMessage("Final price is required")
        .isFloat({ min: 0 }).withMessage("Final price must be a positive number"),

    // Course metadata
    body("language")
        .notEmpty().withMessage("Language is required")
        .isIn(Object.values(CourseEnum.Language))
        .withMessage("Invalid language selection"),

    body("duration")
        .optional()
        .isString().withMessage("Duration must be a string")
        .trim(),

    body("totalLiveSession")
        .optional()
        .isString().withMessage("totalLiveSession must be a string")
        .trim(),

    body("recordedContent")
        .optional()
        .isString().withMessage("recordedContent must be a string")
        .trim(),

    body("courseMode")
        .notEmpty().withMessage("Course mode is required")
        .isIn(Object.values(CourseEnum.CourseMode))
        .withMessage("Invalid course mode selection"),

    body("trailerVideo")
        .optional()
        .isString().withMessage("Trailer video URL must be a string")
        .trim()
        .isURL().withMessage("Trailer video must be a valid URL")
        .matches(/^https?:\/\/.*\.amazonaws\.com\/.*/).withMessage("Invalid AWS S3 URL format"),

    // Sections validation
    body("sections")
        .isArray({ min: 1 }).withMessage("At least one section is required")
        .custom((sections: any[]) => sections.length > 0).withMessage("At least one section is required"),

    // Section validation
    body("sections.*.title")
        .notEmpty().withMessage("Section title is required")
        .isString().withMessage("Section title must be a string")
        .trim(),

    body("sections.*.description")
        .optional()
        .isString().withMessage("Section description must be a string")
        .trim(),

    body("sections.*.duration")
        .optional()
        .isString().withMessage("Section duration must be a string")
        .trim(),

    body("sections.*.assignments")
        .optional()
        .isArray().withMessage("Assignments must be an array"),

    body("sections.*.assignments.*")
        .if(body("sections.*.assignments").exists().isArray())
        .isString().withMessage("Assignment must be a string")
        .trim(),

    body("sections.*.projects")
        .optional()
        .isArray().withMessage("Projects must be an array"),

    body("sections.*.projects.*")
        .if(body("sections.*.projects").exists().isArray())
        .isString().withMessage("Project must be a string")
        .trim(),

    // SubSections validation
    body("sections.*.subSections")
        .isArray({ min: 1 }).withMessage("At least one subsection is required")
        .custom((subSections: any[]) => subSections.length > 0).withMessage("At least one subsection is required"),

    body("sections.*.subSections.*.title")
        .notEmpty().withMessage("Subsection title is required")
        .isString().withMessage("Subsection title must be a string")
        .trim(),

    body("sections.*.subSections.*.description")
        .optional()
        .isString().withMessage("Subsection description must be a string")
        .trim(),

    // Video validation
    body("sections.*.subSections.*.video.link")
        .optional()
        .isString().withMessage("Video link must be a string")
        .trim()
        .isURL().withMessage("Video link must be a valid URL"),

    body("sections.*.subSections.*.video.duration")
        .optional()
        .isString().withMessage("Video duration must be a string")
        .trim(),

    // PDF validation
    body("sections.*.subSections.*.pdf")
        .optional()
        .isString().withMessage("PDF must be a string")
        .trim()
        .isURL().withMessage("PDF must be a valid URL"),

    // Image validation
    body("sections.*.subSections.*.image")
        .optional()
        .isString().withMessage("Image must be a string")
        .trim()
        .isURL().withMessage("Image must be a valid URL"),

    // Resources validation
    body("sections.*.subSections.*.resources")
        .optional()
        .isArray().withMessage("Resources must be an array"),

    body("sections.*.subSections.*.resources.*")
        .if(body("sections.*.subSections.*.resources").exists().isArray())
        .isString().withMessage("Resource must be a string")
        .trim(),

    // Preview flag
    body("sections.*.subSections.*.isPreview")
        .optional()
        .isBoolean().withMessage("isPreview must be a boolean"),
    // Course status and validity
    body("courseStatus")
        .optional()
        .isIn(Object.values(CourseEnum.CourseStatus))
        .withMessage("Invalid course status selection"),

    body("validity")
        .notEmpty().withMessage("Validity is required")
        .isIn(Object.values(CourseEnum.CourseValidity))
        .withMessage("Invalid course validity selection")
];

export const updateCourse = [
    // Course ID Validation (if provided)
    param("courseId")
        .notEmpty().withMessage("Course ID is required")
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

    body("prerequisites")
        .optional()
        .isString().withMessage("prerequisite must be a string"),

    body("totalLiveSession")
        .optional()
        .isString().withMessage("totalLiveSession must be a string")
        .trim(),

    body("recordedContent")
        .optional()
        .isString().withMessage("recordedContent must be a string")
        .trim(),

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
    body("education").optional(),
    body("interestedCourse").optional(),
    body("whatsAppOptIn").isBoolean().withMessage("WhatsApp Opt-in must be a boolean"),
];

export const coursePreview = [
    param('courseId')
        .notEmpty().withMessage('courseId is required')
        .isMongoId().withMessage('Invalid courseId. Must be a valid MongoDB ObjectId'),
];

export const updateStatus = [
    param('courseId')
        .notEmpty().withMessage('courseId is required')
        .isMongoId().withMessage('Invalid courseId. Must be a valid MongoDB ObjectId'),

    query('status')
        .notEmpty().withMessage("Status is required")
        .isIn(Object.values(CourseEnum.CourseStatus))

];

export const unpublishCourse = [
    param('courseId')
        .notEmpty().withMessage('courseId is required')
        .isMongoId().withMessage('Invalid courseId. Must be a valid MongoDB ObjectId'),
];

export const getFullCourseDetails = [
    param('courseId')
        .notEmpty().withMessage('courseId is required')
        .isMongoId().withMessage('Invalid courseId. Must be a valid MongoDB ObjectId'),
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


export const getCourseEnquiry = [
    query("limit")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Limit must be a positive integer"),

    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be a positive integer"),

    query("search")
        .optional()
        .isString()
        .withMessage("Search must be a string"),

    query("status")
        .optional()
        .isString()
        .isIn(Object.values(CourseEnum.EnquiryStatus))
        .withMessage(`Status must be one of: ${Object.values(CourseEnum.EnquiryStatus).join(', ')}`),

    query("sort")
        .optional()
        .isIn(["latest", "oldest"])
        .withMessage("Sort must be either 'latest' or 'oldest'")
];


export const getCourses = [
    query('page')
        .optional()
        .isInt({ min: 1 }).withMessage('Page must be a positive integer'),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),

    query('category')
        .optional()
        .isMongoId().withMessage('Category must be a valid MongoDB ObjectId'),

    query('status')
        .optional()
        .isIn(Object.values(CourseEnum.CourseStatus))
        .withMessage(`Status must be one of: ${Object.values(CourseEnum.CourseStatus).join(', ')}`),

    query('search')
        .optional()
        .isString().withMessage('Search term must be a string'),
];

export const getCourseDetails = [
    param('identifier')
        .notEmpty().withMessage('courseId or slug is required')
];

export const deleteContent = [
    param('courseId')
        .notEmpty().withMessage('courseId is required')
        .isMongoId().withMessage('Invalid courseId. Must be a valid MongoDB ObjectId'),

    query('sectionId')
        .notEmpty().withMessage('sectionId is required')
        .isMongoId().withMessage('Invalid sectionId. Must be a valid MongoDB ObjectId'),

    query('subSectionId')
        .optional()
        .isMongoId().withMessage('Invalid subSectionId. Must be a valid MongoDB ObjectId'),
];

export const updateCourseCurriculum = [
    // Validate section array
    body("sections").isArray({ min: 1 }).withMessage("Sections must be a non-empty array"),

    // Validate each section
    body("sections.*._id")
        .optional()
        .isMongoId().withMessage("Section _id must be a valid MongoDB ObjectId"),

    body("sections.*.title")
        .isString().withMessage("Section title must be a string")
        .notEmpty().withMessage("Section title is required"),

    body("sections.*.description")
        .optional()
        .isString().withMessage("Section description must be a string"),

    body("sections.*.assignments")
        .optional()
        .isArray().withMessage("Assignments must be an array"),

    body("sections.*.assignments.*")
        .optional()
        .isString().withMessage("Each assignment must be a string"),

    body("sections.*.projects")
        .optional()
        .isArray().withMessage("Projects must be an array"),

    body("sections.*.projects.*")
        .optional()
        .isString().withMessage("Each project must be a string"),

    body("sections.*.duration")
        .optional()
        .isString().withMessage("Duration must be a string"),

    // Validate subSections
    body("sections.*.subSections")
        .isArray({ min: 1 }).withMessage("SubSections must be a non-empty array"),

    body("sections.*.subSections.*._id")
        .optional()
        .isMongoId().withMessage("SubSection _id must be a valid MongoDB ObjectId"),

    body("sections.*.subSections.*.title")
        .isString().withMessage("SubSection title must be a string")
        .notEmpty().withMessage("SubSection title is required"),

    body("sections.*.subSections.*.description")
        .optional()
        .isString().withMessage("SubSection description must be a string")
];

export const courseUpload = [
    param('courseId')
        .notEmpty().withMessage('courseId is required')
        .isMongoId().withMessage('Invalid courseId. Must be a valid MongoDB ObjectId'),

    param('sectionId')
        .notEmpty().withMessage('sectionId is required')
        .isMongoId().withMessage('Invalid sectionId. Must be a valid MongoDB ObjectId'),

    param('subSectionId')
        .notEmpty().withMessage('subSectionId is required')
        .isMongoId().withMessage('Invalid subSectionId. Must be a valid MongoDB ObjectId'),

    body('fileName')
        .notEmpty().withMessage('file name is required')
        .isString().withMessage('fileName must be a string'),

    body('fileType')
        .notEmpty().withMessage('fileType is required')
        .isString().withMessage('fileType must be a valid MIME type')
        .isIn(allowedFileTypes).withMessage(`Invalid fileType. Allowed types: ${allowedFileTypes.join(", ")}`),

    body('courseTitle')
        .notEmpty().withMessage('courseTitle is required')
        .isString().withMessage('courseTitle must be a string'),
];

export const uploadChunk = [
    param('courseId')
        .notEmpty().withMessage('courseId is required')
        .isMongoId().withMessage('Invalid courseId. Must be a valid MongoDB ObjectId'),

    param('sectionId')
        .notEmpty().withMessage('sectionId is required')
        .isMongoId().withMessage('Invalid sectionId. Must be a valid MongoDB ObjectId'),

    param('subSectionId')
        .notEmpty().withMessage('subSectionId is required')
        .isMongoId().withMessage('Invalid subSectionId. Must be a valid MongoDB ObjectId'),
];

export const completeUpload = [
    param('courseId')
        .notEmpty().withMessage('courseId is required')
        .isMongoId().withMessage('Invalid courseId. Must be a valid MongoDB ObjectId'),

    param('sectionId')
        .notEmpty().withMessage('sectionId is required')
        .isMongoId().withMessage('Invalid sectionId. Must be a valid MongoDB ObjectId'),

    param('subSectionId')
        .notEmpty().withMessage('subSectionId is required')
        .isMongoId().withMessage('Invalid subSectionId. Must be a valid MongoDB ObjectId'),

    body("uploadId")
        .notEmpty().withMessage("uploadId is required")
        .isString().withMessage("uploadId must be a string"),

    body("fileKey")
        .notEmpty().withMessage("fileKey is required")
        .isString().withMessage("fileKey must be a string"),

    body("parts")
        .isArray({ min: 1 }).withMessage("parts must be an array with at least one part")
        .custom((value) => {
            return value.every((part: any) => {
                return (
                    typeof part.PartNumber === "number" &&
                    part.PartNumber > 0 &&
                    typeof part.ETag === "string"
                );
            });
        }).withMessage("Each part must have partNumber (number) and ETag (string)"),
];

export const courseContentPresignedUrl = [
    param('courseId')
        .notEmpty().withMessage('courseId is required')
        .isMongoId().withMessage('Invalid courseId. Must be a valid MongoDB ObjectId'),

    param('sectionId')
        .notEmpty().withMessage('sectionId is required')
        .isMongoId().withMessage('Invalid sectionId. Must be a valid MongoDB ObjectId'),

    param('subSectionId')
        .notEmpty().withMessage('subSectionId is required')
        .isMongoId().withMessage('Invalid subSectionId. Must be a valid MongoDB ObjectId'),

];

export const createQna = [
    query('courseId')
        .notEmpty().withMessage('courseId is required')
        .isMongoId().withMessage('Invalid courseId. Must be a valid MongoDB ObjectId'),

    query('sectionId')
        .optional()
        .isMongoId().withMessage('Invalid sectionId. Must be a valid MongoDB ObjectId'),

    query('subSectionId')
        .optional()
        .isMongoId().withMessage('Invalid subSectionId. Must be a valid MongoDB ObjectId'),

    body('title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be a string')
        .trim()
        .isLength({ min: 5 }).withMessage('Title must be at least 5 characters long'),

    body('description')
        .optional()
        .isString().withMessage('Description must be a string')
        .trim()
];

export const addReplyToQna = [
    param('qnaId')
        .notEmpty().withMessage('qnaId is required')
        .isMongoId().withMessage('Invalid qnaId. Must be a valid MongoDB ObjectId'),

    body('answer')
        .notEmpty().withMessage('Answer is required')
        .isString().withMessage('Answer must be a string')
        .trim()
        .isLength({ min: 5 }).withMessage('Answer must be at least 5 characters long')
];

export const editQnaQuestion = [
    param('qnaId')
        .notEmpty().withMessage('qnaId is required')
        .isMongoId().withMessage('Invalid qnaId. Must be a valid MongoDB ObjectId'),

    body('title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be a string')
        .trim()
        .isLength({ min: 5 }).withMessage('Title must be at least 5 characters long'),

    body('description')
        .optional()
        .isString().withMessage('Description must be a string')
        .trim()
];

export const editQnaAnswer = [
    param('qnaId')
        .notEmpty().withMessage('qnaId is required')
        .isMongoId().withMessage('Invalid qnaId. Must be a valid MongoDB ObjectId'),

    param('answerIndex')
        .notEmpty().withMessage('answerIndex is required')
        .isInt({ min: 0 }).withMessage('answerIndex must be a non-negative integer'),

    body('answer')
        .notEmpty().withMessage('Answer is required')
        .isString().withMessage('Answer must be a string')
        .trim()
        .isLength({ min: 5 }).withMessage('Answer must be at least 5 characters long')
];

export const deleteQnaQuestion = [
    param('qnaId')
        .notEmpty().withMessage('qnaId is required')
        .isMongoId().withMessage('Invalid qnaId. Must be a valid MongoDB ObjectId')
];

export const deleteQnaAnswer = [
    param('qnaId')
        .notEmpty().withMessage('qnaId is required')
        .isMongoId().withMessage('Invalid qnaId. Must be a valid MongoDB ObjectId'),

    param('answerIndex')
        .notEmpty().withMessage('answerIndex is required')
        .isInt({ min: 0 }).withMessage('answerIndex must be a non-negative integer')
];

export const getQnas = [
    query('courseId')
        .notEmpty().withMessage('courseId is required')
        .isMongoId().withMessage('Invalid courseId'),

    query('sectionId')
        .optional()
        .isMongoId().withMessage('Invalid sectionId'),

    query('subSectionId')
        .optional()
        .isMongoId().withMessage('Invalid subSectionId'),

    query('search')
        .optional()
        .isString().withMessage('Search query must be a string')
        .trim(),

    query('sort')
        .optional()
        .isIn(['latest', 'oldest']).withMessage('Sort must be either "latest" or "oldest"'),

    query('upvote')
        .optional()
        .isBoolean().withMessage('Upvote must be a boolean')
        .toBoolean(),

    query('page')
        .optional()
        .isInt({ min: 1 }).withMessage('Page must be a positive integer')
        .toInt(),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 }).withMessage('PerPage must be between 1 and 100')
        .toInt()
];

export const rateCourse = [
    param('courseId')
        .notEmpty().withMessage('courseId is required')
        .isMongoId().withMessage('Invalid courseId. Must be a valid MongoDB ObjectId'),

    body('rating')
        .notEmpty().withMessage('Rating is required')
        .isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),

    body('comment')
        .optional()
        .isString().withMessage('Review must be a string')
        .trim()
        .isLength({ max: 500 }).withMessage('Review must not exceed 500 characters'),
];

export const getRatings = [
    param('courseId')
        .notEmpty().withMessage('courseId is required')
        .isMongoId().withMessage('Invalid courseId. Must be a valid MongoDB ObjectId'),

    query('sort')
        .optional()
        .isIn(['latest', 'oldest']).withMessage('Sort must be either "latest" or "oldest"'),

    query('pageNo')
        .optional()
        .isInt({ min: 1 }).withMessage('Page must be a positive integer')
        .toInt(),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 }).withMessage('PerPage must be between 1 and 100')
        .toInt(),
];

// course notes validation

export const createCourseNotes = [
    body("notes")
        .notEmpty().withMessage("Notes is required")
        .isString().withMessage("Notes must be a string")
        .trim(),

    query("courseId")
        .optional()
        .isMongoId().withMessage("Invalid courseId. Must be a valid MongoDB ObjectId"),

    query("sectionId")
        .optional()
        .isMongoId().withMessage("Invalid sectionId. Must be a valid MongoDB ObjectId"),

    query("subSectionId")
        .optional()
        .isMongoId().withMessage("Invalid subSectionId. Must be a valid MongoDB ObjectId"),

];

export const updateCourseNotes = [
    body("notes")
        .notEmpty().withMessage("Notes is required"),

    param("noteId")
        .notEmpty().withMessage("Notes ID is required")
        .isMongoId().withMessage("Invalid notesId. Must be a valid MongoDB ObjectId")
];

export const deleteCourseNotes = [
    param("noteId")
        .notEmpty().withMessage("Notes ID is required")
        .isMongoId().withMessage("Invalid notesId. Must be a valid MongoDB ObjectId"),
];

export const getCourseNotes = [
    query("courseId")
        .optional()
        .isMongoId().withMessage("Invalid courseId. Must be a valid MongoDB ObjectId"),

    query("sectionId")
        .optional()
        .isMongoId().withMessage("Invalid sectionId. Must be a valid MongoDB ObjectId"),

    query("subSectionId")
        .optional()
        .isMongoId().withMessage("Invalid subSectionId. Must be a valid MongoDB ObjectId"),

    query("pageNo")
        .optional()
        .isInt({ min: 1 }).withMessage("Page must be a positive integer")
        .toInt(),

    query("limit")
        .optional()
        .isInt({ min: 1, max: 100 }).withMessage("PerPage must be between 1 and 100")
        .toInt(),

    query("search")
        .optional()
        .isString().withMessage("Search query must be a string")
        .trim(),

    query("sort")
        .optional()
        .isIn(['latest', 'oldest']).withMessage('Sort must be either "latest" or "oldest"')

];

// overview

export const createCourseOverview = [
    param("courseId")
        .notEmpty().withMessage("courseId is required")
        .isMongoId().withMessage("courseId must be a valid MongoDB ObjectId"),

    param("sectionId")
        .notEmpty().withMessage("sectionId is required")
        .isMongoId().withMessage("sectionId must be a valid MongoDB ObjectId"),

    param("subSectionId")
        .notEmpty().withMessage("subSectionId is required")
        .isMongoId().withMessage("subSectionId must be a valid MongoDB ObjectId"),

    body("overview")
        .notEmpty().withMessage("Overview is required")
        .isString().withMessage("Overview must be a string")
];

export const editCourseOverview = [
    param("overviewId")
        .notEmpty().withMessage("overviewId is required")
        .isMongoId().withMessage("overviewId must be a valid MongoDB ObjectId"),

    body("overview")
        .notEmpty().withMessage("Overview is required")
        .isString().withMessage("Overview must be a string")
];

export const deleteCourseOverview = [
    param("overviewId")
        .notEmpty().withMessage("overviewId is required")
        .isMongoId().withMessage("overviewId must be a valid MongoDB ObjectId"),
];

export const getCourseOverview = [
    param("courseId")
        .notEmpty().withMessage("courseId is required")
        .isMongoId().withMessage("courseId must be a valid MongoDB ObjectId"),

    param("sectionId")
        .notEmpty().withMessage("sectionId is required")
        .isMongoId().withMessage("sectionId must be a valid MongoDB ObjectId"),

    param("subSectionId")
        .notEmpty().withMessage("subSectionId is required")
        .isMongoId().withMessage("subSectionId must be a valid MongoDB ObjectId"),
];
