import { useFormContext } from "react-hook-form";
import RadioButtonField from "./RadioButtonField";
import StarMark from "./StarMark";

const Category = () => {
  const { formState: { errors } } = useFormContext();

  const options = [
    { value: "student", label: "Student" },
    { value: "startup", label: "Passed-out Student working on Innovative idea/Start-up (0-3 years)" },
    { value: "incubator", label: "Start-up registered with incubation centre" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Intro Text */}
      <h3 className="text-md sm:text-lg leading-relaxed">
        This document collects important information regarding start-up ideas in a prescribed format.
        Please refer to the application guideline before filling out the form. For queries, contact
        <span className="font-semibold text-red-600"> info@praxiaskill.com</span>. Queries are typically addressed within 2 working days.
        Fields marked with <StarMark /> are mandatory.
      </h3>

      {/* Category Selection */}
      <p className="mt-6 text-lg font-semibold">Select One Option <StarMark /></p>
      
      <div className="flex flex-col space-y-3">
        {options.map((option) => (
          <RadioButtonField key={option.value} name="category" {...option} />
        ))}
      </div>

      {/* Error Message */}
      {errors.category && (
        <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
      )}
    </div>
  );
};

export default Category;



