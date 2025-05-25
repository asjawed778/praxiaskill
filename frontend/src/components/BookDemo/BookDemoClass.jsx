import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInputField from "@/components/CustomInputField";
import { EnquirySchema } from "../../../yup";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useSendEnquiryMutation } from "../../services/course.api";
import { toast } from "react-hot-toast";

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
    console.log("Data: ", data);

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
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        px: 2,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 3,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h6" color="primary" gutterBottom>
          Book a Live Class, For Free!
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
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
              />
            }
            label="Send me an update on WhatsApp"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            sx={{ height: 40 }}
          >
            {isLoading ? <CircularProgress size={20} /> : "Submit"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default BookDemoClass;
