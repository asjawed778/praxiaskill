import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Divider,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import { AddCircleOutline, Close, InfoOutlined } from "@mui/icons-material";
import CustomInputField from "@/components/CustomInputField";
import CustomButton from "@/components/CustomButton";
import ImageUploader from "@/components/ImageUploader";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as MdIcons from "react-icons/md";
const iconLibraries = {
  Fa: FaIcons,
  Si: SiIcons,
  Md: MdIcons,
};

const ToolsGrid = () => {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tools",
  });
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && fields.length === 0) {
      append({ name: "", iconName: null, url: null });
      initialized.current = true;
    }
  }, [fields, append]);

  const tools = watch("tools");

  const getIconComponent = (iconName) => {
    if (!iconName || iconName.length < 3) return null;
    const prefix = iconName.slice(0, 2);
    const lib = iconLibraries[prefix];
    if (!lib || !lib[iconName]) return null;
    return lib[iconName];
  };

  return (
    <Box>
      <Typography variant="h6">Tools You Learn</Typography>
      <Divider sx={{ mb: 2 }} />

      {fields.map((field, index) => {
        const IconComponent = getIconComponent(tools?.[index]?.iconName);
        const iconName = tools?.[index]?.iconName;
        const url = tools?.[index]?.url;
        return (
          <Box
            key={field.id}
            border="1px solid grey"
            borderRadius={2}
            p={2}
            mb={2}
            position="relative"
          >
            {index > 0 && (
              <IconButton
                onClick={() => remove(index)}
                size="small"
                color="error"
                sx={{ position: "absolute", top: 8, right: 8 }}
              >
                <Close />
              </IconButton>
            )}

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInputField
                  name={`tools.${index}.name`}
                  label="Name"
                  placeholder="Enter tool name"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 2,
                  }}
                  required={false}
                />
                {!url && (
                  <>
                    <CustomInputField
                      name={`tools.${index}.iconName`}
                      label="Icon Name"
                      margin="normal"
                      placeholder="React Icon Name (e.g. FaGoogle, FaGithub etc.)"
                      sx={{
                        backgroundColor: "white",
                        borderRadius: 2,
                      }}
                      required={false}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip
                              title="Select icon name from React Icons website"
                              arrow
                            >
                              <IconButton
                                onClick={() =>
                                  window.open(
                                    "https://react-icons.github.io/react-icons",
                                    "_blank"
                                  )
                                }
                                size="small"
                              >
                                <InfoOutlined fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Box mt={2} display="flex" alignItems="center" gap={1}>
                      <Typography>Preview:</Typography>
                      {IconComponent ? (
                        <IconComponent size={30} />
                      ) : iconName ? (
                        <Typography color="error">Icon not found</Typography>
                      ) : (
                        <Typography color="text.secondary" fontStyle="italic">
                          No icon selected
                        </Typography>
                      )}
                    </Box>
                  </>
                )}
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                {!IconComponent && (
                  <ImageUploader
                    name={`tools.${index}.url`}
                    label="Or Upload Icon"
                    maxWidth={100}
                    minHeight={100}
                    width={110}
                    height={100}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
        );
      })}

      <CustomButton
        label="Add More Tool"
        variant="outlined"
        startIcon={<AddCircleOutline />}
        onClick={() => append({ name: "", iconName: null, url: null })}
      />
    </Box>
  );
};

export default ToolsGrid;
