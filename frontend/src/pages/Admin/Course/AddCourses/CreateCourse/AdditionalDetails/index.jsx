import React, { useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Box, Typography, Stack, Grid } from "@mui/material";
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
  isCourseUpdate,
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
          sx={{
            mb: 1,
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            gap: "2px",
          }}
        >
          Description
          <Typography component="span" sx={{ color: "red" }}>
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
      <Grid container spacing={2}>
        <Grid size={{xs: 12, sm: 6}}>
          <CustomInputField 
            name="duration"
            label="Course Duration"
            placeholder="Enter course duration (e.g: 6 Months)"
          />
        </Grid>
        <Grid size={{xs: 12, sm: 6}}>
          <CustomInputField 
            type="number"
            name="totalLiveSession"
            label="Total Live Session"
            placeholder="Enter total live mentorship session(in hours)"
            required={false}
          />
        </Grid>
        <Grid size={{xs: 12, sm: 6}}>
          <CustomInputField 
            name="recordedContent"
            label="Total Recorded Content"
            placeholder="Enter total recorded content(in hours)"
            required={false}
          />
        </Grid>
        <Grid size={{xs: 12, sm: 6}}>
          <CustomInputField 
            name="prerequisites"
            label="Prerequisite"
            placeholder="Enter prerequisite for course"
            required={false}
          />
        </Grid>

      </Grid>
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
              loading={isCourseUpdate}
            />
          )}
          <CustomButton label="Next" onClick={handleNext} />
        </Stack>
      </Box>
    </Box>
  );
};

export default AdditionalDetails;
