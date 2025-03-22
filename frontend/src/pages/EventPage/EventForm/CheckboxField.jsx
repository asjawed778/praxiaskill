import { useFormContext } from "react-hook-form";

const CheckboxField = ({ label, value, name }) => {
  const { register, watch, setValue, formState: { errors } } = useFormContext();
  const selectedValue = watch(name);

//   const handleCheckboxChange = () => {
//     setValue(name, value,  { shouldValidate: true });
//   };

const handleCheckboxChange = () => {
    if (selectedValue === value) {
      setValue(name, ""); // ✅ Deselect when clicked again
    } else {
      setValue(name, value, { shouldValidate: true }); // ✅ Ensure only one is selected
    }
  };

  return (
    <div>
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          {...register(name)}
          value={value}
          checked={selectedValue === value}
          onChange={handleCheckboxChange}
          className="w-5 h-5 accent-red-600 cursor-pointer"
        />
        <span className="text-lg">{label}</span>
      </label>

      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default CheckboxField;
