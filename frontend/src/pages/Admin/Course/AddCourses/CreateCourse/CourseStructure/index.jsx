import { Box, Typography, Stack } from "@mui/material";
import { useFormContext, useFieldArray } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import required from "@/assets/icons/required.svg";
import CustomButton from "@/components/CustomButton";
import SubSectionFields from "./SubSectionFields";
import ProjectFields from "./ProjectFields";
import AssignmentFields from "./AssignmentsFields";
import CustomInputField from "@/components/CustomInputField";

const CourseStructure = ({ handleNext, handlePrev }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: "sections",
  });

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box position="relative" width="fit-content">
        <Typography variant="h6" fontWeight={600}>
          Section
        </Typography>
        <Box
          component="img"
          src={required}
          alt="required"
          sx={{
            width: 8,
            height: 8,
            position: "absolute",
            top: 6,
            right: -12,
          }}
        />
      </Box>

      <Box display="flex" flexDirection="column" gap={4}>
        {sectionFields.map((_, sectionIndex) => (
          <Box
            key={sectionIndex}
            p={3}
            border="1px solid #ccc"
            borderRadius={2}
            position="relative"
          >
            <Typography
              variant="body2"
              sx={{ position: "absolute", top: 8, right: 12 }}
            >
              {sectionIndex + 1}
            </Typography>
            <Stack spacing={2}>
              <CustomInputField
                name={`sections.${sectionIndex}.title`}
                label="Title"
                placeholder="Enter section title"
              />
              <CustomInputField
                name={`sections.${sectionIndex}.description`}
                label="Description"
                placeholder="Enter section description"
                multiline
                row={3}
                required={false}
              />
            </Stack>
            <SubSectionFields
              control={control}
              sectionIndex={sectionIndex}
              errors={errors}
            />
            <AssignmentFields
              control={control}
              sectionIndex={sectionIndex}
              errors={errors}
            />
            <ProjectFields
              register={register}
              control={control}
              sectionIndex={sectionIndex}
              errors={errors}
            />
            {sectionFields.length > 1 && (
              <CustomButton
                label="Remove Section"
                color="error"
                variant="outlined"
                onClick={() => removeSection(sectionIndex)}
                sx={{ mt: 2, ml: "auto", display: "block" }}
              />
            )}
          </Box>
        ))}
        <CustomButton
          label="Add More Section"
          onClick={() =>
            appendSection({
              title: "",
              description: "",
              subSections: [{ title: "", description: "" }],
            })
          }
          startIcon={<FaPlus />}
        />
        <Stack direction="row" justifyContent="space-between" mt={2}>
          <CustomButton label="Back" onClick={handlePrev} />
          <CustomButton label="Next" onClick={handleNext} />
        </Stack>
      </Box>
    </Box>
  );
};

export default CourseStructure;
