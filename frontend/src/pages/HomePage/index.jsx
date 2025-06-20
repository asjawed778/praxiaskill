import React, { useState } from "react";
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import backgroundVideo from "@/assets/videos/background_video.mp4";
import BookDemoClass from "../../components/BookDemo/BookDemoClass";
import Courses from "./Carousal";
import Benefits from "./Benefits";
import Collaboration from "./Collaboration";
// import Membership from "../../components/Membership";
import SEOHelmet from "../../SEO/SEOHelmet";
import { generateOrganizationSchema } from "../../SEO/SEOHelper";
import CustomButton from "@/components/CustomButton";
import MentorCarousal from "./MentorCarousal";
import SkillsCardSection from "./SkillsCardSection";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.5 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80 },
  },
};

const gradientBackground = {
  background:
    "linear-gradient(to bottom left, #E69CC1, #8C6BED, #426BE1, #4896EC)",
};

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <SEOHelmet />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: -1,
            }}
          >
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <Container
            maxWidth="lg"
            sx={{
              my: { xs: 1, sm: 2 },
              pb: 1,
            }}
          >
            <Grid
              container
              spacing={2}
              alignItems="center"
              alignContent="center"
              sx={{
                justifyContent: {
                  xs: "center",
                  sm: "space-between",
                },
              }}
            >
              <Grid item xs={12} sm={6}>
                <motion.div variants={itemVariants}>
                  <Typography
                    component="h1"
                    sx={{
                      color: "white",
                      fontWeight: 600,
                      fontSize: {
                        xs: "32px",
                        sm: "36px",
                        md: "40px",
                        lg: "44px",
                        xl: "48px",
                      },
                    }}
                  >
                    Ready For the Future <br /> At Praxia Skill
                  </Typography>
                  <Typography
                    component="h2"
                    sx={{
                      fontSize: {
                        xs: "14px",
                        sm: "16px",
                        md: "18px",
                        lg: "20px",
                        xl: "22px",
                      },
                      color: "white",
                      mt: {xs: 1, md: 2},
                      fontWeight: 100,
                    }}
                  >
                    Join this 20 weeks, Job-ready Program to master <br />
                    Data Analytics from scratch with Top Data Analysts <br />
                    from Microsoft, KPMG, Amazon, and Rapido.
                  </Typography>
                  <CustomButton
                    label="Explore Program"
                    component={Link}
                    to="/courses"
                    variant="contained"
                    color="primary"
                    sx={{
                      mt: {xs: 1, md: 2},
                    }}
                  />
                </motion.div>
              </Grid>

              <Grid item xs={12} sm={6}>
                <BookDemoClass />
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Container maxWidth="lg">
          <SkillsCardSection />
        </Container>

        <Container maxWidth="lg">
          <Courses />
        </Container>

        {/* <Container maxWidth="lg"> */}
        <Benefits />
        <MentorCarousal />
        <Collaboration />
        {/* </Container> */}

        {/* <Membership /> */}
      </motion.div>
    </>
  );
}

export default HomePage;
