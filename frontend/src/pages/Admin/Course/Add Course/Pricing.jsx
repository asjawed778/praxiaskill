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
      <Box mb={3}>
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
      <Box mb={3}>
        <Typography gutterBottom>Discount: {discount}%</Typography>
        <Controller
          name="price.discountPercentage"
          control={control}
          render={({ field }) => (
            <Slider
              {...field}
              min={0}
              color="secondary"
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
      <Box mb={3}>
        <Typography variant="subtitle1">Final Price:</Typography>
        <Typography variant="h6">₹ {finalPrice}</Typography>
      </Box>
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
              "Submit"
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Pricing;
