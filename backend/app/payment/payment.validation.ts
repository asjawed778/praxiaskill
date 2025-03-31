import { body, param } from "express-validator";

export const createOrder = [
    param('courseId')
        .notEmpty().withMessage("Course id is required")
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

export const verifyPayment = [
    param('courseId')
        .notEmpty().withMessage("Course id is required")
        .isMongoId().withMessage("Course must be a mongdb id"),

    body('razorpay_order_id')
        .notEmpty().withMessage("razorpay_order_id is required")
        .isString().withMessage("razorpay_order_id must be a string"),

    body('razorpay_payment_id')
        .notEmpty().withMessage("razorpay_payment_id is required")
        .isString().withMessage("razorpay_payment_id must be a string"),

    body('razorpay_signature')
        .notEmpty().withMessage("razorpay_signature is required")
        .isString().withMessage("razorpay_signature must be a string"),
]