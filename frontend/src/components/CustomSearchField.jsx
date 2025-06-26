import React, { useState, useEffect } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const CustomSearchField = ({
  label = "",
  placeholder = "Search...",
  delay = 500,
  onSearch,
  value,
  sx,
}) => {
  const [searchTerm, setSearchTerm] = useState(value || "");
  useEffect(() => {
    setSearchTerm(value || "");
  }, [value]);
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchTerm.trim());
    }, delay);

    return () => clearTimeout(handler);
  }, [searchTerm, delay, onSearch]);

  const handleClear = () => {
    setSearchTerm("");
    onSearch(""); 
  };

  return (
    <TextField
      variant="outlined"
      label={label}
      size="small"
      placeholder={placeholder}
      fullWidth
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      aria-label={label || placeholder}
      sx={{ borderRadius: "6px", ...sx }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
        endAdornment: searchTerm && (
          <InputAdornment position="end">
            <IconButton
              size="small"
              onClick={handleClear}
              edge="end"
              aria-label="clear"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CustomSearchField;
