import * as yup from "yup";

const thirdStepValidationSchema = yup.object().shape({
  sections: yup
    .array()
    .of(
      yup.object().shape({
        title: yup.string().required("Section title is required"),
        description: yup.string().required("Section description is required"),
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

export default thirdStepValidationSchema;