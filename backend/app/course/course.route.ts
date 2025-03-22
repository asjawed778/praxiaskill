
import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as authMiddlerware from "../common/middleware/auth.middleware";
import * as courseController from "./course.controller";
import * as courseValidation from "./course.validation";
import * as fileUploadMiddleware from "../common/middleware/fileUpload.middleware";
const router = Router();

router
    .post("/thumbnail", authMiddlerware.auth, authMiddlerware.isSuperAdmin, fileUploadMiddleware.thumbnailUpload, catchError, courseController.uploadPublicFile)
    .post("/brouchure",authMiddlerware.auth, authMiddlerware.isSuperAdmin, fileUploadMiddleware.brouchureUpload, fileUploadMiddleware.brouchureUpload, catchError, courseController.uploadPublicFile)
    .post("/details",authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.courseDetails, catchError, courseController.addCourseDetails)
    .put("/details/:courseId",authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.courseDetails, catchError, courseController.addCourseDetails)
    .post("/trailer-video",authMiddlerware.auth, authMiddlerware.isSuperAdmin, fileUploadMiddleware.videoUpload, catchError, courseController.uploadPublicFile)
    .put("/additional-details/:courseId",authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.AdditionalDetails, catchError, courseController.addAdditionalDetails)
    .put("/structure/:courseId",authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.courseContentStructure, catchError, courseController.addCourseStructure)
    .get("/instructors",authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseController.getIntructorList)
    .get("/all-details/:courseId", courseValidation.getFullCourseDetails, courseController.getFullCourseDetails)
    .get("/preview/:courseId",authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.coursePreview, catchError, courseController.getCoursePreview)
    .post("/publish/:courseId",authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.publishCourse, catchError, courseController.publishCourse)
    .post("/unpublish/:courseId",authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.unpublishCourse, catchError, courseController.unpublishCourse)
    .post("/terminate/:courseId",authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.terminateCourse, catchError, courseController.terminateCourse)
    .post("/draft/:courseId",authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.draftCourse, catchError, courseController.draftCourse)
    .get("/published/:categoryId", courseValidation.getPublishedCourseByCategory, courseController.getPublishedCourseByCategory)
    .post("/enquiry", courseValidation.courseEnquiry,catchError, courseController.courseEnquiry)
    .get("/enquiry",authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseController.getCourseEnquiry)
    

export default router;
