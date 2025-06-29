import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Grid,
  Tooltip,
  IconButton,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Image, UploadFile } from "@mui/icons-material";
import VideoUploader from "./VideoUploader";

const Section = ({ courseId, section, courseTitle, index }) => {
  const [expanded, setExpanded] = useState(false);

const handleChange = () => {
  setExpanded(!expanded);
};

  return (
    <Accordion
      expanded={expanded}
      onChange={handleChange}
      sx={{
        borderLeft: "6px solid #00e676",
        borderRadius: 2,
        boxShadow: "0 0 10px rgba(0, 230, 118, 0.2)",
        "&:before": { display: "none" },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "#00e676" }} />}
        sx={{ px: 1}}
      >
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
          <Chip
            label={`Module ${index + 1}`}
            sx={{
              mr: 2,
              bgcolor: "#00e676",
              color: "#000",
              fontWeight: "bold",
            }}
          />
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: { xs: 16, sm: 20 },
            }}
          >
            {section?.title}
          </Typography>
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ px: { xs: 1, sm: 2 } }}>
        {section?.subSections?.map((subSection, subIndex) => (
          <Box
            key={subIndex}
            sx={{
              border: "1px solid #333",
              borderRadius: 2,
              p: 1,
              mb: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "16px", sm: "18px" },
                mb: 1,
              }}
            >
              Subsection {subIndex + 1}: {subSection?.title}
            </Typography>

            <Grid container spacing={2} display="flex" justifyContent="space-between">
              <Grid item xs={12} sm={6} md={4}>
                <Tooltip title="Upload Image">
                  <Box>
                    <Typography variant="subtitle2" sx={{  mb: 1 }}>
                      Content Image
                    </Typography>
                    <IconButton
                      color="primary"
                      component="label"
                      sx={{
                        border: "1px dashed #00e676",
                        width: 48,
                        height: 48,
                      }}
                    >
                      <Image />
                    </IconButton>
                  </Box>
                </Tooltip>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Tooltip title="Upload Brochure">
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Content Brochure PDF
                    </Typography>
                    <IconButton
                      color="primary"
                      component="label"
                      sx={{
                        border: "1px dashed #00e676",
                        width: 48,
                        height: 48,
                      }}
                    >
                      <UploadFile />
                    </IconButton>
                  </Box>
                </Tooltip>
              </Grid>

              <Grid item xs={12} md={4}>
                <VideoUploader
                  courseId={courseId}
                  sectionId={section?._id}
                  subSectionId={subSection?._id}
                  courseTitle={courseTitle}
                  video={subSection?.video}
                />
              </Grid>
            </Grid>
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default Section;
