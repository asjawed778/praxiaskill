
import { body, param } from 'express-validator';

export const sendSignupOTP = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string'),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isString().withMessage('Password must be a string')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
        .matches(/[\W_]/).withMessage('Password must contain at least one special character'),
];

export const verifySignupOTP = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    body('otp')
        .notEmpty().withMessage('OTP is required')
        .isString().withMessage('OTP must be a string'),
];

export const loginUser = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),

    body('password')
        .notEmpty().withMessage('password is required')
        .isString().withMessage('password must be a string')
];

export const updatePassword = [
    body('oldPassword')
        .notEmpty().withMessage('Old password is required')
        .isString().withMessage('Old password must be a string'),

    body('newPassword')
        .notEmpty().withMessage('New password is required')
        .isString().withMessage('New password must be a string')
        .isLength({ min: 8 }).withMessage('New password must be at least 8 characters long')
        .matches(/[A-Z]/).withMessage('New password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('New password must contain at least one lowercase letter')
        .matches(/[0-9]/).withMessage('New password must contain at least one number')
        .matches(/[\W_]/).withMessage('New password must contain at least one special character'),
];

export const forgotPassword = [
    body('email')
        .notEmpty().withMessage('User email is required')
        .isString().withMessage('Email must be a string')
        .isEmail().withMessage('Invalid email format'),
];

export const resetPassword = [
    param('token')
        .notEmpty().withMessage('Token is required')
        .isString().withMessage('Token must be a string'),

    body('newPassword')
        .notEmpty().withMessage('New password is required')
        .isString().withMessage('New password must be a string')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[\W_]/).withMessage('Password must contain at least one special character'),
];

export const updateUserStatus = [
    param('userId')
        .notEmpty().withMessage('User ID is required')
        .isString().withMessage('User ID must be a string'),
];




