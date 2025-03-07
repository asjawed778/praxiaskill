import * as yup from "yup";

export const signupSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .max(50, "Name must not exceed 50 characters"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters")
    .matches(/[A-Z]/, "Password must have an uppercase letter")
    .matches(/[a-z]/, "Password must have a lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[\W_]/, "Password must contain at least one special character")
    .matches(/^\S*$/, "Password must not contain spaces"),
});

export const signinSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters")
    .matches(/[A-Z]/, "Password must have an uppercase letter")
    .matches(/[a-z]/, "Password must have a lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[\W_]/, "Password must contain at least one special character")
    .matches(/^\S*$/, "Password must not contain spaces"),
});

export const resetPasswordSchema = yup.object().shape({
  newPassword: yup
  .string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password must not exceed 100 characters")
  .matches(/[A-Z]/, "Password must have at least one uppercase letter")
  .matches(/[a-z]/, "Password must have at least one lowercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(/[\W_]/, "Password must contain at least one special character")
  .matches(/^\S*$/, "Password must not contain spaces"),
});