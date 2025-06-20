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
import * as yup from "yup";
import CustomInputField from "@/components/CustomInputField";
import CustomButton from "@/components/CustomButton";
import loginbro from "@/assets/images/loginbro.png";
import { useLoginMutation } from "../../services/auth.api";
import { useDispatch } from "react-redux";
import { login as loginReducer } from "@/store/reducers/authReducer";
import ResetPassword from "./ResetPassword";
import { useParams } from "react-router-dom";
import UpdatePassword from "./UpdatePassword";

// Validation Schemas
const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});

const signupSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});

const AuthPage = () => {
  const [authType, setAuthType] = useState("login");
  const [openResetPasswordModal, setOpenResetPasswordModal] = useState(false);
  const [token, setToken] = useState(null);
  const theme = useTheme();
  const dispatch = useDispatch();
  const params = useParams();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [login, { isLoading, isError }] = useLoginMutation();
  useEffect(() => {
    const paramToken = params?.token;
    setToken(paramToken);
  }, [params?.token]);
  const methods = useForm({
    resolver: yupResolver(authType === "login" ? loginSchema : signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const toggleAuthType = () => {
    setAuthType((prev) => (prev === "login" ? "signup" : "login"));
    methods.reset();
  };

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
    if (authType === "login") {
      try {
        const res = await login(data);
        if (res?.error) {
          throw new Error(JSON.stringify(res.error));
        }
        if (res?.data?.success) {
          const accessToken = res.data.data.accessToken;
          const refreshToken = res.data.data.refreshToken;
          const user = res.data.data.user;

          dispatch(loginReducer({ accessToken, refreshToken, user }));
          toast.success("User Login successfully");
          navigate("/");
          methods.reset();
        }
      } catch (err) {
        const error = JSON.parse(err?.message);
        if (error.status === 401) {
          toast.error(error.data.message);
        }
        if (error.status === 404) {
          toast.error(error.data.message);
        }
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: "100vh",
          py: 6, // spacing top/bottom
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
          {/* LEFT SECTION: Brand Info */}
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
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Speedy, Easy and Fast
              </Typography>
              <Typography sx={{ maxWidth: 400, mx: "auto" }}>
                Overpay helps you set saving goals, earn cash back offers. Get a
                $20 bonus when you receive qualifying direct deposits.
              </Typography>
              <img
                src={loginbro}
                alt="auth image"
                style={{
                  width: "100%",
                  maxHeight: 250,
                  objectFit: "contain",
                  marginTop: "1.5rem",
                }}
              />
            </Box>
          </Grid>

          {/* RIGHT SECTION: Form First on mobile */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Fade in timeout={400} key={authType}>
              <Box sx={{ maxWidth: 400, mx: "auto" }}>
                <Typography
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
                      loading={isLoading}
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
      {openResetPasswordModal && (
        <ResetPassword
          open={openResetPasswordModal}
          onClose={() => setOpenResetPasswordModal(false)}
        />
      )}
      {/* {token && (
        <UpdatePassword 
          // open={openUpdatePasswordModal}
        />
      )} */}
    </Container>
  );
};

export default AuthPage;
