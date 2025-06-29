import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as authMiddlerware from "../common/middleware/auth.middleware";
import * as courseController from "./course.controller";
import * as courseValidation from "./course.validation";
import * as fileUploadMiddleware from "../common/middleware/fileUpload.middleware";
const router = Router();

router
    // user course routes
    .get("/my-courses", authMiddlerware.auth, courseController.getMyCourses)

    // public api for courses
    .get("/all", courseValidation.getCourses, courseController.getCourses)

    // admin course upload routes
    .post("/file", authMiddlerware.auth, authMiddlerware.isSuperAdmin, fileUploadMiddleware.validateFileUpload, catchError, courseController.uploadPublicFile)
    .get("/instructors", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseController.getIntructorList)
    .post("/", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.createCourse, catchError, courseController.createCourse)
    .put("/details/:courseId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.updateCourse, catchError, courseController.updateCourseDetails)
    .put("/curriculum/:courseId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.updateCourseCurriculum, catchError, courseController.updateCourseCurriculum)

    // route to delete section and subsection
    .delete("/:courseId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.deleteContent, catchError, courseController.deleteCourseContent)

    .patch("/status/:courseId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.updateStatus, catchError, courseController.updateStatus)


    // course content upload routes
    .post("/start-upload/:courseId/:sectionId/:subSectionId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.courseUpload, catchError, courseController.startUpload)
    .post("/chunk-upload/:courseId/:sectionId/:subSectionId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.uploadChunk, fileUploadMiddleware.validateChunkUpload, catchError, courseController.uploadChunk)
    .post("/complete-upload/:courseId/:sectionId/:subSectionId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.completeUpload, catchError, courseController.completeUpload)
    .get("/presigned/:courseId/:sectionId/:subSectionId", authMiddlerware.auth, courseValidation.courseContentPresignedUrl, catchError, courseController.getCourseVideoAccessUrl)

    .get("/content/:courseId", authMiddlerware.auth, courseController.getCourseContent)

    // enquiry routes
    .post("/enquiry", courseValidation.courseEnquiry, catchError, courseController.courseEnquiry)
    .get("/enquiry", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.getCourseEnquiry, catchError, courseController.getCourseEnquiry)
    .patch("/enquiry-status/:enquiryId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.changeEnquiryStatus, catchError, courseController.changeEnquiryStatus)


    .get("/:identifier", courseValidation.getCourseDetails, courseController.getCourseDetails)

    // course qna routes
    .post("/qna", authMiddlerware.auth, courseValidation.createQna, catchError, courseController.createQna)
    .get("/qna/all", authMiddlerware.auth, courseValidation.getQnas, catchError, courseController.getQnas)
    .put("/qna/:qnaId", authMiddlerware.auth, courseValidation.editQnaQuestion, catchError, courseController.editQnaQuestion)
    .delete("/qna/:qnaId", authMiddlerware.auth, courseValidation.deleteQnaQuestion, catchError, courseController.deleteQnaQuestion)
    .post("/qna/:qnaId/answer", authMiddlerware.auth, courseValidation.addReplyToQna, catchError, courseController.addReplyToQna)
    .put("/qna/:qnaId/answers/:answerIndex", authMiddlerware.auth, courseValidation.editQnaAnswer, catchError, courseController.editQnaAnswer)
    .delete("/qna/:qnaId/answers/:answerIndex", authMiddlerware.auth, courseValidation.deleteQnaAnswer, catchError, courseController.deleteQnaAnswer)

    // course rating and reviews routes
    .post("/rate/:courseId", authMiddlerware.auth, courseValidation.rateCourse, catchError, courseController.rateCourse)
    .get("/ratings/:courseId", authMiddlerware.auth, courseValidation.getRatings, catchError, courseController.getRatings)

    // course notes routes
    .post("/notes", authMiddlerware.auth, courseValidation.createCourseNotes, catchError, courseController.createCourseNotes)
    .get("/notes/my", authMiddlerware.auth, courseValidation.getCourseNotes, catchError, courseController.getCourseNotes)
    .delete("/notes/:noteId", authMiddlerware.auth, courseValidation.deleteCourseNotes, catchError, courseController.deleteNotes)
    .put("/notes/:noteId", authMiddlerware.auth, courseValidation.updateCourseNotes, catchError, courseController.updateCourseNotes)

    // course overview routes
    .post("/overview/:courseId/:sectionId/:subSectionId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.createCourseOverview, catchError, courseController.createCourseOverview)
    .put("/overview/:overviewId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.editCourseOverview, catchError, courseController.editCourseOverview)
    .delete("/overview/:overviewId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.deleteCourseOverview, catchError, courseController.deleteCourseOverview)
    .get("/overview/:courseId/:sectionId/:subSectionId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.getCourseOverview, catchError, courseController.getCourseOverview)

    // course announcements routes
    .post("/announcement/:courseId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.createCourseAnnouncement, catchError, courseController.createCourseAnnouncement)
    .put("/announcement/:announcementId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.updateCourseAnnouncement, catchError, courseController.updateCourseAnnouncement)
    .delete("/announcement/:announcementId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.deleteCourseAnnouncement, catchError, courseController.deleteCourseAnnouncement)
    .get("/announcement/:courseId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.getCourseAnnouncement, catchError, courseController.getCourseAnnouncement)


export default router;
