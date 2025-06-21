import { useForm } from "react-hook-form";
import CustomInputField from "../../components/CustomInputField";
import ModalWrapper from "../../components/ModalWrapper";
import CustomButton from "../../components/CustomButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { useResetPasswordMutation } from "../../services/auth.api";
import { Stack } from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updatePasswordSchema } from "../../../yup";

const UpdatePassword = ({ open, onClose, token }) => {
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(updatePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      await resetPassword({ token, data }).unwrap();
      toast.success("Password Updated Successfully");
      navigate("/auth");
      onClose();
    } catch (error) {
      const errorMsg =
        error?.data?.message || "Something went wrong. Please try again!";
      toast.error(errorMsg);
    }
  };

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title="Update Password"
      allowOutsideClick={false}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ paddingBottom: "18px" }}>
          <CustomInputField
            name="newPassword"
            label="New Password"
            placeholder="Enter new password"
            type="password"
            control={control}
          />
          <CustomInputField
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Enter confirm password"
            type="password"
            control={control}
          />
          <CustomButton
            label="Submit"
            type="submit"
            loading={isLoading}
            fullWidth
          />
        </Stack>
      </form>
    </ModalWrapper>
  );
};

export default UpdatePassword;
