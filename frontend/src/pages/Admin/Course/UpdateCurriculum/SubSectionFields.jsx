import { Box, Typography, Stack, IconButton } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import CustomInputField from "@/components/CustomInputField";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";
import DialogBoxWrapper from "../../../../components/DialogBoxWrapper";
import { useDeleteCurriculumMutation } from "../../../../services/course.api";
import { Delete } from "@mui/icons-material";
import toast from "react-hot-toast";

export default function SubSectionFields({
  control,
  sectionIndex,
  courseId,
  sectionId,
}) {
  const [openSubSectionDelete, setOpenSubSectionDelete] = useState(false);
  const [selectedSubSectionIndex, setSelectedSubSectionIndex] = useState(null);
  const [selectedSubSectionId, setSelectedSubSectionId] = useState(null);
  const [deleteSubSection] = useDeleteCurriculumMutation();

  const {
    fields: subSectionFields,
    append: appendSubsection,
    remove: removeSubsection,
    insert: insertSubsection,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.subSections`,
  });

  // const subSections = useWatch({
  //   control,
  //   name: `sections.${sectionIndex}.subSections`,
  // });

  const { getValues } = useFormContext();

  const handleAddSubsection = () => {
    const values = getValues(`sections.${sectionIndex}.subSections`);
    const lastSub = values?.[values.length - 1];

    if (!lastSub || lastSub.title?.trim() === "") return;

    appendSubsection({ title: "", description: "" });
  };

  const handleDeleteSubSection = async (subSectionId, index) => {
    const backupSubSection = subSectionFields[index]; 
    removeSubsection(index);

    try {
      if (subSectionId) {
        setOpenSubSectionDelete(false);
        await deleteSubSection({ courseId, sectionId, subSectionId }).unwrap();
      }
    } catch (error) {
      insertSubsection(index, backupSubSection); 
      toast.error(
        error?.data?.message || "Failed to delete subsection. Try again!"
      );
    } finally {
      setSelectedSubSectionId(null);
      setSelectedSubSectionIndex(null);
    }
  };

  return (
    <Box mt={1}>
      <Typography fontSize={"18px"} fontWeight={500} gutterBottom>
        Subsections
      </Typography>

      {subSectionFields?.map((field, subIndex) => (
        <Box
          key={field.id}
          mb={1}
          position="relative"
          border={1}
          borderColor="grey.300"
          borderRadius={2}
          px={3}
          py={1}
        >
          {subSectionFields.length > 1 && (
            <IconButton
              onClick={() => {
                setSelectedSubSectionIndex(subIndex);
                setSelectedSubSectionId(field._id);
                setOpenSubSectionDelete(true);
              }}
              color="error"
              size="medium"
              sx={{ position: "absolute", top: -8, right: -8 }}
            >
              <Delete />
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
      {openSubSectionDelete && selectedSubSectionId && (
        <DialogBoxWrapper
          open={openSubSectionDelete}
          onClose={() => setOpenSubSectionDelete(false)}
          onConfirm={() => {
            handleDeleteSubSection(selectedSubSectionId, selectedSubSectionIndex)}}
          title="Delete Subsection"
          message={
            <>
              Are you sure want to delete{" "}
              <strong>
                "
                {subSectionFields.find((f) => f._id === selectedSubSectionId)
                  ?.title || "this"}
                "
              </strong>{" "}
              subsection?
            </>
          }
        />
      )}
    </Box>
  );
}
