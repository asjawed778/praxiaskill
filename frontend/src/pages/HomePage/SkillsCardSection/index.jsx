import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";

const skills = [
  { title: "Foundational", path: "/foundational-skill" },
  { title: "Employability", path: "/employability-skill" },
  { title: "Entrepreneurial", path: "/entrepreneurial-skill" },
];

const SkillCard = ({ title, path }) => (
  <Link to={path} style={{ textDecoration: "none" }}>
    <Card
      sx={{
        backgroundColor: "#C11574",
        color: "white",
        borderRadius: "16px",
        width: "100%",
        height: { xs: "180px", sm: "200px", md: "200px" },
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        px: { xs: 2, sm: 0, md: 2 },
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
      elevation={2}
    >
      {[160, 120, 80, 40].map((size, idx) => (
        <Box
          key={idx}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: size,
            height: size,
            border: "2px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            zIndex: 0,
          }}
        />
      ))}
      {/* Card Content */}
      <CardContent sx={{ zIndex: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: {
              xs: "24px",
              sm: "28px",
              md: "32px",
              lg: "36px",
            },
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: {
              xs: "20px",
              sm: "24px",
            },
            fontWeight: 600,
          }}
        >
          Skills
        </Typography>
      </CardContent>

      {/* Learn More positioned at bottom right */}
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          cursor: "pointer",
          "&:hover": {
            transform: "scale(1.05)",
            transition: "transform 0.2s ease-in-out",
          },
        }}
      >
        <Typography variant="body2" sx={{ mr: 1 }}>
          Learn More
        </Typography>
        <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
      </Box>
    </Card>
  </Link>
);

const SkillsCardSection = () => {
  return (
    <Box>
      <Grid container spacing={2} justifyContent="center" mt={{xs: 4, md: 6, xl: 8}}>
        {skills.map((skill, index) => (
          <Grid size={{ xs: 12, sm: 4 }} key={index}>
            <SkillCard title={skill.title} path={skill.path} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SkillsCardSection;
