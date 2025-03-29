
import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as authMiddlerware from "../common/middleware/auth.middleware";
import * as courseController from "./course.controller";
import * as courseValidation from "./course.validation";
import * as fileUploadMiddleware from "../common/middleware/fileUpload.middleware";
const router = Router();

router
    .post("/thumbnail", authMiddlerware.auth, authMiddlerware.isSuperAdmin, fileUploadMiddleware.thumbnailUpload, catchError, courseController.uploadPublicFile)
    .post("/brouchure", authMiddlerware.auth, authMiddlerware.isSuperAdmin, fileUploadMiddleware.brouchureUpload, fileUploadMiddleware.brouchureUpload, catchError, courseController.uploadPublicFile)
    .post("/trailer-video", authMiddlerware.auth, authMiddlerware.isSuperAdmin, fileUploadMiddleware.videoUpload, catchError, courseController.uploadPublicFile)
    .get("/instructors", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseController.getIntructorList)
    .post("/", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.createCourse, catchError, courseController.createCourse)
    // .put("/:courseId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.updateCourse, catchError, courseController.updateCourse)
    .delete("/:courseId/:sectionId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.deleteSection, catchError, courseController.deleteSection)
    .delete("/:courseId/:sectionId/:subSectionId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.deleteSubSection, catchError, courseController.deleteSubSection)


    .patch("/publish/:courseId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.publishCourse, catchError, courseController.publishCourse)
    .patch("/terminate/:courseId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.terminateCourse, catchError, courseController.terminateCourse)
    .patch("/draft/:courseId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.draftCourse, catchError, courseController.draftCourse)
    .get("/content/:courseId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseController.getCourseContent)
    .get("/published/:categoryId", courseValidation.getPublishedCourseByCategory, courseController.getPublishedCourseByCategory)
    .get("/published", courseController.getPublishedCourses)
    .post("/enquiry", courseValidation.courseEnquiry, catchError, courseController.courseEnquiry)
    .get("/enquiry", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseController.getCourseEnquiry)
    .patch("/enquiry-status/:enquiryId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.changeEnquiryStatus, catchError, courseController.changeEnquiryStatus)
    .get("/:courseId", courseValidation.getCourseDetails, courseController.getCourseDetails)

    .post("/start-upload/:courseId/:sectionId/:subSectionId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.courseUpload, catchError, courseController.startUpload)
    .post("/chunk-upload/:courseId/:sectionId/:subSectionId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.uploadChunk, fileUploadMiddleware.validateChunkUpload, catchError, courseController.uploadChunk)
    .post("/complete-upload/:courseId/:sectionId/:subSectionId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.completeUpload, catchError, courseController.completeUpload)
    .get("/presigned/:courseId/:sectionId/:subSectionId",authMiddlerware.auth, authMiddlerware.isUser,courseValidation.courseContentPresignedUrl, catchError, courseController.getCourseVideoAccessUrl)



export default router;
