import { Box, IconButton, Typography, Stack } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import { useFieldArray, useWatch } from "react-hook-form";
import CustomInputField from "../../../../../components/CustomInputField";
import { Delete } from "@mui/icons-material";
import CustomButton from "../../../../../components/CustomButton";

export default function SubSectionFields({ control, sectionIndex, errors }) {
  const {
    fields: subSectionFields,
    append: appendSubsection,
    remove: removeSubsection,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.subSections`,
  });

  const subSections = useWatch({
    control,
    name: `sections.${sectionIndex}.subSections`,
  });

  const handleAddSubsection = () => {
    const lastSub = subSections?.[subSections.length - 1];
    if (!lastSub || lastSub.title?.trim() === "") return;

    appendSubsection({ title: "", description: "" });
  };

  return (
    <Box mt={1}>
      <Typography variant="h6" fontWeight={500} gutterBottom>
        Subsections
      </Typography>

      {subSectionFields?.map((field, subIndex) => (
        <Box key={field.id} mb={2}>
          <Stack direction="column" spacing={2} alignItems="center">
            <CustomInputField
              name={`sections.${sectionIndex}.subSections.${subIndex}.title`}
              label="Subsection Title"
              placeholder="Enter subsection title"
            />
            <CustomInputField
              name={`sections.${sectionIndex}.subSections.${subIndex}.description`}
              label="Subsection Description"
              placeholder="Enter subsection description"
              multiline
              row={3}
              required={false}
            />

            {subSectionFields.length > 1 && (
              <IconButton
                onClick={() => removeSubsection(subIndex)}
                color="error"
                size="small"
              >
                <Delete />
              </IconButton>
            )}
          </Stack>

          {subIndex === subSectionFields.length - 1 && (
            <CustomButton
              label="Add More Subsection"
              variant="outlined"
              startIcon={<FaPlus />}
              onClick={handleAddSubsection}
              sx={{ mt: 2 }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
}
