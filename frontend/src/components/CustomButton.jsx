import React from "react";
import { Button, CircularProgress, Box } from "@mui/material";

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
  const isDisabled = disabled || loading;

  return (
    <Box
      sx={{
        display: "inline-block",
        cursor: isDisabled ? "not-allowed" : "pointer", 
      }}
    >
      <Button
        type={type}
        variant={variant}
        color={color}
        size={size}
        fullWidth={fullWidth}
        disabled={isDisabled}
        onClick={onClick}
        startIcon={!loading && startIcon}
        endIcon={!loading && endIcon}
        className={className}
        sx={{
          fontSize: "14px",
          borderRadius: 1.5,
          textTransform: "none",
          width: fullWidth ? "100%" : "max-content",
          maxWidth: fullWidth ? "100%" : "none",
          display: "inline-flex",
          minWidth: 75,
          pointerEvents: "auto", 
          ...sx,
        }}
        style={style}
        {...rest}
      >
        {loading ? <CircularProgress size={25} color="inherit" /> : label}
      </Button>
    </Box>
  );
};

export default CustomButton;
