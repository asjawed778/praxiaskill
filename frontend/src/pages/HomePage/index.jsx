import React, { useState } from "react";
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import backgroundVideo from "/video/background_video.mp4";
import BookDemoClass from "../../components/BookDemo/BookDemoClass";
import Courses from "./Carousal";
import Benefits from "./Benefits";
import Collaboration from "./Collaboration";
// import Membership from "../../components/Membership";
import SEOHelmet from "../../SEO/SEOHelmet";
import { generateOrganizationSchema } from "../../SEO/SEOHelper";

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
      <SEOHelmet
        title={"Praxia Skill"}
        description={"Join Praxia Skill for the best Data Analytics program"}
        keywords={"Data Analytics, Praxia Skill"}
        image={backgroundVideo}
        url={"https://praxiaskill.com"}
        robots="index, follow"
        schema={generateOrganizationSchema()}
      />

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

          <Container maxWidth="lg" sx={{ py: 2 }}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              sx={{
                justifyContent: {
                  xs: "center", 
                  md: "space-between", 
                },
              }}
            >
              <Grid item xs={12} md={6}>
                <motion.div variants={itemVariants}>
                  <Typography
                    variant="h4"
                    sx={{ color: "white", fontWeight: 600 }}
                    gutterBottom
                  >
                    Ready For the Future
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ color: "white", fontWeight: 600 }}
                    gutterBottom
                  >
                    At Praxia Skill
                  </Typography>

                  <Typography variant="h6" sx={{ color: "white", mt: 3 }}>
                    Join this 20 weeks, Job-ready Program to master
                  </Typography>
                  <Typography variant="h6" sx={{ color: "white" }}>
                    Data Analytics from scratch with Top Data Analysts
                  </Typography>
                  <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
                    from Microsoft, KPMG, Amazon, and Rapido.
                  </Typography>

                  <Button
                    component={Link}
                    to="/courses"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, borderRadius: 2, px: 4 }}
                  >
                    Explore Program
                  </Button>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={6}>
                <BookDemoClass />
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ mt: 6 }}>
          <Grid container spacing={4} justifyContent="center">
            {["Foundational", "Employability", "Entrepreneurial"].map(
              (skill, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    variants={itemVariants}
                    style={{
                      ...gradientBackground,
                      borderRadius: 16,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        p: 4,
                        boxShadow: 2,
                        height: 200,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        color: "white",
                      }}
                    >
                      <Typography variant="h5" fontWeight="bold">
                        {skill}
                      </Typography>
                      <Typography variant="h5" fontWeight="bold">
                        Skills
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              )
            )}
          </Grid>
        </Container>

        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Courses />
        </Container>

        <Container maxWidth="lg">
          <Benefits />
          <Collaboration />
        </Container>

        {/* <Membership /> */}
      </motion.div>
    </>
  );
}

export default HomePage;
