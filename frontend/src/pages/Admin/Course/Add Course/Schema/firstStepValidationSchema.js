import * as yup from "yup";

const firstStepValidationSchema = yup.object().shape({
  title: yup.string().required("Course title is required"),
  subtitle: yup.string().required("Subtitle is required"),
  language: yup.string().required("Language selection is required"),
  category: yup.string().required("Category selection is required"),
  instructor: yup.string().required("Instructor name is required"),
  courseMode: yup.string().required("Please select a mode"),
  thumbnail: yup.string().url("Invalid URL").required("Thumbnail is required"),
  brouchure: yup.string().url("Invalid URL").required("Brochure PDF is required"),
});

export default firstStepValidationSchema;
