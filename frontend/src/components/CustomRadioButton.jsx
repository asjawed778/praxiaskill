import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  useTheme,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const CustomRadioButton = ({
  name,
  label = "Choose any one",
  options,
  control,
  errors,
  fullWidth = true, 
}) => {
  const theme = useTheme();

  const formContext = useFormContext();
  const activeControl = control || formContext.control;
  const actualErrors = errors || formContext.formState.errors;

  return (
    <Box textAlign="left" width="100%">
      <Typography>
        {label}
        <span style={{ color: "red" }}>{" *"}</span>
      </Typography>

      <Controller
        name={name}
        control={activeControl}
        render={({ field }) => (
          <ToggleButtonGroup
            exclusive
            value={field.value}
            size="small"
            onChange={(_, newValue) => {
              if (newValue !== null) field.onChange(newValue);
            }}
            fullWidth={fullWidth} 
          >
            {options.map(({ label, value }) => (
              <ToggleButton
                key={value}
                value={value}
                sx={{
                  flex: fullWidth ? 1 : "unset", 
                  textTransform: "capitalize",
                  border: `1px solid ${theme.palette.divider}`,
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  },
                  fontSize: "14px"
                }}
              >
                {label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        )}
      />

      {actualErrors?.[name] && (
        <Typography color="error" variant="body2">
          {String(actualErrors[name]?.message)}
        </Typography>
      )}
    </Box>
  );
};

export default CustomRadioButton;
