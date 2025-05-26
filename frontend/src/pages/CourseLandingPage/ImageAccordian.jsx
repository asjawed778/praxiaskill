import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";



const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: "#1e1e1e",
  color: "#fff",
  border: "1px solid #333",
  borderRadius: "8px !important",
  marginBottom: "12px",
  "& .MuiAccordionSummary-content": {
    fontWeight: 600,
    fontSize: "18px",
  },
  "&:before": {
    display: "none",
  },
}));

export default function ImageAccordion({ course }) {
  const [expanded, setExpanded] = useState();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 
  const isTablet = useMediaQuery(theme.breakpoints.down("md")); 
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const currentItem = course?.faq?.find((item) => item._id === expanded);

  return (
    <Box sx={{
      px: { xs: 2, sm: 3, md: 6 },
          py: { xs: 4, sm: 6, md: 8 },
    }}>
      <Typography
        sx={{
          color: "white",
          textAlign: "center",
          mb: { xs: 4, sm: 6 },
          fontWeight: 500,
          fontSize: {
            xs: "24px",
            sm: "36px",
            md: "44px",
          },
        }}
      >
        Frequently asked questions
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: isTablet ? "column" : "row",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 4,
          bgcolor: "#000",
          color: "#fff",
        }}
      >
        {/* Left Image */}
        <Paper
          elevation={6}
          sx={{
            width: isTablet ? "100%" : "45%",
            bgcolor: "#111",
            p: 2,
            borderRadius: 2,
          }}
        >
          <img
            src={currentItem?.resourceUrl}
            alt={currentItem?.question}
            style={{
              width: "100%",
              borderRadius: 12,
              objectFit: "cover",
              height: isMobile ? "200px" : "300px",
            }}
          />
        </Paper>

        {/* Right Accordion Section */}
        <Box sx={{ width: isTablet ? "100%" : "50%" }}>
          {course?.faq?.map((item) => (
            <StyledAccordion
              key={item._id}
              expanded={expanded === item._id}
              onChange={handleChange(item._id)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
              >
                <Typography>{item.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "#ccc", fontSize: "14px" }}>
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </StyledAccordion>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
