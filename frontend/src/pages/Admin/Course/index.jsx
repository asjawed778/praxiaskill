import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
// We use manual validation so we don’t pass a static resolver here.
import CourseFirstStep from "./Add Course/CourseFirstStep";
import AdditionalDetails from "./Add Course/AdditionalDetails";
import CourseStructure from "./Add Course/CourseStructure";
import Pricing from "./Add Course/Pricing";

// Import each step’s Yup validation schema
import firstStepValidationSchema from "./Add Course/Schema/firstStepValidationSchema";
import secondStepValidationSchema from "./Add Course/Schema/secondStepValidationSchema";
import thirdStepValidationSchema from "./Add Course/Schema/thirdStepValidationSchema";
import fifthStepValidationSchema from "./Add Course/Schema/fifthStepValidationSchema";

// Create an array of schemas for step-wise validation
const validationSchemas = [
  firstStepValidationSchema,
  secondStepValidationSchema,
  thirdStepValidationSchema,
  fifthStepValidationSchema,
];

const AddCourse = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm({
    defaultValues: {
      // First step fields
      title: "",
      subtitle: "",
      language: "",
      category: "",
      instructor: "",
      courseMode: "",
      thumbnail: "",
      // Second step fields
      keypoints: [""],
      tags: [],
      description: "",
      duration: "",
      lecture: "",
      // Third step fields
      sections: [{ title: "", description: "", subSections: [{ title: "" }] }],
      // Fifth step fields
      actualPrice: "",
      discount: 0,
      courseAction: "published",
    },
  });

  // On Next, we run validation for the current step using its schema.
  const handleNext = async () => {
    try {
      await validationSchemas[currentStep].validate(methods.getValues(), {
        abortEarly: false,
      });
      if (currentStep < 3) {
        setCurrentStep((prev) => prev + 1);
      }
    } catch (err) {
      // If there are validation errors, set them into RHF
      
      if (err.inner) {
        err.inner.forEach((validationError) => {
          methods.setError(validationError.path, {
            message: validationError.message,
          });
        });
      }
    }finally{
      console.log("Errors", methods.formState.errors)
    }
  } 

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const validateLastStep = async () => {
    await handleNext();
    return methods.formState.errors.actualPrice
  };

  const onSubmit = async (data) => {
    if (await validateLastStep()) return;
    console.log("Final Form Data:", data);
    // Make your final API call here using the single collected form data.
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

        {/* Navigation Buttons */}
        {/* <div className="flex justify-between mt-4">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Previous
            </button>
          )}
          {currentStep < validationSchemas.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Submit
            </button>
          )}
        </div> */}
      </form>
    </FormProvider>
  );
};

export default AddCourse;

// import { useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import Button from "../../../components/Button/Button";
// import CourseDetails from "./Add Course/AdditionalDetails";
// import CourseFirstStep from "./Add Course/CourseFirstStep";
// import CourseStructure from "./Add Course/CourseStructure";
// import CourseContent from "./Add Course/CourseContent";
// import Pricing from "./Add Course/Pricing";

// const AddCourse = () => {
//   const [courseId, setCourseId] = useState(null);
//   const [currentStep, setCurrentStep] = useState(1);
//   const {
//     register,
//     handleSubmit,
//     reset,
//     trigger,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     console.log("Form data: ", data);
//   };

//   const handleNext = async () => {
//     const isValid = await trigger();
//     if (isValid) {
//       setCurrentStep((prev) => prev + 1);
//     }
//   };

//   const handlePrev = () => {
//     setCurrentStep((prev) => prev - 1);
//   };

//   return (
//     <div className=" py-4 md:p-4 md:w-full w-[97vw] mx-auto flex flex-col gap-6">
//       <div className="bg-[#D0DAF1] rounded-lg text-xs md:text-sm flex justify-between items-center pr-3">
//         <div
//         onClick={() => setCurrentStep(1)}
//           className={`${
//             currentStep == 1 &&
//             "bg-[var(--color-primary)] text-white rounded-lg"
//           } px-4 py-2 cursor-pointer`}
//         >
//           Course Details
//         </div>
//         <div
//           onClick={() => setCurrentStep(2)}
//           className={`${
//             currentStep == 2 &&
//             " bg-[var(--color-primary)] text-white rounded-lg"
//           } px-4 py-2 cursor-pointer`}
//         >
//           Additional Details
//         </div>
//         <div
//         onClick={() => setCurrentStep(3)}
//           className={`${
//             currentStep == 3 &&
//             "bg-[var(--color-primary)] text-white rounded-lg"
//           } px-4 py-2 cursor-pointer`}
//         >
//           Course Structure
//         </div>
//         <div
//         onClick={() => setCurrentStep(4)}
//           className={`${
//             currentStep == 4 &&
//             " bg-[var(--color-primary)] text-white rounded-lg"
//           } px-4 py-2 cursor-pointer`}
//         >
//           Pricing & Publish
//         </div>
//       </div>

//       <div className="bg-[#F5F5F5] rounded-lg p-2 w-full">
//         {currentStep === 1 && (
//           <div>
//             <CourseFirstStep
//               currentStep={currentStep}
//               handleNext={handleNext}
//               handlePrev={handlePrev}
//               setCourseId={setCourseId}
//             />
//           </div>
//         )}
//         {currentStep === 2 && (
//           <CourseDetails
//             currentStep={currentStep}
//             handleNext={handleNext}
//             handlePrev={handlePrev}
//             courseId={courseId}
//           />
//         )}
//         {currentStep === 3 && (
//           <CourseStructure
//             currentStep={currentStep}
//             handleNext={handleNext}
//             handlePrev={handlePrev}
//             courseId={courseId}
//           />
//         )}
//         {currentStep === 4 && (
//           <Pricing
//             currentStep={currentStep}
//             handleNext={handleNext}
//             handlePrev={handlePrev}
//             courseId={courseId}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddCourse;
