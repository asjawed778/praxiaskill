// import { useFormContext } from "react-hook-form";

// const categories = [
//   { label: "Student", value: "student" },
//   { label: "Pass-out Student working on Innovative idea/Start-up(0-3 years)", value: "passout_student" },
//   { label: "Start-up registered with incubation", value: "startup_registration" },
// ];

// export default function Category({ setIsStartup }) {
//   const { setValue, watch,register, trigger, formState: { errors } } = useFormContext();
//   const selectedCategory = watch("category", ""); // Default to empty string

//   const handleCheckboxChange = (value) => {
//     setValue("category", value, { shouldValidate: true }); // ✅ Ensure it's a string
//     trigger("category"); // ✅ Validate immediately

//     // ✅ If "Startup Registration" is selected, show the startup step
//     setIsStartup(value === "startup_registration");
//   };

//   return (
//     <div className="">
//       <h3 className="text-md mb-4">
//       This document collects important information regarding the start-up ideas in prescribed format.
//       We request you to refer the application guideline document carefully before filling the information
//       in this document. For any additional query, contact us at info@praxiaskill.com. The queries will
//       typically be addressed in 2 working days. The information marked with * is mandatory to fill. 
//       </h3>
//       <h3 className="text-lg font-semibold"> Category of Participants</h3>
//       {categories.map(({ label, value }) => (
//         <label key={value} className="block mt-2">
//           <input
//             type="radio" // ✅ Change to radio to ensure single selection
//             {...register("category")}
//             value={value}
//             checked={selectedCategory === value}
//             onChange={() => handleCheckboxChange(value)}
//             className="mr-2"
//           />
//           {label}
//         </label>
//       ))}

//       {errors.category && (
//         <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
//       )}
//     </div>
//   );
// }

import { useFormContext } from "react-hook-form";
import RadioButtonField from "./RadioButtonField";
import StarMark from "./StarMark";

const Category = () => {
  const { formState: { errors } } = useFormContext();

  const options = [
    { 
      value: "student", 
      label: "Student" 
    },
    { 
      value: "startup", 
      label: "Passed-out Student working on Innovative idea/Start-up (0-3 years)" 
    },
    { 
      value: "incubator", 
      label: "Start-up registered with incubation centre " 
    },
  ];

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-md mb-4 text-md">
      This document collects important information regarding the start-up ideas in prescribed format.
      We request you to refer the application guideline document carefully before filling the information
      in this document. For any additional query, contact us at info@praxiaskill.com. The queries will
      typically be addressed in 2 working days. The information marked with * is mandatory to fill. 
      </h3>
      <p className="text-lg font-semibold">Select One Option <StarMark /></p>
      {options.map((option) => (
        <RadioButtonField
          key={option.value}
          name="category"
          {...option}
          // error={errors.category?.message} // ✅ Pass error only once
        />
      ))}
      {errors.category && (
        <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
      )}
    </div>
  );
};

export default Category;


