import { useFormContext, useFieldArray } from "react-hook-form";
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { useState, useEffect } from "react";
import CustomButton from "../../../../../../components/CustomButton";

const TagsInput = () => {
  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext();

  const {
    fields: tags,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const tagValues = getValues("tags");
    if (!tagValues || tagValues.length === 0) {
      setShowInput(true);
    }
  }, [getValues]);

  const handleAddTag = () => {
    const tagInput = document.getElementById("tags");
    if (tagInput && tagInput.value.trim()) {
      append({ value: tagInput.value.trim() });
      tagInput.value = "";
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        Tags
        <Box component="span" sx={{ color: "error.main" }}>
          *
        </Box>
      </Typography>

      {showInput ? (
        <TextField
          id="tags"
          size="small"
          placeholder="Enter Tags"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddTag();
            }
          }}
        />
      ) : (
        <CustomButton 
          label="Add More Tags"
          variant="outlined"
          onClick={() => setShowInput(true)}
        />
      )}

      {tags?.length > 0 && (
        <Box
          display="flex"
          flexWrap="wrap"
          gap={1}
          border="1px solid #ccc"
          p={1}
          borderRadius={1}
        >
          {tags.map((field, index) => (
            <Box
              key={field.id}
              display="flex"
              alignItems="center"
              gap={1}
              px={2}
              py={0.5}
              bgcolor="#D0D7EFB2"
              borderRadius={20}
            >
              <Typography>{field.value}</Typography>
              <IconButton onClick={() => remove(index)} size="small" sx={{ p: 0.5 }}>
                <RxCross2 />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {errors?.tags && (
        <Typography variant="caption" color="error">
          {errors.tags.message}
        </Typography>
      )}
    </Box>
  );
};

export default TagsInput;
