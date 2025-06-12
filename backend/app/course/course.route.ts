import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as authMiddlerware from "../common/middleware/auth.middleware";
import * as courseController from "./course.controller";
import * as courseValidation from "./course.validation";
import * as fileUploadMiddleware from "../common/middleware/fileUpload.middleware";
const router = Router();


// user course routes
router.get("/my-courses", authMiddlerware.auth, courseController.getMyCourses)

// admin course upload routes
router.post("/file", authMiddlerware.auth, authMiddlerware.isSuperAdmin, fileUploadMiddleware.validateFileUpload, catchError, courseController.uploadPublicFile)
router.get("/instructors", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseController.getIntructorList)
router.post("/", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.createCourse, catchError, courseController.createCourse)
router.put("/details/:courseId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.updateCourse, catchError, courseController.updateCourseDetails)
router.delete("/:courseId/:sectionId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.deleteSection, catchError, courseController.deleteSection)
router.delete("/:courseId/:sectionId/:subSectionId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.deleteSubSection, catchError, courseController.deleteSubSection)

// course content upload routes
router.post("/start-upload/:courseId/:sectionId/:subSectionId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.courseUpload, catchError, courseController.startUpload)
router.post("/chunk-upload/:courseId/:sectionId/:subSectionId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.uploadChunk, fileUploadMiddleware.validateChunkUpload, catchError, courseController.uploadChunk)
router.post("/complete-upload/:courseId/:sectionId/:subSectionId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.completeUpload, catchError, courseController.completeUpload)
router.get("/presigned/:courseId/:sectionId/:subSectionId", authMiddlerware.auth, courseValidation.courseContentPresignedUrl, catchError, courseController.getCourseVideoAccessUrl)


router.patch("/publish/:courseId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.publishCourse, catchError, courseController.publishCourse)
router.patch("/terminate/:courseId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.terminateCourse, catchError, courseController.terminateCourse)
router.patch("/draft/:courseId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.draftCourse, catchError, courseController.draftCourse)
router.get("/content/:courseId", authMiddlerware.auth, courseController.getCourseContent)
router.get("/published/:categoryId", courseValidation.getPublishedCourseByCategory, courseController.getPublishedCourseByCategory)
router.get("/published", courseController.getPublishedCourses)
router.post("/enquiry", courseValidation.courseEnquiry, catchError, courseController.courseEnquiry)
router.get("/enquiry", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseController.getCourseEnquiry)
router.patch("/enquiry-status/:enquiryId", authMiddlerware.auth, authMiddlerware.isSuperAdmin, courseValidation.changeEnquiryStatus, catchError, courseController.changeEnquiryStatus)
router.get("/:identifier", courseValidation.getCourseDetails, courseController.getCourseDetails)


// course qna routes
router.post("/qna", authMiddlerware.auth, courseValidation.createQna, catchError, courseController.createQna)
router.get("/qna/all", authMiddlerware.auth, courseValidation.getQnas, catchError, courseController.getQnas)
router.put("/qna/:qnaId", authMiddlerware.auth, courseValidation.editQnaQuestion, catchError, courseController.editQnaQuestion)
router.delete("/qna/:qnaId", authMiddlerware.auth, courseValidation.deleteQnaQuestion, catchError, courseController.deleteQnaQuestion)
router.post("/qna/:qnaId/answer", authMiddlerware.auth, courseValidation.addReplyToQna, catchError, courseController.addReplyToQna)
router.put("/qna/:qnaId/answers/:answerIndex", authMiddlerware.auth, courseValidation.editQnaAnswer, catchError, courseController.editQnaAnswer)
router.delete("/qna/:qnaId/answers/:answerIndex", authMiddlerware.auth, courseValidation.deleteQnaAnswer, catchError, courseController.deleteQnaAnswer)

// course rating and reviews routes
router.post("/rate/:courseId", authMiddlerware.auth, courseValidation.rateCourse, catchError, courseController.rateCourse)
router.get("/ratings/:courseId", authMiddlerware.auth, courseValidation.getRatings, catchError, courseController.getRatings)

// course notes routes

router.post("/notes", authMiddlerware.auth, courseValidation.createCourseNotes, catchError, courseController.createCourseNotes)
router.get("/notes/my", authMiddlerware.auth, courseValidation.getCourseNotes, catchError, courseController.getCourseNotes)
router.delete("/notes/:noteId", authMiddlerware.auth, courseValidation.deleteCourseNotes, catchError, courseController.deleteNotes)
router.put("/notes/:noteId", authMiddlerware.auth, courseValidation.updateCourseNotes, catchError, courseController.updateCourseNotes)


export default router;
