import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Stack,
  useTheme,
  Fade,
  Container,
} from "@mui/material";
import CustomButton from "@/components/CustomButton";
import ModalWrapper from "@/components/ModalWrapper";
import EnquiryForm from "./EnquiryForm";

const HeroSection = ({ syllabusRef, course }) => {
  const [openEnquiry, setOpenEnquiry] = useState(false);

  const handleScrollToSyllabus = () => {
    if (syllabusRef?.current) {
      syllabusRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleEnquiry = () => {
    setOpenEnquiry(true);
  };

  const handleClose = () => setOpenEnquiry(false);

  return (
    <Fade in={true} timeout={1000}>
      <Box
        sx={{
          background: "radial-gradient(circle at top left, #0f172a, #1e293b)",
          color: "white",
          py: { xs: 4, sm: 6, md: 8 },
          minHeight: { xs: "auto" },
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(255, 0, 80, 0.3)",
            filter: "blur(100px)",
            zIndex: 0,
          }}
        />

        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", sm: "row" },
              gap: 4,
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", lg: "flex-start" },
                zIndex: 1,
              }}
            >
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "28px",
                      sm: "32px",
                      md: "36px",
                      lg: "40px",
                      xl: "44px",
                    },
                    fontWeight: 600,
                    color: "white",
                  }}
                >
                  {course?.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: {
                      xs: "14px",
                      sm: "16px",
                      md: "18px",
                      lg: "20px",
                      xl: "22px",
                    },
                    color: "gray.300"
                  }}
                >
                  {course?.subtitle}
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  mt={{ xs: 1, md: 2 }}
                  sx={{ width: "100%" }}
                >
                  <CustomButton
                    label="Enquire Now"
                    variant="contained"
                    size="large"
                    onClick={handleEnquiry}
                    sx={{
                      background: "linear-gradient(135deg, #ef4444, #f97316)",
                      color: "white",
                      boxShadow: "0 8px 30px rgba(239, 68, 68, 0.4)",
                      textTransform: "none",
                      animation: "pulse 2s infinite",
                      "@keyframes pulse": {
                        "0%": { boxShadow: "0 0 0 0 rgba(239, 68, 68, 0.5)" },
                        "70%": { boxShadow: "0 0 0 15px rgba(239, 68, 68, 0)" },
                        "100%": { boxShadow: "0 0 0 0 rgba(239, 68, 68, 0)" },
                      },
                      "&:hover": {
                        transform: "scale(1.05)",
                        transition: "0.3s",
                      },
                    }}
                  />

                  <CustomButton
                    label="View Curriculum"
                    variant="outlined"
                    size="large"
                    color="inherit"
                    onClick={handleScrollToSyllabus}
                  />
                </Stack>
              </Stack>
            </Box>
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" },
                zIndex: 1,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 400,
                  height: "auto",
                  overflow: "hidden",
                  borderRadius: 2,
                  transition: "transform 0.4s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    display: "block",
                    borderRadius: "8px",
                  }}
                  loading="lazy"
                />
              </Box>
            </Box>
          </Box>
        </Container>

        <ModalWrapper open={openEnquiry} onClose={handleClose} title="">
          <EnquiryForm onClose={handleClose} />
        </ModalWrapper>
      </Box>
    </Fade>
  );
};

export default HeroSection;
