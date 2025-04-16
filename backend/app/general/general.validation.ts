import { body } from "express-validator";

export const contactUs = [
    body("name")
        .notEmpty().withMessage("Name is required"),

    body("email")
        .isEmail().withMessage("Email is required"),

    body("message")
        .notEmpty().withMessage("Message is required"),

    body("subject")
        .notEmpty().withMessage("Subject is required"),
];