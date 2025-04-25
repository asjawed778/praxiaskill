import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const CustomDropdown = ({
  label,
  value,
  options,
  onChange,
  size = "small",
  sx = {},
}) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <FormControl size={size} sx={{ minWidth: 150, ...sx }}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={handleChange}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomDropdown;
