import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FaPlus } from "react-icons/fa";
import required from "@/assets/icons/required.svg";
import CustomButton from "@/components/CustomButton";
import CustomInputField from "@/components/CustomInputField";
import SubSectionFields from "./SubSectionFields";
import ProjectFields from "./ProjectFields";
import AssignmentFields from "./AssignmentsFields";
import { Tooltip, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SectionAccordion = ({
  field,
  sectionIndex,
  control,
  register,
  errors,
  expanded,
  onExpand,
  removeSection,
  totalSections,
}) => {
  const sectionTitle = useWatch({
    control,
    name: `sections.${sectionIndex}.title`,
    defaultValue: "",
  });

  return (
    <Accordion
      expanded={expanded === field.id}
      onChange={onExpand(field.id)}
      sx={{
        color: "black",
        mb: 1,
        borderLeft: "6px solid #00e676",
        borderRadius: 2,
        boxShadow: "0 0 10px rgba(0, 230, 118, 0.2)",
        "&:before": { display: "none" },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "#00e676" }} />}
        sx={{ px: 1, position: "relative", pr: 5 }}
      >
        {totalSections > 1 && (
          <Tooltip title="Remove Section">
            <IconButton
              onClick={(e) => {
                e.stopPropagation(); 
                removeSection(sectionIndex);
              }}
              size="small"
              sx={{
                position: "absolute",
                top: -1,
                right: -1,
                zIndex: 2,
                color: "error.main",
                bgcolor: "white",
                "&:hover": {
                  bgcolor: "#ffe6e6",
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

        <Box display="flex" alignItems="center" gap={2}>
          <Chip
            label={`Module ${sectionIndex + 1}`}
            sx={{ bgcolor: "#00e676", fontWeight: "bold" }}
          />
          <Typography sx={{ fontWeight: 500 }}>
            {sectionTitle || "You have not created this module yet."}
          </Typography>
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ px: 2 }}>
        <Stack spacing={1}>
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
            row={2}
            required={false}
          />

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
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

const CourseStructure = ({ handleNext, handlePrev }) => {
  const {
    control,
    register,
    trigger,
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

  const [expanded, setExpanded] = useState(() =>
    sectionFields.length > 0 ? sectionFields[0].id : null
  );

  const handleExpand = (panelId) => (_, isExpanded) => {
    setExpanded(isExpanded ? panelId : null);
  };
  useEffect(() => {
    if (sectionFields.length > 0) {
      setExpanded(sectionFields[sectionFields.length - 1].id);
    }
  }, [sectionFields]);

  return (
    <Box sx={{ borderRadius: 2 }}>
      <Box position="relative" width="fit-content" mb={1}>
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

      {sectionFields.map((field, index) => (
        <SectionAccordion
          key={field.id}
          field={field}
          sectionIndex={index}
          control={control}
          register={register}
          errors={errors}
          expanded={expanded}
          onExpand={handleExpand}
          removeSection={removeSection}
          totalSections={sectionFields.length}
        />
      ))}

      <CustomButton
        label="Add More Module"
        onClick={async () => {
          const isValid = await trigger();
          if (!isValid) return;

          appendSection({
            title: "",
            description: "",
            subSections: [{ title: "", description: "" }],
          });
        }}
        startIcon={<FaPlus />}
        sx={{ mt: 2 }}
      />

      <Stack direction="row" justifyContent="space-between" mt={3}>
        <CustomButton label="Back" onClick={handlePrev} />
        <CustomButton label="Next" onClick={handleNext} />
      </Stack>
    </Box>
  );
};

export default CourseStructure;
