import * as yup from "yup";
import * as Enum from "@/utils/enum"

const fifthStepValidationSchema = yup.object().shape({
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

export default fifthStepValidationSchema;




// import * as yup from "yup";

// const fifthStepValidationSchema = yup.object().shape({
//   actualPrice: yup
//     .number()
//     .typeError("Actual price must be a number")
//     .positive("Price must be greater than zero")
//     .required("Actual price is required"),
//   discount: yup
//     .number()
//     .min(0, "Discount can't be less than 0%")
//     .max(100, "Discount can't be more than 100%")
//     .required(),
//   courseAction: yup
//     .string()
//     .oneOf(["published", "unpublished", "preview"], "Invalid option")
//     .required("Course action is required"),
// });

// export default fifthStepValidationSchema;
