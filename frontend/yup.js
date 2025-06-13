import * as yup from "yup";
// import { CourseValidity } from "./src/utils/enum";
import * as Enum from "../frontend/src/utils/enum"

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

// Add course structure schema
export const courseDetailsSchema = yup.object().shape({
   title: yup.string()
   .required("Course title is required")
    .min(10, "Title must be at least 10 characters")
    .max(100, "Title must not exceed 100 characters"),
  subtitle: yup.string()
  .required("Subtitle is required")
   .min(10, "Title must be at least 10 characters")
    .max(200, "Title must not exceed 200 characters"),
  language: yup.string().required("Language selection is required"),
  category: yup.string().required("Category selection is required"),
  courseMode: yup.string().required("Please select a mode"),
  courseLevel: yup.string().required("Course level is required"),
  thumbnail: yup.string().url("Invalid URL").required("Thumbnail is required"),
  brouchure: yup.string().url("Invalid URL").required("Brochure PDF is required"),
});
export const additionalDetailsSchema = yup.object().shape({
  keypoints: yup
    .array()
    .of(yup.string().trim().required("Keypoint cannot be empty"))
    .min(1, "At least one keypoint is required"),

  tags: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.string().trim().required("Tag cannot be empty"),
      })
    )
    .min(1, "At least one tag is required"),

  description: yup.string().trim().required("Description is required"),

  duration: yup.string().trim().required("Duration is required"),
  whatWillYouLearn: yup
    .array()
    .of(yup.string().trim().required("Learning point can not be empty"))
    .min(1, "At least one learning point is required"),
});
export const courseStructureSchema = yup.object().shape({
  sections: yup
    .array()
    .of(
      yup.object().shape({
        title: yup.string().required("Section title is required"),
        description: yup.string().optional(),
        subSections: yup
          .array()
          .of(
            yup.object().shape({
              title: yup.string().required("Subsection title is required"),
            })
          )
          .min(1, "At least one subsection is required"),
      })
    )
    .min(1, "At least one section is required"),
});
export const pricingPublishSchema = yup.object().shape({
  price: yup.object().shape({
    actualPrice: yup
      .number()
      .required("Actual price is required")
      .typeError("Actual price must be a number")
      .positive("Price must be greater than zero"),
    discountPercentage: yup
      .number()
      .min(0, "Discount can't be less than 0%")
      .max(100, "Discount can't be more than 100%")
      .required("Discount is required"),
    finalPrice: yup
      .number()
      .typeError("Final price must be a number")
      .required("Final price is required"),
  }),
  validity: yup
      .string()
      .required("Course validity is required")
      .oneOf(Object.values(Enum.CourseValidity), "Invalid course validity"),
    courseStatus: yup
      .string()
      .required("Course status is required")
      .oneOf(Object.values(Enum.CourseStatus), "Invalid course status")
});

// Notes Create Schemae
export const noteCreateSchema = yup.object().shape({
  content: yup.string().required("Note content is required").min(5),
});