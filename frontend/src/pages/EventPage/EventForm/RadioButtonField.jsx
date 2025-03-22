import { useFormContext } from "react-hook-form";
import { FiCheck } from "react-icons/fi";

const RadioButtonField = ({ label, value, name, error }) => {
  const { register, watch } = useFormContext();
  const selectedValue = watch(name); // Get the selected value

  return (
    <div className="flex flex-wrap items-center space-x-2 sm:space-x-3">
      {/* Label Wrapper - Clickable */}
      <label className="flex items-start space-x-2 cursor-pointer sm:w-auto">
        {/* Square Box */}
        <span
          className={`min-w-[1.25rem] h-5 border rounded flex items-center justify-center transition-colors duration-150 ease-in-out
          ${selectedValue === value ? "bg-red-600 border-red-600 text-white" : "bg-white border-gray-500"}`}
        >
          <input
            type="radio"
            {...register(name)}
            value={value}
            className="hidden"
          />
          {selectedValue === value && <FiCheck size={14} />}
        </span>

        {/* Label Text */}
        <span className="text-sm sm:text-base font-medium leading-tight break-words">
          {label}
        </span>
      </label>

      {/* Show error message once below all options */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default RadioButtonField;
