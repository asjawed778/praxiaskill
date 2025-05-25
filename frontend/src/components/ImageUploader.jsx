import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller, useFormContext } from "react-hook-form";
import { useAppTheme } from "@/context/ThemeContext";
import { CloudUploadOutlined } from "@mui/icons-material";
import { useUploadThumbnailMutation } from "../services/course.api";

const ImageUploader = ({
  name,
  label = "Upload Photo",
  control,
  maxSizeMB = 2,
  minWidth = 300,
  minHeight = 300,
  width = 150,
  height = 150,
  required = true,
  acceptedTypes = ["image/jpeg", "image/png", "image/jpg"],
}) => {
  const { control: contextControl } = useFormContext();
  const activeControl = control || contextControl;
  const { colors } = useAppTheme();

  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
//   const [uploadImage, { isLoading: isUploading }] = useUploadFileMutation();
const [uploadImage, { isLoading: isUploading }] =
      useUploadThumbnailMutation();

  const handleFileChange = async (file, onChange) => {
    setError(null);
    setLoading(true);

    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
    const validExtensions = ["jpeg", "jpg", "png"];

    if (
      !file.type ||
      !acceptedTypes.includes(file.type) ||
      !validExtensions.includes(fileExtension)
    ) {
      setError("Only JPEG, JPG and PNG images are allowed.");
      setLoading(false);
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Image size must be less than ${maxSizeMB}MB.`);
      setLoading(false);
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = async () => {
      if (img.width < minWidth || img.height < minHeight) {
        setError(`Minimum dimensions are ${minWidth}x${minHeight}px.`);
        URL.revokeObjectURL(objectUrl);
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await uploadImage(formData).unwrap();
        const uploadedUrl = response?.data?.url;

        if (uploadedUrl) {
          onChange(uploadedUrl);
          setPreviewUrl(uploadedUrl);
        }

        setLoading(false);
      } catch (error) {
        setError("Upload failed. Please try again.");
        console.error(error);
        setLoading(false);
      }
    };

    img.onerror = () => {
      setError("Invalid image file.");
      setLoading(false);
    };

    img.src = objectUrl;
  };

  const handleDelete = (onChange) => {
    setPreviewUrl(null);
    onChange("");
    setError(null);
  };

  return (
    <Controller
      name={name}
      control={activeControl}
      defaultValue=""
      render={({ field: { onChange }, fieldState: { error: fieldError } }) => (
        <Box display="flex" flexDirection="column" alignItems="center">
          {label && (
            <Typography variant="subtitle1">
              {label}
              {required && (
                <span style={{ color: colors.error }}>*</span>
              )}
            </Typography>
          )}
          <input
            type="file"
            accept={acceptedTypes.join(",")}
            ref={fileInputRef}
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileChange(file, onChange);
            }}
          />

          <Box
            onClick={() =>
              !previewUrl && !isUploading && fileInputRef.current?.click()
            }
            sx={{
              width,
              height,
              border: previewUrl ? "none" : `2px dashed ${colors.primary}`,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              cursor: !previewUrl && !isUploading ? "pointer" : "not-allowed",
              backgroundColor: previewUrl ? colors.background : "transparent",
              overflow: "hidden",
              position: "relative",
              "&:hover": {
                backgroundColor: !previewUrl
                  ? colors.uploadFileHover
                  : "transparent",
              },
            }}
          >
            {loading || isUploading ? (
              <CircularProgress />
            ) : previewUrl ? (
              <Box
                component="img"
                src={previewUrl}
                alt="Uploaded"
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <>
                <CloudUploadOutlined
                  fontSize="large"
                  sx={{ color: colors.primary, mb: 2 }}
                />
                <Typography variant="body2" sx={{ color: colors.primary }}>
                  Click to upload
                </Typography>
              </>
            )}
          </Box>

          {previewUrl && (
            <IconButton
              onClick={() => handleDelete(onChange)}
              size="small"
              sx={{ mt: 1 }}
            >
              <DeleteIcon color="error" />
            </IconButton>
          )}

          {fieldError?.message && (
            <Typography variant="body2" color="error" textAlign="center">
              {fieldError.message}
            </Typography>
          )}
          {error && (
            <Typography variant="body2" color="error" textAlign="center">
              {error}
            </Typography>
          )}
        </Box>
      )}
    />
  );
};

export default ImageUploader;
