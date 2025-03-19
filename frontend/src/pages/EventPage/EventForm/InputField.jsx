import { useFormContext } from "react-hook-form";
import StarMark from "./StarMark";

const InputField = ({ name, label, type = "text", placeholder, className, starMark=false }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label className="flex items-center text-lg font-medium ml-1 gap-0.5">
        {label} {starMark && <StarMark />}
      </label>
      <input
        {...register(name)}
        type={type}
        className={`w-full p-2 mt-1 mb-2 border-1  rounded-md outline-none  focus:border-red-600 ${className}`}
        placeholder={placeholder}
      />
      {errors?.[name] && <p className="text-red-500 text-sm mt-1">{errors?.[name]?.message}</p>}
    </div>
  );
};

export default InputField;
