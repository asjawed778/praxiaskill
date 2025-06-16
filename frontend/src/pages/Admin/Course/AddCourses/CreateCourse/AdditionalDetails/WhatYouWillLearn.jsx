import { useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Box, IconButton } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import CustomButton from "@/components/CustomButton";
import CustomInputField from "@/components/CustomInputField";
import { Delete } from "@mui/icons-material";

const WhatYouWillLearn = () => {
  const {
    control,
    clearErrors,
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "whatWillYouLearn",
  });

  useEffect(() => {
    if (fields.length === 0) {
      append("");
    }
  }, [fields, append]);

  const addItem = () => {
    clearErrors("whatWillYouLearn");
    append("");
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {fields.map((field, index) => (
        <Box key={field.id} display="flex" flexDirection="column" gap={1}>
          <Box display="flex" alignItems="center" gap={1}>
            <CustomInputField
              name={`whatWillYouLearn.${index}`}
              label="What You Will Learn?"
              placeholder={`What you will learn ${index + 1}`}
            />
            {fields.length > 1 && (
              <IconButton
                onClick={() => remove(index)}
                color="error"
                size="small"
              >
                <Delete />
              </IconButton>
            )}
          </Box>
        </Box>
      ))}

      <CustomButton
        label="Add More Point"
        variant="outlined"
        startIcon={<FaPlus />}
        onClick={addItem}
      />
    </Box>
  );
};

export default WhatYouWillLearn;
