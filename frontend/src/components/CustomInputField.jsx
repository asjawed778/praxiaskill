import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useFormContext } from "react-hook-form";
import { useAppTheme } from "../context/ThemeContext";

const CustomInputField = ({
  name,
  label,
  placeholder,
  type = "text",
  size = "small",
  startIcon,
  endIcon,
  control,
  disabled = false,
  fullWidth = true,
  required = true,
  maxDate,
  minDate,
  sx = {},
  ...rest
}) => {
  const { control: contextControl } = useFormContext() || {};
  const activeControl = control ?? contextControl;

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const isDate = type === "date";
  const [uncontrolledValue, setUncontrolledValue] = useState("");
  const { colors } = useAppTheme();

  const renderTextField = (field, error) => (
    <TextField
      {...field}
      label={
        <span>
          {label} {required && <span style={{ color: 'red' }}>*</span>}
        </span>
      }
      disabled={disabled}
      value={field?.value ?? ""}
      placeholder={isDate ? undefined : placeholder}
      size={size}
      type={
        isDate
          ? "date"
          : isPassword && !showPassword
          ? "password"
          : type
      }
      fullWidth={fullWidth}
      variant="outlined"
      error={!!error}
      helperText={error?.message}
      margin="normal"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          transition: "border-color 0.3s",
          "&:hover": { borderColor: colors.inputHover },
          "&.Mui-focused": { borderColor: colors.inputFocus },
        },
        
        ...sx,
      }}
      InputProps={{
        startAdornment: startIcon && (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ),
        endAdornment: isPassword ? (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ) : endIcon ? (
          <InputAdornment position="end">{endIcon}</InputAdornment>
        ) : undefined,
      }}
      InputLabelProps={isDate ? { shrink: true } : undefined}
      inputProps={isDate ? { max: maxDate, min: minDate } : undefined}
      {...rest}
    />
  );

  return activeControl ? (
    <Controller
      name={name}
      control={activeControl}
      render={({ field, fieldState: { error } }) => renderTextField(field, error)}
    />
  ) : (
    renderTextField(
      {
        value: uncontrolledValue,
        onChange: (e) => setUncontrolledValue(e.target.value),
      },
      null
    )
  );
};

export default CustomInputField;
