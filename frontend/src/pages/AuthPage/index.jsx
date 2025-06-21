import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
  Fade,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInputField from "@/components/CustomInputField";
import CustomButton from "@/components/CustomButton";
import loginbro from "@/assets/images/login-amico.svg";
import {
  useLoginMutation,
  useSendSignupOtpMutation,
} from "../../services/auth.api";
import { useDispatch } from "react-redux";
import { login as loginReducer } from "@/store/reducers/authReducer";
import ResetPassword from "./ResetPassword";
import UpdatePassword from "./UpdatePassword";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { loginSchema, signupSchema } from "../../../yup";
import SignupOtp from "./SignupOtp";

const AuthPage = () => {
  const [authType, setAuthType] = useState("login");
  const [email, setEmail] = useState(null);
  const [openResetPasswordModal, setOpenResetPasswordModal] = useState(false);
  const [openUpdatePasswordModal, setOpenUpdatePasswordModal] = useState(false);
  const [openSignupOtpModal, setOpenSignupOtpModal] = useState(false);
  const [token, setToken] = useState(null);
  const theme = useTheme();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [login, { isLoading }] = useLoginMutation();
  const [sendSignupOtp, { isLoading: signupOtpLoading }] =
    useSendSignupOtpMutation();

  useEffect(() => {
    const paramToken = params?.token;
    if (paramToken) {
      setToken(paramToken);
      setOpenUpdatePasswordModal(true);
    }
  }, [params]);

  const methods = useForm({
    resolver: yupResolver(authType === "login" ? loginSchema : signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onTouch"
  });

  const toggleAuthType = () => {
    setAuthType((prev) => (prev === "login" ? "signup" : "login"));
    methods.reset();
  };

  const onSubmit = async (data) => {
    if (authType === "login") {
      try {
        const res = await login(data).unwrap();
        if (res?.success) {
          const accessToken = res?.data?.accessToken;
          const refreshToken = res?.data?.refreshToken;
          const user = res?.data?.user;

          dispatch(loginReducer({ accessToken, refreshToken, user }));
          toast.success("User Login successfully");
          navigate("/");
          methods.reset();
        }
      } catch (error) {
        const errorMsg =
          error?.data?.message || "Something went wrong. Please try again!";
        toast.error(errorMsg);
      }
    }
    if (authType === "signup") {
      try {
        await sendSignupOtp(data).unwrap();
        setEmail(data.email);
        setOpenSignupOtpModal(true);
        toast.success("Successfully send otp on your email");
      } catch (error) {
        const errorMsg =
          error?.data?.message || "Something went wrong. Please try again!";
        toast.error(errorMsg);
      }
    }
  };

  return (
    <>
      <CustomButton
        label="<- Go to Home"
        variant="text"
        onClick={() => navigate("/")}
        sx={{
          fontSize: {
            xs: "14px",
            sm: "15px",
            lg: "16px",
          },
          fontWeight: 500,
          px: 2,
        }}
      />
      <Container maxWidth="md">
        <Box
          sx={{
            minHeight: "100vh",
            py: {xs: 2, sm: 4, lg: 6},
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Grid
            container
            spacing={4}
            direction={isSmallScreen ? "column-reverse" : "row"}
            alignItems="center"
            justifyContent="center"
          >
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box
                sx={{
                  backgroundColor: "#ed1c24",
                  color: "#fff",
                  borderRadius: 2,
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom>
                  Welcome to Praxia Skill
                </Typography>
                <Typography component="h2" sx={{ maxWidth: 400, mx: "auto" }}>
                  Empowering learners through quality, practical education. Join
                  thousands of learners building real-world skills with
                  expert-led courses and hands-on projects.
                </Typography>
                <img
                  src={loginbro}
                  alt="Login Amico"
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: "100%",
                    maxHeight: 250,
                    objectFit: "contain",
                    marginTop: "1.5rem",
                  }}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Fade in timeout={400} key={authType}>
                <Box sx={{ maxWidth: 400, mx: "auto" }}>
                  <Typography component="h2"
                    sx={{
                      fontSize: { xs: "16px", md: "18px" },
                      mb: 2,
                      textAlign: "center",
                    }}
                  >
                    {authType === "login" ? "Sign In to" : "Sign Up for"}{" "}
                    <Box
                      component="span"
                      sx={{ fontWeight: 700, color: "primary.main" }}
                    >
                      Praxia Skill
                    </Box>
                  </Typography>

                  <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                      <Stack spacing={2}>
                        {authType === "signup" && (
                          <>
                            <CustomInputField
                              name="name"
                              label="Full Name"
                              placeholder="Enter your full name"
                            />
                          </>
                        )}

                        <CustomInputField
                          name="email"
                          label="Email"
                          type="email"
                          placeholder="Enter your email"
                        />
                        <CustomInputField
                          name="password"
                          label="Password"
                          type="password"
                          placeholder="Enter your password"
                        />
                      </Stack>

                      {authType === "signup" ? (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                          my={2}
                        >
                          By signing up, you agree to the
                          <Box
                            component="span"
                            sx={{ fontWeight: 700, color: "primary.main" }}
                          >
                            Terms of Service
                          </Box>{" "}
                          and{" "}
                          <Box
                            component="span"
                            sx={{ fontWeight: 700, color: "primary.main" }}
                          >
                            Privacy Policy,
                          </Box>{" "}
                          including{" "}
                          <Box
                            component="span"
                            sx={{ fontWeight: 700, color: "primary.main" }}
                          >
                            Cookie Use.
                          </Box>
                        </Typography>
                      ) : (
                        <Typography
                          onClick={() => setOpenResetPasswordModal(true)}
                          color="secondary"
                          sx={{
                            fontSize: "12px",
                            mt: 0.5,
                            mb: 2,
                            cursor: "pointer",
                            display: "block",
                            textAlign: "right",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}
                        >
                          Forgot Password?
                        </Typography>
                      )}

                      <CustomButton
                        type="submit"
                        label={authType === "login" ? "Sign In" : "Sign Up"}
                        fullWidth
                        loading={isLoading || signupOtpLoading}
                      />
                    </form>
                  </FormProvider>

                  <Typography variant="body2" textAlign="center" mt={2}>
                    {authType === "login"
                      ? "Don't have an account?"
                      : "Already have an account?"}{" "}
                    <Box
                      component="span"
                      fontWeight="bold"
                      sx={{ cursor: "pointer", color: "primary.main" }}
                      onClick={toggleAuthType}
                    >
                      {authType === "login" ? "Sign Up" : "Sign In"}
                    </Box>
                  </Typography>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Box>
      </Container>
      {openResetPasswordModal && (
        <ResetPassword
          open={openResetPasswordModal}
          onClose={() => setOpenResetPasswordModal(false)}
        />
      )}
      {token && openUpdatePasswordModal && (
        <UpdatePassword
          open={openUpdatePasswordModal}
          onClose={() => setOpenUpdatePasswordModal(false)}
          token={token}
        />
      )}
      {openSignupOtpModal && (
        <SignupOtp
          email={email}
          open={openSignupOtpModal}
          onClose={() => setOpenSignupOtpModal(false)}
        />
      )}
    </>
  );
};

export default AuthPage;
