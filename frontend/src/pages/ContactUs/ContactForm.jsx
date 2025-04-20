import React, { useState } from "react";
import { useForm, Controller, set } from "react-hook-form";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { InsertEmoticon as EmojiIcon } from "@mui/icons-material";
import { useAppTheme } from "../../context/ThemeContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactUsSchema } from "../../pages/ContactUs/contactUsSchema";
import toast from "react-hot-toast";
import CustomInputField from "../../components/CustomInputField";
import CustomButton from "../../components/CustomButton";
import { useContactUsMutation } from "../../services/contactApi";

const formFields = [
  {
    name: "name",
    label: "Your Name",
    placeholder: "Enter Name here",
    gridSize: { xs: 12, md: 6 },
  },
  {
    name: "email",
    label: "Your Email",
    placeholder: "abc@gmail.com",
    gridSize: { xs: 12, md: 6 },
  },
  {
    name: "subject",
    label: "Interested Subject",
    placeholder: "Enter Subject Name",
    gridSize: { xs: 12 },
  },
];

const textFieldStyles = {
  "& .MuiInput-underline:before": {
    borderBottomColor: "colors.primary",
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottomColor: "white",
  },
};

const ContactForm = () => {
  const { colors } = useAppTheme();
  const [sendMessage, { isLoading }] = useContactUsMutation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactUsSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await sendMessage(data).unwrap();
      if (response.message) {
        toast.success("Your Message submitted successfully!");
        reset();
      } else {
        toast.error(
          response.data.message || "Error submitting Message."
        );
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred.";
      toast.error(errorMessage || "Network Error. Please try again later.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
      <Grid container spacing={3}>
        {/* Render standard form fields */}
        {formFields.map((field) => (
          <Grid size={{ ...field.gridSize }} key={field.name}>
            <Typography variant="caption" color="textSecondary">
              {field.label}
              <Box component="span" sx={{ color: "error.main" }}>
                {" *"}
              </Box>
            </Typography>
            <Controller
              name={field.name}
              control={control}
              rules={field.rules}
              render={({ field: fieldProps }) => (
                <TextField
                  {...fieldProps}
                  fullWidth
                  variant="standard"
                  placeholder={field.placeholder}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message}
                  sx={textFieldStyles}
                />
              )}
            />
          </Grid>
        ))}
        <Grid size={{ xs: 12 }}>
          <Typography variant="caption" color="textSecondary">
            Message
            <Box component="span" sx={{ color: "error.main" }}>
              {" *"}
            </Box>
          </Typography>
          <Controller
            name="message"
            control={control}
            rules={{ required: "Message is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                variant="standard"
                multiline
                rows={4}
                placeholder="Write here your message"
                error={!!errors.message}
                helperText={errors.message?.message}
                sx={textFieldStyles}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end"></InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomButton
            label="Send Message"
            type="submit"
            variant="contained"
            color="primary"
            loading={isLoading}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactForm;
