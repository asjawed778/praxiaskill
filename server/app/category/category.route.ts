import express from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as authMiddlerware from "../common/middleware/auth.middleware";
import * as categoryController from "./category.controller";
import * as categoryValidation from "./category.validation";

const router = express.Router();

router
    .post('/', authMiddlerware.auth, authMiddlerware.isSuperAdmin, categoryValidation.createCourseCategory, catchError, categoryController.createCourseCategory)
    .put('/:categoryId', authMiddlerware.auth, authMiddlerware.isSuperAdmin, categoryValidation.updateCourseCategory, catchError, categoryController.updateCourseCategory)
    .delete('/:categoryId', authMiddlerware.auth, authMiddlerware.isSuperAdmin, categoryValidation.deleteCourseCategory, catchError, categoryController.deleteCourseCategory)
    .get('/', categoryController.getAllCourseCategory)
    .get('/:categoryId', categoryValidation.getCourseCategoryById, catchError, categoryController.getCourseCategoryById)


export default router;