import  { useMemo } from "react";
import {
  Autocomplete,
  TextField,
  CircularProgress,
} from "@mui/material";
import {
  Controller,
  useFormContext,
  useFormState,
} from "react-hook-form";
import { useAppTheme } from "@/context/ThemeContext"; 
const getErrorMessage = (errors, name) => {
  const keys = name.split(".");
  let error = errors;
  for (let key of keys) {
    if (error && error[key]) {
      error = error[key];
    } else {
      return undefined;
    }
  }
  return error?.message;
};

const CustomDropdownField = (props) => {
  const {
    label,
    options = [],
    placeholder = "",
    multiple = false,
    disabled = false,
    required = true,
    fullWidth = true,
    loading = false,
    control: incomingControl,
    name,
    value: propValue,
    onChange: propOnChange,
  } = props;

  const formContext = useFormContext();
  const control = incomingControl ?? formContext?.control;
  const isUsingHookForm = !!name && !!control;

  const { colors } = useAppTheme();

  const renderAutocomplete = (value, onChange, errorMsg) => {
    const displayValue = useMemo(() => {
      if (multiple) {
        return options?.filter((opt) =>
          Array.isArray(value) ? value.includes(opt.value) : false
        );
      }
      return options?.find((opt) => opt.value === value) || null;
    }, [value, options, multiple]);

    return (
      <Autocomplete
        multiple={multiple}
        options={options}
        value={displayValue}
        onChange={(_, newValue) => {
          const selected = multiple
            ? newValue.map((opt) => opt?.value)
            : newValue?.value || null;
          onChange(selected);
        }}
        getOptionLabel={(option) => option?.label || ""}
        isOptionEqualToValue={(a, b) => a?.value === b?.value}
        disabled={disabled}
        fullWidth={fullWidth}
        loading={loading}
        loadingText={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <CircularProgress size={20} />
            Loading...
          </div>
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            required={required}
            error={!!errorMsg}
            size="small"
            helperText={errorMsg}
            InputLabelProps={{
              sx: {
                color: colors.inputLabel,
                "&.Mui-focused": {
                  color: colors.inputLabel,
                },
                "& .MuiFormLabel-asterisk": {
                  color: required ? colors.error : "transparent",
                },
              },
            }}
            sx={{
              minWidth: 200,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option?.value}>
            {option?.label}
          </li>
        )}
      />
    );
  };

  if (isUsingHookForm) {
    const { errors } = useFormState({ control });
    const errorMsg = getErrorMessage(errors, name);

    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) =>
          renderAutocomplete(field.value, field.onChange, errorMsg)
        }
      />
    );
  }

  return renderAutocomplete(propValue, propOnChange);
};

export default CustomDropdownField;
