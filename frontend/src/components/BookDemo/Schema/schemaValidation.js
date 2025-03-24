import * as yup from "yup";

export const schemaValidation = yup.object().shape({
    name: yup.string().required("Full Name is required"),
    education: yup.string().required("Education is required"),
    phone: yup
      .string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    interestedCourse: yup.string().required("Course selection is required"),
    whatsAppOptIn: yup.boolean().default(false),
  });