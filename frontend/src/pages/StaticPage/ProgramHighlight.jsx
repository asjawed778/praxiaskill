// ProgramHighlights.jsx
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  Container,
  Stack,
} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";
import CheckIcon from "@mui/icons-material/Check";

const ProgramHighlights = () => {
  // Program highlight items data
  const highlights = [
    {
      icon: <AutoStoriesIcon fontSize="large" sx={{ color: "#9c6dff" }} />,
      title: "52+ Live",
      subtitle: "Mentor Sessions",
    },
    {
      icon: <AssignmentIcon fontSize="large" sx={{ color: "#9c6dff" }} />,
      title: "30+ Projects",
      subtitle: "and Assignments",
    },
    {
      icon: <WorkIcon fontSize="large" sx={{ color: "#9c6dff" }} />,
      title: "2 Mini",
      subtitle: "Hackathons",
    },
    {
      icon: <SchoolIcon fontSize="large" sx={{ color: "#9c6dff" }} />,
      title: "150+ Hours of",
      subtitle: "recorded content",
    },
    {
      icon: <SmartToyIcon fontSize="large" sx={{ color: "#9c6dff" }} />,
      title: "Master 20+ AI",
      subtitle: "Tools",
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "black",
        py: 8,
        color: "white",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          fontWeight="bold"
          sx={{ mb: 6 }}
        >
          Program Highlights
        </Typography>

        <Grid container spacing={2} justifyContent="center" sx={{ mb: 6 }}>
          {highlights.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={2.4}
              key={index}
              sx={{ display: "flex" }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  p: 3,
                  bgcolor: "rgba(54, 15, 95, 0.5)",
                  background:
                    "linear-gradient(145deg, rgba(85, 25, 139, 0.7) 0%, rgba(43, 10, 84, 0.7) 100%)",
                  color: "#ffffff",
                  borderRadius: 2,
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  width: "200px",
                  height: "150px", // ensures equal height
                }}
              >
                <Box
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    color: "#ffffff",
                    borderRadius: 2,
                    p: 1,
                    mb: 2,
                    width: 60,
                    height: 60,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {item.icon}
                </Box>
                <Typography variant="h6" component="h3" fontWeight="bold">
                  {item.title}
                </Typography>
                <Typography variant="body1">{item.subtitle}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Button
            variant="contained"
            size="large"
            endIcon={<SendIcon />}
            sx={{
              bgcolor: "#9c27b0",
              borderRadius: 8,
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              "&:hover": {
                bgcolor: "#7b1fa2",
              },
            }}
          >
            Apply Now
          </Button>
        </Box>

        <Stack
          direction="row"
          spacing={4}
          justifyContent="center"
          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CheckIcon sx={{ color: "#4caf50", mr: 1, fontSize: "1.2rem" }} />
            <Typography variant="body2">Trusted by 500+ Learners</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CheckIcon sx={{ color: "#4caf50", mr: 1, fontSize: "1.2rem" }} />
            <Typography variant="body2">Rated 4.5/5</Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default ProgramHighlights;
