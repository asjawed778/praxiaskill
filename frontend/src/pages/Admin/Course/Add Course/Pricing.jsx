import fifthStepValidationSchema from "./Schema/fifthStepValidationSchema";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../../components/Button/Button";
import { usePublishCourseMutation } from "../../../../services/course.api";
import ButtonLoading from "../../../../components/Button/ButtonLoading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Pricing({ currentStep, handleNext, handlePrev, courseId }) {
  const [publishCourse, { isLoading, isError, error: uploadError }] =
    usePublishCourseMutation();
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(fifthStepValidationSchema),
    defaultValues: {
      actualPrice: "",
      discount: 0,
      courseAction: "published",
    },
  });

  const navigate = useNavigate()

  const actualPrice = watch("actualPrice");
  const discount = watch("discount");

  // Calculate price after discount
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    if (actualPrice && !isNaN(actualPrice)) {
      const discountedPrice = actualPrice - (actualPrice * discount) / 100;
      setFinalPrice(discountedPrice.toFixed(2));
    }
  }, [actualPrice, discount]);

  const onSubmit = async(data) => {
    try {
      const id = `${courseId}`;
      const result = await publishCourse({id});
      console.log("Result after submitting Fifth Step:", result);
      if (result?.error) {   
        throw new Error(result.error.data.message);
      }
      toast.success("Course Published Successfully");
      navigate("/admin")
      
    } catch (err) {
      console.log("Fifth Step form Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 p-6">
      {/* Actual Price */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Actual Price:</label>
        <input
          type="number"
          {...register("actualPrice")}
          className="w-full p-2 border rounded mt-1"
          placeholder="Enter actual price"
        />
        {errors.actualPrice && (
          <p className="text-red-500 text-sm">{errors.actualPrice.message}</p>
        )}
      </div>

      {/* Discount Slider */}
      <div className="mb-4">
        <label className="block text-sm font-medium">
          Discount: {discount}%
        </label>
        <Controller
          name="discount"
          control={control}
          render={({ field }) => (
            <input
              type="range"
              min="0"
              max="100"
              {...field}
              className="w-full mt-1"
            />
          )}
        />
      </div>

      {/* Final Price Display */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Final Price:</label>
        <p className="text-lg font-semibold">₹ {finalPrice}</p>
      </div>

      {/* Course Action */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Course Action:</label>
        <select
          {...register("courseAction")}
          className="w-full p-2 border rounded mt-1"
        >
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
          <option value="preview">Preview</option>
        </select>
        {errors.courseAction && (
          <p className="text-red-500 text-sm">{errors.courseAction.message}</p>
        )}
      </div>

      <div className="flex gap-5 justify-between">
        <Button onClick={handlePrev}>Previous</Button>

        {/* Submit Button */}
        <Button
            type="submit"
            className={`flex items-center justify-center disabled:bg-gray-400 w-40 ${
              isLoading && "cursor-not-allowed"
            }`}
          >
            {isLoading ? <ButtonLoading /> : <p>Publish</p>}
          </Button>
      </div>
    </form>
  );
}
