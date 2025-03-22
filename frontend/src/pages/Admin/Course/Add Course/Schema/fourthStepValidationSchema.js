import * as yup from "yup";

export const fourthStepValidationSchema = yup.object().shape({
  sections: yup
    .array()
    .of(
      yup.object().shape({
        title: yup.string().required("Section title is required"),
        description: yup.string().required("Section description is required"),
        subsections: yup
          .array()
          .of(
            yup.object().shape({
              title: yup.string().required("Subsection title is required"),
              image: yup.mixed().required("Image is required"),
              pdf: yup.mixed().required("PDF is required"),
              video: yup.mixed().required("Video is required"),
            })
          )
          .min(1, "At least one subsection is required"),
      })
    )
    .min(1, "At least one section is required"),
});
