import { FaPlus } from "react-icons/fa6";
import { Delete } from "@mui/icons-material";
import { Grid, IconButton, Typography, Button } from "@mui/material";

import { useEffect, useRef } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import CustomInputField from "../../../../../components/CustomInputField";

export default function AssignmentFields({ control, sectionIndex, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.assignments`,
  });

  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current && fields.length === 0) {
      append({assignment: ""}); 
      initialized.current = true;
    }
  }, [fields, append]);

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
          <Grid size={{xs: 12}} display="flex">
            <CustomInputField
              name={`sections.${sectionIndex}.assignments.${index}.assignment`} 
              label={`Assignment ${index + 1}`}
              required={false}
              sx={{
                backgroundColor: "white",
                borderRadius:2
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
            {index > 0 && (
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

      <Button
        onClick={() => append({assignment: ""})} 
        startIcon={<FaPlus />}
        variant="outlined"
        sx={{ mt: 2 }}
      >
        Add More Assignment
      </Button>
    </Grid>
  );
}
