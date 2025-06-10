import { FaPlus } from "react-icons/fa6";
import { Delete } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";

import { useEffect, useRef } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import CustomInputField from "../../../../../components/CustomInputField";
import CustomButton from "../../../../../components/CustomButton";

export default function AssignmentFields({ control, sectionIndex, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.assignments`,
  });
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current && fields.length === 0) {
      append({ assignment: "" });
      initialized.current = true;
    }
  }, [fields, append]);
  const assignmentValues = useWatch({
    control,
    name: `sections.${sectionIndex}.assignments`,
  });
  const handleAddAssignment = () => {
    const last = assignmentValues?.[assignmentValues.length - 1]?.assignment;
    if (!last || last.trim() === "") return;
    append({ assignment: "" });
  };

  return (
    <Grid item xs={12}>
      <Typography variant="h6" sx={{ mb: 1, fontSize: "18px" }}>
        Assignments
      </Typography>

      {fields.map((field, index) => (
        <Grid
          key={field.id}
          container
          alignItems="center"
          spacing={2}
          sx={{ mb: 1 }}
        >
          <Grid size={{ xs: 12 }} display="flex">
            <CustomInputField
              name={`sections.${sectionIndex}.assignments.${index}.assignment`}
              label={`Assignment ${index + 1}`}
              required={false}
              sx={{
                backgroundColor: "white",
                borderRadius: 2,
              }}
            />
            {errors?.sections?.[sectionIndex]?.assignments?.[index]
              ?.assignment && (
              <Typography color="error" variant="caption">
                {
                  errors.sections[sectionIndex].assignments[index].assignment
                    .message
                }
              </Typography>
            )}
            {fields.length > 1 && (
              <IconButton
                onClick={() => remove(index)}
                color="error"
                size="small"
              >
                <Delete />
              </IconButton>
            )}
          </Grid>
        </Grid>
      ))}

      <CustomButton
        label="Add More Assignment"
        onClick={handleAddAssignment}
        startIcon={<FaPlus />}
        variant="outlined"
      />
    </Grid>
  );
}
