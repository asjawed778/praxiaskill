import * as yup from "yup";

const addCategorySchemaValidation = yup.object().shape({
  name: yup
    .string()
    .required("Name is required"),
    
  description: yup
    .string()
    .required("Description is required"),
});

export default addCategorySchemaValidation;
