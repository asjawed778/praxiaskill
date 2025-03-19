import { useFormContext } from "react-hook-form";
import { FiCheck } from "react-icons/fi";

const RadioButtonField = ({ label, value, name, error }) => {
  const { register, watch } = useFormContext();
  const selectedValue = watch(name); // Get the selected value

  return (
    <div className="flex items-center ">
      {/* Label Wrapper - Only Square & Text Clickable */}
      <label className="flex items-center space-x-2 cursor-pointer">
        {/* Square Box */}
        <span
          className={` w-5 h-5 border rounded transition-colors duration-100 ease-in-out
          ${selectedValue === value ? "bg-red-600 border-red-600 text-white" : "bg-white border-gray-500"}`}
        >
          <input
            type="radio"
            {...register(name)}
            value={value}
            className="hidden"
          />
          {selectedValue === value && <FiCheck size={16} />}
        </span>

        {/* Label Text - Clickable */}
        <span className="text-lg font-medium">{label}</span>
      </label>
      {/* Show error message only once below all options */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default RadioButtonField;
