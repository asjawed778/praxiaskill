import { useForm } from "react-hook-form";
import CustomInputField from "../../components/CustomInputField";
import ModalWrapper from "../../components/ModalWrapper";
import CustomButton from "../../components/CustomButton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSendForgotPasswordOtpMutation } from "../../services/auth.api";
import { Stack } from "@mui/material";
import toast from "react-hot-toast";

const resetSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const ResetPassword = ({ open, onClose }) => {
  const [sendResetLink, {isLoading} ] = useSendForgotPasswordOtpMutation();
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Reset email:", data);
    try {
      await sendResetLink(data).unwrap();
      toast.success("Reset link send to your register email");
    } catch (error) {
      const errorMsg = error?.data?.message ||  "Something went wrong. Please try again!"
      toast.error(errorMsg);
      console.log("Full error object:", error);
    }
  };

  return (
    <ModalWrapper open={open} onClose={onClose} title="Reset Password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <CustomInputField
          name="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          control={control}
        />

        <CustomButton
          type="submit"
          label="Send Reset Link"
          fullWidth
          loading={isLoading}
        />
        </Stack>
      </form>
    </ModalWrapper>
  );
};

export default ResetPassword;
