import { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CourseSyllabus = ({ course }) => {
  const [expanded, setExpanded] = useState("");
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (course?.sections?.length === 0) return;

  return (
    <Box
      sx={{
        bgcolor: "#0d0d0d",
        py: 2,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          component="h2"
          sx={{
            color: "#00e676",
            fontWeight: 600,
            fontSize: {
              xs: "32px",
              sm: "36px",
              md: "40px",
              lg: "44px",
              xl: "48px",
            },
            textAlign: "center",
            mb: 2,
          }}
        >
          Course Curriculum
        </Typography>
        {course?.sections?.length > 0 &&
          course?.sections?.map((module, index) => (
            <Accordion
              key={module._id}
              expanded={expanded === module._id}
              onChange={handleChange(module._id)}
              sx={{
                bgcolor: "#1a1a1a",
                mb: 2,
                borderLeft: "6px solid #00e676",
                borderRadius: 2,
                boxShadow: "0 0 10px rgba(0, 230, 118, 0.2)",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#00e676" }} />}
                aria-controls={`${module._id}-content`}
                id={`${module._id}-header`}
                sx={{
                  px: { xs: 1, sm: 2 },
                  py: { xs: 1, sm: 1.5 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Chip
                    label={`Module ${index + 1}`}
                    sx={{
                      mr: 2,
                      // mb: { xs: 1, sm: 0 },
                      bgcolor: "#00e676",
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  />
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: 500,
                      fontSize: { xs: 16, sm: 20 },
                    }}
                  >
                    {module.title}
                  </Typography>
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{ px: { xs: 1, sm: 2 } }}>
                <List dense>
                  {module.subSections.map((point, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircleIcon sx={{ color: "#00e676" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={point.title}
                        primaryTypographyProps={{
                          sx: {
                            color: "#ccc",
                            fontSize: { xs: "16px", md: "18px" },
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>

                {module?.assignments?.length > 0 && (
                  <>
                    <Divider sx={{ my: 2, borderColor: "#333" }} />
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "#00e676", fontWeight: 600 }}
                    >
                      Assignments
                    </Typography>
                    <List dense>
                      {module.assignments?.map((assignment, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <CheckCircleIcon sx={{ color: "#00e676" }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={assignment}
                            sx={{ color: "#ccc" }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}

                {module?.projects?.length > 0 && (
                  <>
                    <Divider sx={{ my: 2, borderColor: "#333" }} />
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "#00e676", fontWeight: 600 }}
                    >
                      Projects
                    </Typography>
                    <List dense>
                      {module.projects?.map((project, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <CheckCircleIcon sx={{ color: "#00e676" }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={project}
                            sx={{ color: "#ccc" }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
      </Container>
    </Box>
  );
};

export default CourseSyllabus;
