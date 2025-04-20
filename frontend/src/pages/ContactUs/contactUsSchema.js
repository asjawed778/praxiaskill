import * as yup from 'yup';

export const contactUsSchema = yup.object({
    name: yup.string().required("Name is required"),
    subject: yup.string().required("Subject is required"),
    email: yup
        .string()
        .email("Invalid email format")
        .matches(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          "Email must include domain (e.g. gmail.com)"
        )
        .required("Email is required"),
    message: yup
        .string()
        .min(10, "Message must be at least 10 characters")
        .required("Message is required"),
});
