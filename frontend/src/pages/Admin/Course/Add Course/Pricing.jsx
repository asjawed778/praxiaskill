import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import InputField from "../../../../components/Input Field";
import Button from "../../../../components/Button/Button";

const Pricing = ({ handlePrev }) => {
  const { register, control, watch, setValue, formState: { errors } } = useFormContext();

  const actualPrice = watch("actualPrice");
  const discount = watch("discount");

  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    if (actualPrice && !isNaN(actualPrice)) {
      const discountedPrice = actualPrice - (actualPrice * discount) / 100;
      setFinalPrice(discountedPrice.toFixed(2));
    }

    if(!actualPrice)
    {
      setFinalPrice(0)
    }
  }, [actualPrice, discount]);


  const handlevalues = () => {
    console.log("hello", errors)
  }
  return (
    <div className="flex flex-col gap-5 p-6">
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
      <div onClick={handlevalues} className="mb-4">
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
            className={`flex items-center justify-center disabled:bg-gray-400 w-40`}
          >
           Submit
          </Button>
        {/* <Button
            type="submit"
            className={`flex items-center justify-center disabled:bg-gray-400 w-40 ${
              isLoading && "cursor-not-allowed"
            }`}
          >
            {isLoading ? <ButtonLoading /> : <p>Publish</p>}
          </Button> */}
      </div>
    </div>
  );
};

export default Pricing;