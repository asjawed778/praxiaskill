import React, { useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Box, Stack, Typography } from "@mui/material";
import JoditEditor from "jodit-react";

import TagsInput from "./TagsInput";
import FAQSections from "./FAQSections";
import ToolsGrid from "./ToolsGrid";
import AddKeyPoints from "./AddKeyPoints";
import WhatYouWillLearn from "./WhatYouWillLearn";
import CustomInputField from "@/components/CustomInputField";
import CustomButton from "@/components/CustomButton";

const AdditionalDetails = ({
  handleNext,
  handlePrev,
  editMode,
  onSubmit,
  courseUpdating,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const editor = useRef(null);

  return (
    <Box
      onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      display="flex"
      flexDirection="column"
      gap={3}
    >
      <AddKeyPoints />
      <WhatYouWillLearn />
      <TagsInput />
      <Box>
        <Typography
          variant="subtitle1"
          sx={{ mb: 1, position: "relative", display: "inline-block" }}
        >
          Description{" "}
          <Typography component="span" color="error.main">
            *
          </Typography>
        </Typography>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <JoditEditor
              ref={editor}
              value={field.value}
              onBlur={(newContent) => field.onChange(newContent)}
              onChange={() => {}}
              config={{
                minHeight: 350,
                width: "100%",
                placeholder: "Start typing here...",
              }}
            />
          )}
        />
        {errors?.description && (
          <Typography variant="caption" color="error" mt={1}>
            {errors.description.message}
          </Typography>
        )}
      </Box>
      <Box display="flex" flexWrap="wrap" gap={5} justifyContent="center">
        <Box
          flex={1}
          minWidth={250}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <CustomInputField
            name="duration"
            label="Duration"
            placeholder="Enter course duration (e.g: 6 Months)"
          />
        </Box>
      </Box>
      <ToolsGrid />
      <FAQSections />
      <Box display="flex" justifyContent="space-between" mt={3}>
        <CustomButton label="Back" onClick={handlePrev} />
        <Stack spacing={2} direction="row">
          {editMode && (
            <CustomButton
              label="Update"
              type="submit"
              onClick={onSubmit}
              loading={courseUpdating}
            />
          )}
          <CustomButton label="Next" onClick={handleNext} />
        </Stack>
      </Box>
    </Box>
  );
};

export default AdditionalDetails;
