import { useForm } from "react-hook-form";
import { useAddCategoryMutation } from "../../../services/course.api";
import addCategorySchemaValidation from "./Schema/addCategorySchemaValidation";
import InputField from "../../../components/Input Field";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../components/Button/Button";
import ButtonLoading from "../../../components/Button/ButtonLoading";
import { toast } from "react-hot-toast";

const CourseDetailsForm = () => {
  const [addCategory, { isLoading, error }] = useAddCategoryMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addCategorySchemaValidation),
  });

  const onSubmit = async (data) => {
    try {
      const result = await addCategory(data);
     
      if (result?.error) {
        throw new Error(result.error.data.message);
      }
      toast.success("Category Added Successfully")
      reset();
    } catch (err) {
      console.log("Add Category Error:", err);
    }
  };

  return (
    <div className="px-4">
      <h2 className="text-xl font-semibold my-4">Add Category</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-3 flex flex-col gap-6 px-4 bg-[#F5F5F5] rounded-lg"
      >
        <div>
          <InputField
            placeholder="Enter the category name"
            className="bg-white"
            {...register("name")}
          >
            Name <span className="text-red-600">*</span>
          </InputField>
          {errors?.name && (
            <p className="text-red-600 text-xs ml-1 mt-0.5">
              {errors?.name.message}
            </p>
          )}
        </div>
        
        <div>
          {/* Section Description */}
          <label htmlFor="description">
            Description <span className="text-red-600">*</span>
          </label>
          <textarea
            id="description"
            {...register(`description`)}
            placeholder="Enter the category description"
            className="bg-white w-full p-2 mt-2 border border-gray-300 rounded-lg outline-none"
          />
          {errors?.description && (
            <p className="text-red-600 text-xs ml-1 -mt-0.5">
              {errors?.description.message}
            </p>
          )}
        </div>
  
        <Button
            type="submit"
            className={`flex items-center justify-center disabled:bg-gray-400 w-full ${
              isLoading && "cursor-not-allowed"
            }`}
          >
            {isLoading ? <ButtonLoading /> : <p>Submit</p>}
          </Button>
      </form>
    </div>
  );
};

export default CourseDetailsForm;
