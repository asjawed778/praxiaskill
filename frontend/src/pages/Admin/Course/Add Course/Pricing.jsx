import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import Button from "../../../../components/Button/Button";
import ButtonLoading from "../../../../components/Button/ButtonLoading";

const Pricing = ({ handlePrev, isLoading, editMode, isCourseUpdate }) => {
  console.log("is courseupdate: ", editMode);
  
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const actualPrice = watch("price.actualPrice");
  const discount = watch("price.discountPercentage");

  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    if (actualPrice && !isNaN(actualPrice)) {
      const discountedPrice = actualPrice - (actualPrice * discount) / 100;
      const computedPrice = Number(discountedPrice.toFixed(2));
      setFinalPrice(computedPrice);
      setValue("price.finalPrice", computedPrice);
    } else {
      setFinalPrice(0);
      setValue("price.finalPrice", 0);
    }
  }, [actualPrice, discount, setValue]);

  return (
    <div className="flex flex-col gap-5 p-6">
      {/* Actual Price */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Actual Price:</label>
        <input
          type="number"
          {...register("price.actualPrice")}
          className="w-full p-2 border rounded mt-1"
          placeholder="Enter actual price"
        />
        {errors.price?.actualPrice && (
          <p className="text-red-500 text-sm">
            {errors.price.actualPrice.message}
          </p>
        )}
      </div>

      {/* Discount Slider */}
      <div className="mb-4">
        <label className="block text-sm font-medium">
          Discount: {discount}%
        </label>
        <Controller
          name="price.discountPercentage"
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
        {errors.price?.discountPercentage && (
          <p className="text-red-500 text-sm">
            {errors.price.discountPercentage.message}
          </p>
        )}
      </div>

      {/* Final Price Display */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Final Price:</label>
        <p className="text-lg font-semibold">₹ {finalPrice}</p>
      </div>

      <div className="flex gap-5 justify-between">
        <Button onClick={handlePrev}>Previous</Button>

        <Button
          type="submit"
          className={`flex items-center justify-center disabled:bg-gray-400 w-40 ${
            isLoading && "cursor-not-allowed"
          }`}
          disabled={isLoading || isCourseUpdate}
        >
          {isLoading || isCourseUpdate ? (
            <ButtonLoading />
          ) : editMode ? (
            "update"
          ) : (
            "Publish"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Pricing;
