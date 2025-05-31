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
import CheckIcon from "@mui/icons-material/Check";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const ProgramHighlights = ({ course }) => {
  const fullStackHighlights = [
    {
      icon: <AutoStoriesIcon fontSize="large" sx={{ color: "#9c6dff" }} />,
      title: `${Math.floor((course?.totalLectures)/5)*5}+ Live`,
      subtitle: "Mentorship Sessions",
    },
    {
      icon: <AssignmentIcon fontSize="large" sx={{ color: "#9c6dff" }} />,
      title: `${Math.floor((course?.totalAssignments + course?.totalProjects)/5)*5}+ Projects`,
      subtitle: "and Real-World Assignments",
    },
    {
      icon: <WorkIcon fontSize="large" sx={{ color: "#9c6dff" }} />,
      title: `${Math.floor(course?.totalProjects/5)*5}+ Major+Minor`,
      subtitle: "Capstone Projects",
    },
    {
      icon: <SchoolIcon fontSize="large" sx={{ color: "#9c6dff" }} />,
      title: `${Math.floor((course?.totalLectures*4)/5)*5}+ Hours of`,
      subtitle: "Recorded Content",
    },
    {
      icon: <SmartToyIcon fontSize="large" sx={{ color: "#9c6dff" }} />,
      title: `${Array.isArray(course?.tools) ? Math.floor(course.tools?.length/5)*5 : 0}+ Tools`,
      subtitle: "Learn and Explore",
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "black",
        py: 4,
        color: "white",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          component="h2"
          textAlign="center"
          fontWeight="bold"
          sx={{
            mb: 4,
            fontSize: { xs: "24px", sm: "36px", md: "44px" },
          }}
        >
          Program Highlights
        </Typography>

        <Grid container spacing={2} justifyContent="center" sx={{ mb: 6 }}>
          {fullStackHighlights.map((item, index) => (
            <Grid
              item
              xs={6}
              md={3}
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  p: 2,
                  bgcolor: "rgba(54, 15, 95, 0.5)",
                  background:
                    "linear-gradient(145deg, rgba(85, 25, 139, 0.7) 0%, rgba(43, 10, 84, 0.7) 100%)",
                  color: "#ffffff",
                  borderRadius: 2,
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  width: { xs: "150px", md: "200px" },
                  height: { xs: "120px", md: "160px" },
                }}
              >
                <Box
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    color: "#ffffff",
                    borderRadius: 2,
                    p: 1,
                    mb: 1.5,
                    width: { xs: 36, md: 60 },
                    height: { xs: 36, md: 60 },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {item.icon}
                </Box>

                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ fontSize: { xs: "0.75rem", md: "1rem" } }}
                >
                  {item.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: "0.65rem", md: "0.9rem" }, mt: 0.5 }}
                >
                  {item.subtitle}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProgramHighlights;
