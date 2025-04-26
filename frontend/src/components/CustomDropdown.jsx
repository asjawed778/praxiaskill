import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const CustomDropdown = ({
  name,
  label,
  placeholder,
  options,
  control,
  value,
  onChange,
  size = "small",
  disabled = false,
  fullWidth = true,
  required = true,
  sx = {},
}) => {
  const methods = useFormContext();
  const contextControl = methods?.control;
  const activeControl = control ?? contextControl;
  const [uncontrolledValue, setUncontrolledValue] = useState("");

  const renderSelect = (
    fieldValue,
    handleChange,
    error
  ) => (
    <FormControl
      fullWidth={fullWidth}
      size={size}
      disabled={disabled}
      sx={{ minWidth: 150, ...sx }}
      error={!!error}
    >
      <InputLabel required={required}>{label}</InputLabel>
      
      <Select
        label={label}
        value={fieldValue}
        onChange={(e) => handleChange(e.target.value)}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );

  return activeControl && name ? (
    <Controller
      name={name}
      control={activeControl}
      render={({ field, fieldState: { error } }) =>
        renderSelect(field.value ?? "", field.onChange, error)
      }
    />
  ) : (
    renderSelect(value ?? uncontrolledValue, (val) => {
      onChange?.(val);
      setUncontrolledValue(val);
    }, null)
  );
};

export default CustomDropdown;