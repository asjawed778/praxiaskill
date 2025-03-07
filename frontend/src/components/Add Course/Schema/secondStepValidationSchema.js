import * as yup from "yup";

const FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

const secondStepValidationSchema = yup.object().shape({
  keypoints: yup
    .array()
    .of(yup.string().trim().required("Keypoint cannot be empty"))
    .min(1, "At least one keypoint is required"),

  tags: yup
  .array()
  .of(yup.object().shape({ value: yup.string().trim().required("Tag cannot be empty") }))
  .min(1, "At least one tag is required"),


  description: yup.string().trim().required("Description is required"),

  duration: yup.string().trim().required("Duration is required"),

  lecture: yup.string().trim().required("Lecture is required"),

  // trailer_video: yup
  //   .mixed()
  //   .required("Trailer Video is required")
  //   .test("fileSize", "File size must be less than 5MB", (value) => {
  //     return value && value.size <= FILE_SIZE;
  //   }),
});

export default secondStepValidationSchema;
