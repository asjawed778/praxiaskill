import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Typography,
  Alert,
  IconButton,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller, useFormContext } from "react-hook-form";
import { useAppTheme } from "@/context/ThemeContext";
import { useUploadFileMutation } from "../services/course.api";

const FileUploader = ({
  name,
  label = "Upload Pdf", 
  dropzoneLabel = "Drag & drop PDF here, or click to select", 
  maxSizeMB = 5,
  control,
  required = true
}) => {
  const { control: formControl } = useFormContext();
  const activeControl = control || formControl;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const [uploadFile, { isLoading, isError, error: uploadError }] =
    useUploadFileMutation();
  const [localError, setLocalError] = useState("");

  const { colors } = useAppTheme();

  return (
    <Controller
      name={name}
      control={activeControl}
      defaultValue={null}
      // rules={required ? { required: "This field is required." } : {}}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const onDrop = useCallback(
          async (acceptedFiles, fileRejections) => {
            setLocalError("");

            if (fileRejections.length > 0) {
              const err = fileRejections[0].errors[0];
              if (err.code === "file-invalid-type") {
                setLocalError("Only PDF files are allowed.");
              } else if (err.code === "file-too-large") {
                setLocalError(`File size exceeds ${maxSizeMB}MB.`);
              }
              return;
            }

            const file = acceptedFiles[0];
            if (!file) return;

            try {
              const formData = new FormData();
              formData.append("file", file);

              const response = await uploadFile(formData).unwrap();
              const uploadedUrl = response?.data?.url;
              if (uploadedUrl) {
                onChange(uploadedUrl);
              }
            } catch (e) {
              setLocalError("Upload failed. Please try again.");
            }
          },
          [uploadFile, onChange]
        );

        const handleRemove = () => {
          onChange(null);
        };

        const { getRootProps, getInputProps, isDragActive } = useDropzone({
          onDrop,
          accept: { "application/pdf": [".pdf"] },
          multiple: false,
          maxSize: maxSizeBytes,
        });

        return (
          <Box>
            {/* Top label */}
            <Typography mb={1}>
              {label}
              {required && <span style={{ color: "red" }}>{" *"}</span>}
            </Typography>

            {!value ? (
              <Box
                {...getRootProps()}
                sx={{
                  border: `2px dashed ${colors.primary}`,
                  borderRadius: "8px",
                  padding: 1,
                  textAlign: "center",
                  cursor: "pointer",
                  bgcolor: isDragActive ? colors.primary : "transparent",
                  transition: "0.3s",
                  position: "relative",
                  minHeight: 100,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: colors.uploadFileHover,
                  },
                }}
              >
                <input {...getInputProps()} />
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <>
                    <PictureAsPdfIcon
                      fontSize="large"
                      sx={{ color: colors.error }}
                    />
                    <Typography variant="body1" mt={1}>
                      {dropzoneLabel}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      (PDF only, Max size {maxSizeMB}MB)
                    </Typography>
                  </>
                )}
              </Box>
            ) : (
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    width: "100%",
                  }}
                >
                  <PictureAsPdfIcon sx={{ color: colors.error }} />
                  <Typography
                    sx={{
                      maxWidth: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {typeof value === "string"
                      ? value.split("/").pop()
                      : "Uploaded PDF"}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => window.open(value, "_blank")}
                  >
                    Preview PDF
                  </Button>
                  <IconButton
                    onClick={handleRemove}
                    aria-label="Remove PDF"
                    sx={{ color: colors.error }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Paper>
            )}

            {/* {(localError || error?.message) && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {localError || error?.message}
              </Alert>
            )} */}
            {error?.message && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error?.message}
              </Alert>
            )}
            {localError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {localError }
              </Alert>
            )}
          </Box>
        );
      }}
    />
  );
};

export default FileUploader;
