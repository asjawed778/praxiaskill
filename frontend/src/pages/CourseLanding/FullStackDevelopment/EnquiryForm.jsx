import { useForm, FormProvider, useFormContext } from "react-hook-form";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  CircularProgress,
  Stack,
  Box,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSendEnquiryMutation } from "../../../services/course.api";
import { toast } from "react-hot-toast";
import { EnquirySchema } from "../../../../yup";
import CustomInputField from "@/components/CustomInputField";

function WhatsAppCheckbox() {
  const { register, watch } = useFormContext();
  const whatsAppOptIn = watch("whatsAppOptIn", true); // Watch the value of "whatsAppOptIn"

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...register("whatsAppOptIn")} // Register the checkbox with react-hook-form
          checked={whatsAppOptIn} // Use the watched value here
          sx={{ color: "primary.main" }}
        />
      }
      label={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textAlign: "start",
              display: "inline-block",
            }}
          >
            Send me an update on WhatsApp
          </Typography>
        </Box>
      }
      sx={{ justifyContent: "flex-start" }} // Aligns the entire label and checkbox to the left
    />
  );
}

export default function EnquiryForm({ onClose }) {
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(EnquirySchema),
    defaultValues: {
      whatsAppOptIn: true,
    },
  });

  const { handleSubmit, reset } = methods;

  const [sendEnquiry, { isLoading }] = useSendEnquiryMutation();

  const onSubmit = async (data) => {
    console.log("Enquiry data: ", data);

    try {
      const res = await sendEnquiry(data).unwrap();
      if (res?.success) {
        onClose();
        reset();
        toast.success("Enquiry sent successfully!");
      }
    } catch (err) {
      toast.error("Something wrong please try again!");
      const error = JSON.parse(err?.message);
      console.error("Error sending enquiry message", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Typography variant="h6" color="primary" mb={2}>
          Book a Live Class, For Free!
        </Typography>
        <CustomInputField label="Full Name" name="name" />

        <CustomInputField label="Education" name="education" />
        <CustomInputField label="Phone No" name="phone" />
        <CustomInputField label="Email Id" name="email" type="email" />
        <CustomInputField label="Interested Course" name="interestedCourse" />
        <WhatsAppCheckbox />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={isLoading}
          sx={{ height: "40px" }}
        >
          {isLoading ? (
            <CircularProgress size={22} sx={{ color: "white" }} />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </FormProvider>
  );
}
