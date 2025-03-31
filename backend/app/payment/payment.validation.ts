import { body, param } from "express-validator";

export const createOrder = [
    param('courseId')
        .isEmail().withMessage("Course id is required")
        .isMongoId().withMessage("Course must be a mongdb id"),

    body("amount")
        .notEmpty().withMessage("Amount is required")
        .isNumeric().withMessage("Amount must be Numeric value"),

    body('billingAddress.country')
        .notEmpty().withMessage('Country is required')
        .isString().withMessage('Country must be a string'),

    body('billingAddress.state')
        .notEmpty().withMessage('State is required')
        .isString().withMessage('State must be a string'),

    body('billingAddress.city')
        .notEmpty().withMessage('City is required')
        .isString().withMessage('City must be a string'),

    body('billingAddress.village')
        .notEmpty().withMessage('Village is required')
        .isString().withMessage('Village must be a string'),
];