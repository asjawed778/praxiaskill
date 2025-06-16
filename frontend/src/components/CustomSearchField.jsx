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

  // Sync internal state with external value
  useEffect(() => {
    setSearchTerm(value || "");
  }, [value]);

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchTerm.trim());
    }, delay);

    return () => clearTimeout(handler);
  }, [searchTerm, delay, onSearch]);

  const handleClear = () => {
    setSearchTerm("");
    onSearch(""); // immediately clear from parent as well
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
        sx: {
          borderRadius: "6px",
        },
        ...sx,
      }}
    />
  );
};

export default CustomSearchField;
