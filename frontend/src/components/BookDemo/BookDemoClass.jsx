import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInputField from "@/components/CustomInputField";
import { EnquirySchema } from "../../../yup";

import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
} from "@mui/material";
import { useSendEnquiryMutation } from "../../services/course.api";
import { toast } from "react-hot-toast";
import CustomButton from "@/components/CustomButton";

const BookDemoClass = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EnquirySchema),
  });

  const [isChecked, setIsChecked] = useState(false);
  const [sendEnquiry, { isLoading }] = useSendEnquiryMutation();

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    setValue("whatsAppOptIn", e.target.checked);
  };

  const onSubmit = async (data) => {
    try {
      const res = await sendEnquiry(data);
      if (res?.error) throw new Error(JSON.stringify(res.error));

      if (res?.data?.success) {
        toast.success("Enquiry sent successfully!");
        reset();
        setIsChecked(false);
      }
    } catch (err) {
      const error = JSON.parse(err?.message);
      console.error("Error sending enquiry message", error);
      toast.error("Failed to send enquiry");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        // justifyContent: { xs: "center", sm: "flex-end" },
      }}
    >
      <Paper
        elevation={2}
        sx={{
          width: {xs: 320},
          py: 1,
          px: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography 
          sx={{
            fontSize: {
              xs: "18px",
              sm: "18px",
              md: "20px",
              lg: "22px",
              xl: "24px"
            },
            fontWeight: 600,
            textAlign: "center",
            color: "primary.main",
            mb: 1
          }}
        >
          Book a Live Class, For Free!
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}
        >
          <CustomInputField label="Full Name" name="name" control={control} />
          <CustomInputField
            label="Education"
            name="education"
            control={control}
          />
          <CustomInputField
            label="Phone No"
            name="phone"
            type="number"
            control={control}
          />
          <CustomInputField
            label="Email ID"
            name="email"
            type="email"
            control={control}
          />
          <CustomInputField
            label="Interested Course"
            name="interestedCourse"
            control={control}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked}
                onChange={handleCheckboxChange}
                color="primary"
                sx={{
                  p: 0.5, 
                }}
              />
            }
            label={
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: {
                    xs: "0.75rem", 
                    sm: "0.875rem", 
                    md: "1rem", 
                  },
                  lineHeight: 1, 
                }}
              >
                Send me an update on WhatsApp
              </Typography>
            }
            sx={{
              m: 0,
              p: 0,
              alignItems: "center",
              lineHeight: 1,
              "& .MuiFormControlLabel-label": {
                marginTop: 0,
                marginBottom: 0,
              },
            }}
          />

          <CustomButton
            fullWidth
            label="Submit"
            type="submit"
            variant="contained"
            color="primary"
            loading={isLoading}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default BookDemoClass;
