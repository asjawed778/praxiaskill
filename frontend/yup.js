import * as yup from "yup";

export const assignCourseSchema = yup.object().shape({
  courseId: yup.string().required("Please select a course"),
});

export const addNewUserSchema = yup.object().shape({
  name: yup
    .string()
    .required("Full name is required")
    .min(3, "Name must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address"),
  role: yup.string().required("Role is required"),
});

export const askQnaSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters long"),
  description: yup
    .string()
    .required("Description is required")
    .min(5, "Title must be at least 5 characters long"),
});

export const EnquirySchema = yup.object().shape({
  name: yup.string().required("Full Name is required"),
  education: yup.string().required("Education is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must be a number")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Email must include domain (e.g. gmail.com)"
    )
    .email("Enter a valid email address (e.g., name@example.com)"),
  interestedCourse: yup.string().required("Course selection is required"),
  whatsAppOptIn: yup.boolean().default(true),
});
