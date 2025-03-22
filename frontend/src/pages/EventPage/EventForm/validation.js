import * as yup from "yup";

export const categorySchema = yup.object().shape({
  category: yup.string().required("Select atleast one category"),
});

export const teamSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  institution: yup.string().required("Name of Institution is required"),
  teamMembers: yup
  .array()
  .of(
    yup.object().shape({
      name: yup.string().required("Team member name is required"),
      education: yup.string().required("Education is required"),
      additionalAchievement: yup.string().nullable(),
      pastExperience: yup.string().nullable(),
    })
  )
  .min(1, "At least one team member is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  district: yup.string().required("District is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  state: yup.string().required("State is required"),
  number: yup
    .string()
    .required("Contact number is required")
    .matches(/^\d+$/, "Contact number must contain only digits")
    .min(10, "Contact number must be at least 10 digits")
    .max(10, "Contact number must not exceed 10 digits"),
});

export const companySchema = yup.object().shape({
  // companyName: yup.string().required("Company name is required"),
  // foundedYear: yup
  //   .number()
  //   .typeError("Year must be a number")
  //   .min(1900, "Enter a valid year")
  //   .max(new Date().getFullYear(), "Year cannot be in the future"),
});

export const ideaSchema = yup.object().shape({
  ideaStage: yup.string().required("Select atleast one category"),
  ideaSector: yup.string().required("Select atleast one category"),
  businessModel: yup.string().required("Select atleast one category"),
  ventureType: yup.string().required("Select atleast one category"),
  explainIdea: yup.string().required("This field is required"),
  explainObjective: yup.string().required("This field is required"),
  explainProduct: yup.string().required("This field is required"),
  explainPainPoint: yup.string().required("This field is required"),
  explainBusiness: yup.string().required("This field is required"),
  explainMarket: yup.string().required("This field is required"),
  explainCompetitor: yup.string().required("This field is required"),
  explainVenture: yup.string().required("This field is required"),
  explainManagement: yup.string().required("This field is required"),
  explainSocial: yup.string().required("This field is required"),
});

export const investmentSchema = yup.object().shape({
  investmentDetails: yup.string().required("Select atleast one Field"),
  otherDetails: yup.string().required("This field is require"),
  fundingReceived: yup.string().required("Select atleast one Field"),
  fundingAmount: yup.string().required("This field is require"),
  fundingSource: yup.string().required("Select atleast one Field"),
  requirement2025: yup.string().required("This field is require"),
  requirement2026: yup.string().required("This field is require"),
});
