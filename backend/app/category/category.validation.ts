import { body, param } from 'express-validator';

export const createCourseCategory = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string'),

    body('description')
        .notEmpty().withMessage('Description is required')
        .isString().withMessage('Description must be a string'),
];

export const updateCourseCategory = [
    param('categoryId')
        .notEmpty().withMessage('Category ID is required')
        .isMongoId().withMessage('Invalid category ID'),
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string'),
    body('description')
        .notEmpty().withMessage('Description is required')
        .isString().withMessage('Description must be a string'),
];

export const deleteCourseCategory = [
    param('categoryId')
        .notEmpty().withMessage('Category ID is required')
        .isMongoId().withMessage('Invalid category ID'),
];

export const getCourseCategoryById = [
    param('categoryId')
        .notEmpty().withMessage('Category ID is required')
        .isMongoId().withMessage('Invalid category ID'),
];