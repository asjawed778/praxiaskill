import { Box, Typography, Grid, Card, Container } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const ProgramHighlights = ({ course }) => {
  const formatValue = (value) =>
    value < 5 ? `${value}` : `${Math.floor(value / 5) * 5}+`;

  const rawHighlights = [
    {
      icon: <AutoStoriesIcon fontSize="large" sx={{ color: "#9c6dff" }} />,
      value: course?.totalLectures,
      title: `${formatValue(course?.totalLectures)} Live`,
      subtitle: "Mentorship Sessions",
    },
    {
      icon: <AssignmentIcon fontSize="large" sx={{ color: "#9c6dff" }} />,
      value: course?.totalAssignments + course?.totalProjects,
      title: `${formatValue(
        course?.totalAssignments + course?.totalProjects
      )} Projects`,
      subtitle: "and Real-World Assignments",
    },
    {
      icon: <WorkIcon fontSize="large" sx={{ color: "#9c6dff" }} />,
      value: course?.totalProjects,
      title: `${formatValue(course?.totalProjects)} Major+Minor`,
      subtitle: "Capstone Projects",
    },
    {
      icon: <SchoolIcon fontSize="large" sx={{ color: "#9c6dff" }} />,
      value: course?.totalLectures * 4,
      title: `${formatValue(course?.totalLectures * 4)} Hours of`,
      subtitle: "Recorded Content",
    },
    {
      icon: <SmartToyIcon fontSize="large" sx={{ color: "#9c6dff" }} />,
      value: Array.isArray(course?.tools) ? course.tools.length : 0,
      title: `${formatValue(course?.tools?.length || 0)} Tools`,
      subtitle: "Learn and Explore",
    },
  ];
  const highlights = rawHighlights.filter((item) => item.value > 0);

  return (
    <Box
      sx={{
        bgcolor: "black",
        mt: 2,
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
          {highlights.map((item, index) => (
            <Grid
              item
              xs={6}
              sm={4}
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
                  sx={{
                    fontSize: { xs: "0.65rem", md: "0.9rem" },
                    mt: 0.5,
                  }}
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
