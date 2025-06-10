import { useEffect } from "react";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import { Box, IconButton } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import CustomInputField from "@/components/CustomInputField";
import CustomButton from "@/components/CustomButton";
import { Delete } from "@mui/icons-material";

const AddKeyPoints = () => {
  const { control, clearErrors } = useFormContext();

  const {
    fields: keypoints,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "keypoints",
  });

  useEffect(() => {
    if (keypoints.length === 0) {
      append("");
    }
  }, [keypoints, append]);

  const keypointValues = useWatch({ control, name: "keypoints" });

  const addKeypoint = () => {
    const last = keypointValues?.[keypointValues.length - 1];
    if (!last || last.trim() === "") return;
    clearErrors("keypoints");
    append("");
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {keypoints.map((field, index) => (
        <Box key={field.id} display="flex" flexDirection="column" gap={1}>
          <Box display="flex" alignItems="center" gap={1}>
            <CustomInputField
              name={`keypoints.${index}`}
              label="Key Points"
              placeholder={`Key Point ${index + 1}`}
            />
            {keypoints.length > 1 && (
              <IconButton
                onClick={() => remove(index)}
                color="error"
                size="small"
                sx={{ mt: 0 }}
              >
                <Delete />
              </IconButton>
            )}
          </Box>
        </Box>
      ))}

      <CustomButton
        label="Add more keypoint"
        variant="outlined"
        startIcon={<FaPlus />}
        onClick={addKeypoint}
      />
    </Box>
  );
};

export default AddKeyPoints;
