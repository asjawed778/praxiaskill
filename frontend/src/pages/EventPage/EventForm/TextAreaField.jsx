import { useFormContext } from "react-hook-form";
import StarMark from "./StarMark";

const TextAreaField = ({ label, name, placeholder, rows = 8, starMark=false }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <label className="flex items-center text-lg font-medium ml-1 gap-0.5">
        {label} {starMark && <StarMark />}
      </label>
      <textarea
        {...register(name)}
        rows={rows}
        placeholder={placeholder}
        className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
      />
      {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>}
    </div>
  );
};

export default TextAreaField;
