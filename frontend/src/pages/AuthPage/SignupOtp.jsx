import { useForm, Controller } from "react-hook-form";
import { Stack, TextField, Divider, Typography } from "@mui/material";
import ModalWrapper from "../../components/ModalWrapper";
import CustomButton from "../../components/CustomButton";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useVerifySignupOtpMutation } from "../../services/auth.api";
import { useDispatch } from "react-redux";
import { login as loginReducer } from "@/store/reducers/authReducer";
import { useNavigate } from "react-router-dom";

const defaultValues = {
  otp: ["", "", "", "", "", ""],
};

const SignupOtp = ({ open, onClose, email }) => {
  const [verifySignupOtp, { isLoading }] = useVerifySignupOtpMutation();
  const { handleSubmit, control, setValue, getValues, watch } = useForm({
    defaultValues,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputsRef = useRef([]);
  const otpValues = watch("otp");


  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const currentOtp = getValues("otp");
    currentOtp[index] = value;
    setValue("otp", currentOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const currentOtp = getValues("otp");
      if (!currentOtp[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const onFormSubmit = async (data) => {
    const finalOtp = data.otp.join("");
    const userRegisterData = { email, otp: finalOtp };
    try {
      const res = await verifySignupOtp(userRegisterData).unwrap();
      const accessToken = res?.data?.accessToken;
      const refreshToken = res?.data?.refreshToken;
      const user = res?.data?.user;

      if (res?.success) {
        dispatch(loginReducer({ accessToken, refreshToken, user }));
        toast.success("User Registerd successfully");
        onClose();
        navigate("/");
      }
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
      title="Verify Your Email"
      allowOutsideClick={false}
    >
      <Divider />
      <Typography variant="body2" color="text.secondary" mb={2} mt={1}>
        A six-digit OTP has been sent to your email. Please enter it below to
        verify your email.
      </Typography>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Stack spacing={2} alignItems="center">
          <Stack direction="row" spacing={1}>
            {[...Array(6)].map((_, index) => (
              <Controller
                key={index}
                name={`otp.${index}`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    inputRef={(el) => (inputsRef.current[index] = el)}
                    value={field.value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    inputProps={{
                      maxLength: 1,
                      style: {
                        width: "20px",
                        height: "20px",
                        fontSize: "16px",
                        textAlign: "center",
                      },
                    }}
                  />
                )}
              />
            ))}
          </Stack>
          <CustomButton
            type="submit"
            label="Verify OTP"
            loading={isLoading}
            disabled={otpValues.some((val) => !val)}
            fullWidth
          />
        </Stack>
      </form>
    </ModalWrapper>
  );
};

export default SignupOtp;
