import * as yup from "yup";

const firstStepValidationSchema = yup.object().shape({
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
  // instructor: yup.string().required("Instructor name is required"),
  courseMode: yup.string().required("Please select a mode"),
  courseLevel: yup.string().required("Course level is required"),
  thumbnail: yup.string().url("Invalid URL").required("Thumbnail is required"),
  brouchure: yup.string().url("Invalid URL").required("Brochure PDF is required"),
});

export default firstStepValidationSchema;
