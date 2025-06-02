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
        fontSize: "14px",
        borderRadius: 2,
        textTransform: "none",
        ...sx,
      }}
      {...rest}
    >
      {loading ? <CircularProgress size={25} color="inherit" /> : label}
    </Button>
  );
};

export default CustomButton;
