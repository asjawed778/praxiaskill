import { Box, Typography, Stack, IconButton } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import CustomInputField from "@/components/CustomInputField";
import CustomButton from "@/components/CustomButton";

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
  const { getValues } = useFormContext();
  const handleAddSubsection = () => {
  const values = getValues(`sections.${sectionIndex}.subSections`);
  const lastSub = values?.[values.length - 1];

  if (!lastSub || lastSub.title?.trim() === "") return;

  appendSubsection({ title: "", description: "" });
};

  return (
    <Box mt={1}>
      <Typography fontSize={"18px"} fontWeight={500} gutterBottom>
        Subsections
      </Typography>

      {subSectionFields?.map((field, subIndex) => (
        <Box key={field.id} mb={1} position="relative" border={1} borderColor="grey.300" borderRadius={2} px={3} py={1}>
          {subSectionFields.length > 1 && (
            <IconButton
              onClick={() => removeSubsection(subIndex)}
              color="error"
              size="medium"
              sx={{ position: "absolute", top: -8, right: -8 }}
            >
              <RxCross2 />
            </IconButton>
          )}

          <Stack direction="column" spacing={2}>
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
              row={2}
              required={false}
            />

            
          </Stack>
          {subIndex === subSectionFields.length - 1 && (
              <CustomButton
                label="Add More Subsection"
                variant="outlined"
                startIcon={<FaPlus />}
                onClick={handleAddSubsection}
                sx={{ mt: 1 }}
              />
            )}
        </Box>
        
      ))}
    </Box>
  );
}
