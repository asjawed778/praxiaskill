import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button/Button";
import CourseDetails from "./Add Course/AdditionalDetails";
import CourseFirstStep from "./Add Course/CourseFirstStep";
import CourseStructure from "./Add Course/CourseStructure";
import CourseContent from "./Add Course/CourseContent";
import Pricing from "./Add Course/Pricing";

const AddCourse = () => {
  const [courseId, setCourseId] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm();

  const inputRef = useRef(null);
  const handleDobFocus = () => {
    if (inputRef.current) {
      inputRef.current.showPicker(); // Native API to show the picker
    }
  };

  const onSubmit = (data) => {
    console.log("Form data: ", data);
  };

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className=" py-4 md:p-4 md:w-full w-[97vw] mx-auto flex flex-col gap-6">
      <div className="bg-[#D0DAF1] rounded-lg text-xs md:text-sm flex justify-between items-center pr-3">
        <div
        onClick={() => setCurrentStep(1)}
          className={`${
            currentStep == 1 &&
            "bg-[var(--color-primary)] text-white rounded-lg"
          } px-4 py-2 cursor-pointer`}
        >
          Course Details
        </div>
        <div
          onClick={() => setCurrentStep(2)}
          className={`${
            currentStep == 2 &&
            " bg-[var(--color-primary)] text-white rounded-lg"
          } px-4 py-2 cursor-pointer`}
        >
          Additional Details
        </div>
        <div
        onClick={() => setCurrentStep(3)}
          className={`${
            currentStep == 3 &&
            "bg-[var(--color-primary)] text-white rounded-lg"
          } px-4 py-2 cursor-pointer`}
        >
          Course Structure
        </div>
        {/* <div
          className={`${
            currentStep == 4 &&
            "cursor-pointer bg-[var(--color-primary)] text-white rounded-lg"
          } px-4 py-2`}
        >
          Course Content
        </div> */}
        <div
        onClick={() => setCurrentStep(4)}
          className={`${
            currentStep == 4 &&
            " bg-[var(--color-primary)] text-white rounded-lg"
          } px-4 py-2 cursor-pointer`}
        >
          Pricing & Publish
        </div>
      </div>

      <div className="bg-[#F5F5F5] rounded-lg p-2 w-full">
        {currentStep === 1 && (
          <div>
            <CourseFirstStep
              currentStep={currentStep}
              handleNext={handleNext}
              handlePrev={handlePrev}
              setCourseId={setCourseId}
            />
          </div>
        )}
        {currentStep === 2 && (
          <CourseDetails
            currentStep={currentStep}
            handleNext={handleNext}
            handlePrev={handlePrev}
            courseId={courseId}
          />
        )}
        {currentStep === 3 && (
          <CourseStructure
            currentStep={currentStep}
            handleNext={handleNext}
            handlePrev={handlePrev}
            courseId={courseId}
          />
        )}
        {/* {currentStep === 4 && (
          <CourseContent
            currentStep={currentStep}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        )} */}
        {currentStep === 4 && (
          <Pricing
            currentStep={currentStep}
            handleNext={handleNext}
            handlePrev={handlePrev}
            courseId={courseId}
          />
        )}
      </div>
    </div>
  );
};

export default AddCourse;
