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
import { useSendEnquiryMutation } from "@/services/course.api";
import { toast } from "react-hot-toast";
import { EnquirySchema } from "../../../yup";
import CustomInputField from "@/components/CustomInputField";
import CustomButton from "../../components/CustomButton";

function WhatsAppCheckbox() {
  const { register, watch } = useFormContext();
  const whatsAppOptIn = watch("whatsAppOptIn", true);

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...register("whatsAppOptIn")}
          checked={whatsAppOptIn}
          sx={{
            color: "primary.main",
            p: 0.5,
            alignSelf: "flex-start",
          }}
        />
      }
      label={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "left", lineHeight: 1.2 }}
          >
            Send me an update on WhatsApp
          </Typography>
        </Box>
      }
      sx={{
        alignItems: "center",
        m: 0,
        p: 0,
      }}
    />
  );
}

export default function EnquiryForm({ onClose }) {
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(EnquirySchema),
    defaultValues: {
      whatsAppOptIn: true,
    },
  });

  const { handleSubmit, reset } = methods;

  const [sendEnquiry, { isLoading }] = useSendEnquiryMutation();

  const onSubmit = async (data) => {
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
        <Typography 
          sx={{
            fontSize: {
              xs: "20px", 
            },
            color: "primary.main",
            fontWeight: 600,
            textAlign: "center",
            mb: 1
          }}
        >
          Book a Live Class, For Free!
        </Typography>
        <Stack spacing={2}>
          <CustomInputField label="Full Name" name="name" />

          <CustomInputField label="Education" name="education" />
          <CustomInputField label="Phone No" name="phone" />
          <CustomInputField label="Email Id" name="email" type="email" />
          <CustomInputField label="Interested Course" name="interestedCourse" />
          <WhatsAppCheckbox />
          <CustomButton
            fullWidth
            label="Submit"
            variant="contained"
            color="primary"
            type="submit"
            loading={isLoading}
          />
        </Stack>
      </form>
    </FormProvider>
  );
}
