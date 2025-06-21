import { useForm } from "react-hook-form";
import CustomInputField from "../../components/CustomInputField";
import ModalWrapper from "../../components/ModalWrapper";
import CustomButton from "../../components/CustomButton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSendForgotPasswordOtpMutation } from "../../services/auth.api";
import { Stack } from "@mui/material";
import toast from "react-hot-toast";
import { resetPasswordSchema } from "../../../yup";

const ResetPassword = ({ open, onClose }) => {
  const [sendResetLink, { isLoading }] = useSendForgotPasswordOtpMutation();
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      await sendResetLink(data).unwrap();
      toast.success("Reset link send to your register email");
      reset();
    } catch (error) {
      const errorMsg =
        error?.data?.message || "Something went wrong. Please try again!";
      toast.error(errorMsg);
    }
  };

  return (
    <ModalWrapper open={open} onClose={onClose} title="Reset Password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ paddingBottom: "18px" }}>
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
