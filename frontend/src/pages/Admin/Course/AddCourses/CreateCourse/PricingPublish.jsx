import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Slider,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import ButtonLoading from "@/components/Button/ButtonLoading";
import CustomInputField from "@/components/CustomInputField";
import CustomDropdownField from "@/components/CustomDropdownField";
import { CourseValidity, CourseStatus } from "@/utils/enum";
import CustomButton from "@/components/CustomButton";

const PricingPublish = ({ handlePrev, isLoading, editMode, isCourseUpdate }) => {
  const {
    register,
    control,
    watch,
    setValue,
    getValues,
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
  const validityOptions = [
    {
      label: "One Year",
      value: CourseValidity.ONE_YEAR,
    },
    {
      label: "Two Year",
      value: CourseValidity.TWO_YEAR,
    },
    {
      label: "Life Time",
      value: CourseValidity.LIFETIME,
    },
  ];
  const courseStatusOptions = [
    {
      label: "Save as Draft",
      value: CourseStatus.DRAFT,
    },
    {
      label: "Publish",
      value: CourseStatus.PUBLISHED,
    },
  ];
  const validity = watch("courseStatus");

  return (
    <Box p={4}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomDropdownField
            name="validity"
            label="Select Course Validity"
            options={validityOptions}
            // margin="normal"
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
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              mb: 2,
            }}
          />
        </Grid>
        <Grid size={{xs: 12, sm: 6}}>
          <CustomInputField
          name="price.actualPrice"
          label="Actual Price"
          placeholder="Enter actual price"
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
          }}
        />
        </Grid>
        <Grid size={{xs: 12, sm: 6}}>
          <CustomInputField
          name="price.discountPercentage"
          type="number"
          disabled={actualPrice < 1}
          label="Discount in %"
          placeholder="Enter discount in %"
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
          }}
          required={false}
        />
        </Grid>
      </Grid>
      <Box mb={3} mt={2}>
        <Typography variant="subtitle1">Final Price:</Typography>
        {finalPrice && (
          <Typography variant="h6">₹ {finalPrice}</Typography>
        )}
      </Box>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item>
          <CustomButton label="Back" onClick={handlePrev} />
        </Grid>
        <Grid item>
          <CustomButton
            label={
              isLoading || isCourseUpdate ? (
                <ButtonLoading />
              ) : editMode ? (
                "Submit"
              ) : (
                "Submit"
              )
            }
            type="submit"
            disabled={isLoading || isCourseUpdate}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PricingPublish;
