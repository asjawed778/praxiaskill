import { useMemo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
// We use manual validation so we don’t pass a static resolver here.
import CourseFirstStep from "./Add Course/CourseFirstStep";
import AdditionalDetails from "./Add Course/AdditionalDetails";
import CourseStructure from "./Add Course/CourseStructure";
import Pricing from "./Add Course/Pricing";
import { yupResolver } from "@hookform/resolvers/yup";

// Import each step’s Yup validation schema
import firstStepValidationSchema from "./Add Course/Schema/firstStepValidationSchema";
import secondStepValidationSchema from "./Add Course/Schema/secondStepValidationSchema";
import thirdStepValidationSchema from "./Add Course/Schema/thirdStepValidationSchema";
import fifthStepValidationSchema from "./Add Course/Schema/fifthStepValidationSchema";
import { useUploadCourseMutation } from "../../../services/course.api";

// Create an array of schemas for step-wise validation
const validationSchemas = [
  firstStepValidationSchema,
  secondStepValidationSchema,
  thirdStepValidationSchema,
  fifthStepValidationSchema,
];

const AddCourse = () => {
  const [uploadCourse , {isFetching, errors}] = useUploadCourseMutation()
  const [currentStep, setCurrentStep] = useState(0);

  const resolver = useMemo(() => {
    switch (currentStep) {
      case 0:
        return yupResolver(firstStepValidationSchema);
      case 1:
        return yupResolver(secondStepValidationSchema);
      case 2:
        return yupResolver(thirdStepValidationSchema);
      case 3:
        return yupResolver(fifthStepValidationSchema);
      default:
        return undefined;
    }
  }, [currentStep]);

  const methods = useForm({
    resolver,
    mode: "onChange",
    defaultValues: {
      title: "",
      subtitle: "",
      language: "",
      category: "",
      instructor: "",
      courseMode: "",
      thumbnail: "",
      keypoints: [""],
      tags: [],
      description: "",
      duration: "",
      totalLectures: "",
      sections: [{ title: "", description: "", subSections: [{ title: "" }] }],
      price: {
        actualPrice: "",
        discountPercentage: 0,
        finalPrice: 0,
      },
      courseAction: "published",
    },
  });

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (isValid && currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (formData) => {
    const { tags } = formData;
    const newTags = tags.map((tag) => tag.value);
    const data = { ...formData, tags: newTags };
    console.log("Final Form Data:", data);
    const result = await uploadCourse(data);
    console.log("Result", result)
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="py-4 md:p-4 md:w-full w-[97vw] mx-auto flex flex-col gap-6"
      >
        {/* Step Navigation */}
        <div className="bg-[#D0DAF1] rounded-lg text-xs md:text-sm flex justify-between items-center pr-3">
          <div
            onClick={() => setCurrentStep(0)}
            className={`px-4 py-2 cursor-pointer ${
              currentStep === 0 &&
              "bg-[var(--color-primary)] text-white rounded-lg"
            }`}
          >
            Course Details
          </div>
          <div
            onClick={() => setCurrentStep(1)}
            className={`px-4 py-2 cursor-pointer ${
              currentStep === 1 &&
              "bg-[var(--color-primary)] text-white rounded-lg"
            }`}
          >
            Additional Details
          </div>
          <div
            onClick={() => setCurrentStep(2)}
            className={`px-4 py-2 cursor-pointer ${
              currentStep === 2 &&
              "bg-[var(--color-primary)] text-white rounded-lg"
            }`}
          >
            Course Structure
          </div>
          <div
            onClick={() => setCurrentStep(3)}
            className={`px-4 py-2 cursor-pointer ${
              currentStep === 3 &&
              "bg-[var(--color-primary)] text-white rounded-lg"
            }`}
          >
            Pricing & Publish
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-[#F5F5F5] rounded-lg p-2 w-full">
          {currentStep === 0 && <CourseFirstStep handleNext={handleNext} />}
          {currentStep === 1 && (
            <AdditionalDetails
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
          )}
          {currentStep === 2 && (
            <CourseStructure handleNext={handleNext} handlePrev={handlePrev} />
          )}
          {currentStep === 3 && <Pricing handlePrev={handlePrev} />}
        </div>
      </form>
    </FormProvider>
  );
};

export default AddCourse;