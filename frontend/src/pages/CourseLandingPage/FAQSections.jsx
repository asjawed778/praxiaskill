import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Paper,
  useMediaQuery,
  useTheme,
  Container,
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

export default function FAQSections({ course }) {
  const [expanded, setExpanded] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.up("md"));
  // const isTablet = useMediaQuery("(max-width:750px)");
  useEffect(() => {
    if (course?.faq?.length > 0) {
      setExpanded(course?.faq[0]?._id);
    }
  }, [course]);
  const handleChange = (panel) => (event, isExpanded) => {
    if (!isExpanded) return;
    setExpanded(panel);
  };

  const currentItem = course?.faq?.find((item) => item._id === expanded);

  if (course?.faq?.length === 0 || !course?.faq) return;

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography
        sx={{
          color: "white",
          textAlign: "center",
          mb: 2,
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
          // flexDirection: isTablet ? "column" : "row",
          flexDirection: {xs: "column", md: "row"},
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
          {/* <img
            src={currentItem?.resourceUrl}
            alt={currentItem?.question}
            style={{
              width: "100%",
              borderRadius: 12,
              objectFit: "cover",
              // height: isMobile ? "220px" : "250px",
              height: {xs: 200, sm: 220,  md: 250}
            }}
          /> */}
          <Box
            sx={{
              width: "100%",
              borderRadius: 2,
              overflow: "hidden",
              height: { xs: 200, sm: 220, md: 250 },
            }}
          >
            <img
              src={currentItem?.resourceUrl}
              alt={currentItem?.question}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
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
    </Container>
  );
}
