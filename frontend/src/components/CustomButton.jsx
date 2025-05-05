import React from "react";
import { Button, CircularProgress } from "@mui/material";

const CustomButton = ({
  label,
  onClick,
  type = "button",
  variant = "contained",
  color = "primary",
  size = "small",
  fullWidth = false,
  disabled = false,
  loading = false,
  startIcon,
  endIcon,
  className,
  sx = {},
  style = {},
  ...rest
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      startIcon={!loading && startIcon}
      endIcon={!loading && endIcon}
      className={className}
      sx={{
        borderRadius: 4,
        ...sx
      }}
      style={style}
      {...rest}
    >
      {loading ? <CircularProgress size={20} color="inherit" /> : label}
    </Button>
  );
};

export default CustomButton;
