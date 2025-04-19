import React, { useEffect, useRef } from "react";
import { Control, useFieldArray, useFormContext } from "react-hook-form";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Button
} from "@mui/material";
import { AddCircleOutline, Close } from "@mui/icons-material";
import CustomInputField from "./CustomInputField";
// import CustomFileUploader from "./CustomFileUploader";

export interface FieldConfig {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "file";
}
interface CustomFieldArrayProps {
  name: string;
  fieldsConfig: FieldConfig[];
  title: string;
  required?: boolean;
  control?: Control<any>
}

const CustomFieldArray: React.FC<CustomFieldArrayProps> = ({ 
  name, 
  fieldsConfig, 
  title, 
  required=true,
  control
}) => {
  const {control: contextControl} = useFormContext(); 
  const activeControl = control ?? contextControl;
  const { fields, append, remove } = useFieldArray({
    control: activeControl,
    name,
  });
  const initialized = useRef(false); 

  useEffect(() => {
    if (!initialized.current && fields.length === 0) {
      append(
        Object.fromEntries(fieldsConfig.map((f) => [f.name, f.type === "file" ? null : ""]))
      );
      initialized.current = true;
    }
  }, [fields, append, fieldsConfig]);

  return (
    <Grid container spacing={2}>
      <Grid size={{xs: 12}} >
        <Typography variant="h6">
          {title}{required && <span style={{ color: 'red' }}>*</span>}
        </Typography>
      </Grid>

      {fields.map((field, index) => (
        <Grid
          key={field.id}
          size={{xs: 12}}
          sx={{ border: 1, borderRadius: 2, p: 2, position: "relative", borderColor: 'grey.500' }}
        >
          {index > 0 && (
            <Box sx={{ position: "absolute", top: -6, right: -6, }}>
              <IconButton onClick={() => remove(index)} size="small" color="error">
                <Close />
              </IconButton>
            </Box>
          )}

          <Grid container spacing={2}>
            {fieldsConfig.map((config) => (
              <Grid size={{xs: 12, md: 6}} key={config.name}>
                {/* {config.type === "file" ? (
                  <CustomFileUploader
                    name={`${name}.${index}.${config.name}`}
                    // label={config.label}
                    control={control}
                  />
                ) : ( */}
                  <CustomInputField
                    name={`${name}.${index}.${config.name}`}
                    label={config.label}
                    placeholder={config.placeholder}
                    type={config.type}
                    control={activeControl}
                    required={required}
                  />
                {/* )} */}
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))}

      <Grid size={{xs: 12}}>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutline />}
          onClick={() =>
            append(Object.fromEntries(fieldsConfig.map((f) => [f.name, f.type === "file" ? null : ""])))
          }
        >
          Add More
        </Button>
      </Grid>
    </Grid>
  );
};

export default CustomFieldArray;


