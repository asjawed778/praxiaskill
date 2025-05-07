import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Stack, useTheme, Fade } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CustomButton from "@/components/CustomButton";
import ModalWrapper from "@/components/ModalWrapper";
import EnquiryForm from "./EnquiryForm";
import CourseHighlights from "./CourseHighlights";
const HeroSection = ({ syllabusRef, course }) => {
  const [animateBadge, setAnimateBadge] = useState(false);
  const [openEnquiry, setOpenEnquiry] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimateBadge(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

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
      <Box>
        <Box
          sx={{
            background: "radial-gradient(circle at top left, #0f172a, #1e293b)",
            color: "white",
            py: { xs: 6, sm: 8, md: 12 },
            px: { xs: 2, sm: 4, md: 8, lg: 12 },
            minHeight: { xs: "auto" },
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Background glow */}
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

          <Grid
            container
            spacing={{ xs: 4, md: 8 }}
            alignItems="center"
            zIndex={2}
            position="relative"
            sx={{
              mx: { xs: 0, sm: 2, md: 4 },
            }}
          >
            {/* LEFT - Course Info */}
            <Grid size={{ xs: 12, md: 6 }} order={{ xs: 2, md: 1 }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Typography
                  fontWeight="bold"
                  fontSize={{ xs: "24px", sm: "36px", md: "44px" }}
                  lineHeight={1.2}
                >
                  {course?.title}
                </Typography>

                <Typography
                  variant="body1"
                  color="grey.300"
                  fontSize={{ xs: "16px", md: "18px" }}
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
                    label="Enquiry Now"
                    variant="contained"
                    onClick={handleEnquiry}
                    sx={{
                      height: "42px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      background: "linear-gradient(135deg, #ef4444, #f97316)",
                      color: "white",
                      borderRadius: 3,
                      boxShadow: "0 8px 30px rgba(239, 68, 68, 0.4)",
                      textTransform: "none",
                      animation: "pulse 1.5s infinite",
                      "@keyframes pulse": {
                        "0%": { boxShadow: "0 0 0 0 rgba(239, 68, 68, 0.5)" },
                        "70%": { boxShadow: "0 0 0 15px rgba(239, 68, 68, 0)" },
                        "100%": { boxShadow: "0 0 0 0 rgba(239, 68, 68, 0)" },
                      },
                      "&:hover": {
                        transform: "scale(1.05)",
                        transition: "0.3s",
                      },
                      width: { xs: "100%", sm: "auto" },
                    }}
                  />

                  <CustomButton
                    label="View Curriculum"
                    variant="outlined"
                    size="large"
                    color="inherit"
                    onClick={handleScrollToSyllabus}
                    sx={{
                      fontWeight: "bold",
                      height: "42px",
                      fontSize: "14px",
                      borderColor: "white",
                      borderRadius: 3,
                      color: "white",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                      },
                      width: { xs: "100%", sm: "auto" },
                    }}
                  />
                </Stack>
              </Stack>
            </Grid>

            {/* RIGHT - Thumbnail */}
            <Grid
              size={{ xs: 12, md: 6 }}
              order={{ xs: 1, md: 2 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{ position: "relative", width: "100%", maxWidth: "500px" }}
              >
                {/* Show Offer Badge */}
                {/* <Box
                sx={{
                  position: 'absolute',
                  top: { xs: 5, sm: 10 },
                  right: { xs: 5, sm: 10 },
                  background: 'linear-gradient(135deg, #ef4444, #f97316)',
                  color: 'white',
                  px: { xs: 1.5, sm: 2 },
                  py: 0.5,
                  borderRadius: '999px',
                  fontWeight: 'bold',
                  fontSize: { xs: 12, sm: 14 },
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  animation: animateBadge
                    ? 'bounceIn 0.7s ease-out forwards, bounce 2s 1s infinite'
                    : 'none',
                  opacity: 0,
                  '@keyframes bounceIn': {
                    '0%': { transform: 'scale(0.3)', opacity: 0 },
                    '50%': { transform: 'scale(1.1)', opacity: 1 },
                    '70%': { transform: 'scale(0.95)' },
                    '100%': { transform: 'scale(1)', opacity: 1 },
                  },
                  '@keyframes bounce': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                  },
                }}
              >
                <LocalOfferIcon sx={{ fontSize: { xs: 16, sm: 18 } }} /> 30% OFF
              </Box> */}

                {/* Thumbnail */}
                <Grid
                  item
                  xs={12} 
                  sm={6} 
                  md={4} 
                >
                  <Box
                    component="img"
                    src={course?.thumbnail}
                    alt="Course Thumbnail"
                    sx={{
                      width: "100%",
                      height: { xs: "180px", md: "260px" },
                      aspectRatio: "500/220",
                      objectFit: "cover",
                      borderRadius: 4,
                      boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
                      transition: "transform 0.4s ease",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  />
                </Grid>
              </Box>
            </Grid>
          </Grid>

          <ModalWrapper open={openEnquiry} onClose={handleClose} title="">
            <EnquiryForm onClose={handleClose} />
          </ModalWrapper>
        </Box>
        <CourseHighlights />
      </Box>
    </Fade>
  );
};

export default HeroSection;
