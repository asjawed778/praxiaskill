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
  row,
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
      multiline={!!row}
      rows={row}
      disabled={disabled}
      // value={field?.value ?? ""}
      value={typeof field.value === "undefined" ? "" : field.value}

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
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "6px",
          transition: "border-color 0.3s",
          "&:hover": { borderColor: colors.inputHover },
          "&.Mui-focused": { borderColor: colors.inputFocus },

          // Responsive font size and padding for input
          // fontSize: {
          //   xs: "0.75rem",   // mobile
          //   sm: "0.875rem",  // tablet
          //   md: "1rem",      // desktop
          //   // lg: "1.125rem",  // large screens
          // },
          "& input": {
            padding: "8px 10px",
            fontSize: "0.875rem"
          },
        },
        // Responsive font size for placeholder
        // "& input::placeholder": {
        //   fontSize: {
        //     xs: "0.75rem",
        //     sm: "0.875rem",
        //     md: "1rem",
        //     // lg: "1.125rem",
        //   },
        //   opacity: 1,
        //   color: "#aaa",
        // },
        // Responsive font size for label
        // "& label": {
        //   fontSize: {
        //     xs: "0.75rem",
        //     sm: "0.875rem",
        //     md: "1rem",
        //     // lg: "1.125rem",
        //   },
        //   color: colors.inputLabel,
        // },

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
