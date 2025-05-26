// import React, { useEffect, useState } from "react";
// import { useFormContext, Controller } from "react-hook-form";
// import Button from "../../../../components/Button/Button";
// import ButtonLoading from "../../../../components/Button/ButtonLoading";

// const Pricing = ({ handlePrev, isLoading, editMode, isCourseUpdate }) => {

//   const {
//     register,
//     control,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useFormContext();

//   const actualPrice = watch("price.actualPrice");
//   const discount = watch("price.discountPercentage");

//   const [finalPrice, setFinalPrice] = useState(0);

//   useEffect(() => {
//     if (actualPrice && !isNaN(actualPrice)) {
//       const discountedPrice = actualPrice - (actualPrice * discount) / 100;
//       const computedPrice = Number(discountedPrice.toFixed(2));
//       setFinalPrice(computedPrice);
//       setValue("price.finalPrice", computedPrice);
//     } else {
//       setFinalPrice(0);
//       setValue("price.finalPrice", 0);
//     }
//   }, [actualPrice, discount, setValue]);

//   return (
//     <div className="flex flex-col gap-5 p-6">
//       {/* Actual Price */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium">Actual Price:</label>
//         <input
//           type="number"
//           {...register("price.actualPrice")}
//           className="w-full p-2 border rounded mt-1"
//           placeholder="Enter actual price"
//         />
//         {errors.price?.actualPrice && (
//           <p className="text-red-500 text-sm">
//             {errors.price.actualPrice.message}
//           </p>
//         )}
//       </div>

//       {/* Discount Slider */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium">
//           Discount: {discount}%
//         </label>
//         <Controller
//           name="price.discountPercentage"
//           control={control}
//           render={({ field }) => (
//             <input
//               type="range"
//               min="0"
//               max="100"
//               {...field}
//               className="w-full mt-1"
//             />
//           )}
//         />
//         {errors.price?.discountPercentage && (
//           <p className="text-red-500 text-sm">
//             {errors.price.discountPercentage.message}
//           </p>
//         )}
//       </div>

//       {/* Final Price Display */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium">Final Price:</label>
//         <p className="text-lg font-semibold">₹ {finalPrice}</p>
//       </div>

//       <div className="flex gap-5 justify-between">
//         <Button onClick={handlePrev}>Previous</Button>

//         <Button
//           type="submit"
//           className={`flex items-center justify-center disabled:bg-gray-400 w-40 ${
//             isLoading && "cursor-not-allowed"
//           }`}
//           disabled={isLoading || isCourseUpdate}
//         >
//           {isLoading || isCourseUpdate ? (
//             <ButtonLoading />
//           ) : editMode ? (
//             "update"
//           ) : (
//             "Publish"
//           )}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Pricing;

import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  TextField,
  Slider,
  Typography,
  Box,
  Grid,
  Button,
} from "@mui/material";
import ButtonLoading from "../../../../components/Button/ButtonLoading";
import CustomInputField from "@/components/CustomInputField";
import CustomDropdownField from "@/components/CustomDropdownField";
import { CourseValidity, CourseStatus } from "@/utils/enum";

const Pricing = ({ handlePrev, isLoading, editMode, isCourseUpdate }) => {
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
  const validityOptions = Object.entries(CourseValidity).map(
    ([key, value]) => ({
      label: key.replace("_", " "),
      value: value,
    })
  );
  const courseStatusOptions = Object.entries(CourseStatus).map(
    ([key, value]) => ({
      label: key.replace("_", " "),
      value: value,
    })
  );
  return (
    <Box p={4}>
      <Grid container spacing={2} mb={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomDropdownField
            name="validity"
            label="Select Course Validity"
            options={validityOptions}
            margin="normal"
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomDropdownField
            name="courseStatus"
            label="Select Course Status"
            options={courseStatusOptions}
            margin="normal"
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
            }}
          />
        </Grid>
      </Grid>
      {/* Actual Price */}
      <Box mb={3}>
        {/* <TextField
          label="Actual Price"
          type="number"
          size="small"
          fullWidth
          variant="outlined"
          placeholder="Enter actual price"
          error={Boolean(errors.price?.actualPrice)}
          helperText={errors.price?.actualPrice?.message}
          {...register("price.actualPrice")}
        /> */}
        <CustomInputField
          name="price.actualPrice"
          label="Actual Price"
          placeholder="Enter actual price"
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
          }}
        />
      </Box>

      {/* Discount Slider */}
      <Box mb={3}>
        <Typography gutterBottom>Discount: {discount}%</Typography>
        <Controller
          name="price.discountPercentage"
          control={control}
          render={({ field }) => (
            <Slider
              {...field}
              min={0}
              max={100}
              step={1}
              value={field.value || 0}
              onChange={(_, value) => field.onChange(value)}
            />
          )}
        />
        {errors.price?.discountPercentage && (
          <Typography variant="body2" color="error">
            {errors.price.discountPercentage.message}
          </Typography>
        )}
      </Box>

      {/* Final Price Display */}
      <Box mb={3}>
        <Typography variant="subtitle1">Final Price:</Typography>
        <Typography variant="h6">₹ {finalPrice}</Typography>
      </Box>

      {/* Buttons */}
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item>
          <Button variant="contained" onClick={handlePrev}>
            Previous
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading || isCourseUpdate}
            sx={{ width: 140 }}
          >
            {isLoading || isCourseUpdate ? (
              <ButtonLoading />
            ) : editMode ? (
              "Update"
            ) : (
              "Publish"
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Pricing;
