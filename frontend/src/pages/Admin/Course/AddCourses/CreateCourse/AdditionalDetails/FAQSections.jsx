import CustomInputField from "@/components/CustomInputField";
import { AddCircleOutline, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import ImageUploader from "@/components/ImageUploader";
import CustomButton from "@/components/CustomButton";

const FAQSections = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "faq",
  });
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && fields.length === 0) {
      append({ question: "", answer: "", resourceUrl: null });
      initialized.current = true;
    }
  }, [fields, append]);
  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom fontWeight={500}>
          FAQ Details
        </Typography>
        <Divider />
      </Box>
      <Grid container spacing={3}>
        {fields.map((field, index) => (
          <Grid
            key={field.id}
            size={{ xs: 12 }}
            sx={{
              border: 1,
              borderRadius: 2,
              p: 2,
              position: "relative",
              borderColor: "grey.500",
            }}
          >
            {index > 0 && (
              <Box sx={{ position: "absolute", top: -10, right: -10, p: 1 }}>
                <IconButton
                  onClick={() => remove(index)}
                  size="small"
                  color="error"
                >
                  <Close />
                </IconButton>
              </Box>
            )}

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputField
                  name={`faq.${index}.question`}
                  label="Question"
                  placeholder={`Enter FAQ ${index + 1}`}
                  control={control}
                  margin="normal"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 2,
                  }}
                  required={false}
                />
                <CustomInputField
                  name={`faq.${index}.answer`}
                  label="Answer"
                  placeholder="Enter Answer"
                  control={control}
                  margin="normal"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 2,
                  }}
                  row={6}
                  multiline
                  required={false}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <ImageUploader
                  label="Upload Related Image"
                  name={`faq.${index}.resourceUrl`}
                  control={control}
                  width={500}
                  height={200}
                  required={false}
                />
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Grid size={{ xs: 12 }}>
          <CustomButton
            label="Add More FAQ"
            variant="outlined"
            startIcon={<AddCircleOutline />}
            onClick={() =>
              append({ question: "", answer: "", resourceUrl: null })
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default FAQSections;
