
import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as authMiddlerware from "../common/middleware/auth.middleware";
import * as courseController from "./course.controller";
import * as courseValidation from "./course.validation";
import * as fileUploadMiddleware from "../common/middleware/fileUpload.middleware";
const router = Router();

router
    .get("/my-courses", authMiddlerware.auth, courseController.getMyCourses)
    .post("/thumbnail", authMiddlerware.auth, authMiddlerware.isSuperAdmin, fileUploadMiddleware.thumbnailUpload, catchError, courseController.uploadPublicFile)
    .post("/brouchure", authMiddlerware.auth, authMiddlerware.isSuperAdmin, fileUploadMiddleware.brouchureUpload, fileUploadMiddleware.brouchureUpload, catchError, courseController.uploadPublicFile)
    .post("/trailer-video", authMiddlerware.auth, authMiddlerware.isSuperAdmin, fileUploadMiddleware.videoUpload, catchError, courseController.uploadPublicFile)
    .get("/instructors", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseController.getIntructorList)
    .post("/", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.createCourse, catchError, courseController.createCourse)
    .put("/details/:courseId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.updateCourse, catchError, courseController.updateCourseDetails)
    .delete("/:courseId/:sectionId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.deleteSection, catchError, courseController.deleteSection)
    .delete("/:courseId/:sectionId/:subSectionId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.deleteSubSection, catchError, courseController.deleteSubSection)


    .patch("/publish/:courseId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.publishCourse, catchError, courseController.publishCourse)
    .patch("/terminate/:courseId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.terminateCourse, catchError, courseController.terminateCourse)
    .patch("/draft/:courseId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.draftCourse, catchError, courseController.draftCourse)
    .get("/content/:courseId", authMiddlerware.auth, courseController.getCourseContent)
    .get("/published/:categoryId", courseValidation.getPublishedCourseByCategory, courseController.getPublishedCourseByCategory)
    .get("/published", courseController.getPublishedCourses)
    .post("/enquiry", courseValidation.courseEnquiry, catchError, courseController.courseEnquiry)
    .get("/enquiry", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseController.getCourseEnquiry)
    .patch("/enquiry-status/:enquiryId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.changeEnquiryStatus, catchError, courseController.changeEnquiryStatus)
    .get("/:identifier", courseValidation.getCourseDetails, courseController.getCourseDetails)

    .post("/start-upload/:courseId/:sectionId/:subSectionId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.courseUpload, catchError, courseController.startUpload)
    .post("/chunk-upload/:courseId/:sectionId/:subSectionId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.uploadChunk, fileUploadMiddleware.validateChunkUpload, catchError, courseController.uploadChunk)
    .post("/complete-upload/:courseId/:sectionId/:subSectionId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.completeUpload, catchError, courseController.completeUpload)
    .get("/presigned/:courseId/:sectionId/:subSectionId", authMiddlerware.auth, courseValidation.courseContentPresignedUrl, catchError, courseController.getCourseVideoAccessUrl)


    .post("/qna", authMiddlerware.auth, courseValidation.createQna, catchError, courseController.createQna)
    .get("/qna/all", authMiddlerware.auth, courseValidation.getQnas, catchError, courseController.getQnas)
    .put("/qna/:qnaId", authMiddlerware.auth, courseValidation.editQnaQuestion, catchError, courseController.editQnaQuestion)
    .delete("/qna/:qnaId", authMiddlerware.auth, courseValidation.deleteQnaQuestion, catchError, courseController.deleteQnaQuestion)
    .post("/qna/:qnaId/answer", authMiddlerware.auth, courseValidation.addReplyToQna, catchError, courseController.addReplyToQna)
    .put("/qna/:qnaId/answers/:answerIndex", authMiddlerware.auth, courseValidation.editQnaAnswer, catchError, courseController.editQnaAnswer)
    .delete("/qna/:qnaId/answers/:answerIndex", authMiddlerware.auth, courseValidation.deleteQnaAnswer, catchError, courseController.deleteQnaAnswer)

    .post("/rate/:courseId", authMiddlerware.auth, courseValidation.rateCourse, catchError, courseController.rateCourse)
    .get("/ratings/:courseId", authMiddlerware.auth, courseValidation.getRatings, catchError, courseController.getRatings)

export default router;
