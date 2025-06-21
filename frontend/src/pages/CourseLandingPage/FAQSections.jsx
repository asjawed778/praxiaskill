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
  boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  "& .MuiAccordionSummary-content": {
    fontWeight: 600,
    fontSize: "1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  },
  "&:before": {
    display: "none",
  },
}));

export default function FAQSections({ course }) {
  const [expanded, setExpanded] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    if (course?.faq?.length > 0) {
      setExpanded(course?.faq[0]?._id);
    }
  }, [course]);

  const handleChange = (panel) => (event, isExpanded) => {
    if (isExpanded) {
      setExpanded(panel);
    }
  };

  const currentItem = course?.faq?.find((item) => item._id === expanded);

  if (!course?.faq?.length) return null;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      <Typography
        component="h2"
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
          textAlign: "center",
          mb: 2,
        }}
      >
        Frequently Asked Questions
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "flex-start",
          justifyContent: "center",
          gap: { xs: 3, md: 5 },
          bgcolor: "#000",
          color: "#fff",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: { xs: "100%", sm: "45%" },
            bgcolor: "#111",
            borderRadius: 2,
            overflow: "hidden",
            maxHeight: 250,
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidht: 400,
              height: "auto",
              borderRadius: 2,
              overflow: "hidden",
              transition: "transform 0.4s ease",
            }}
          >
            <img
              src={currentItem?.resourceUrl}
              alt={currentItem?.question || "Question's Answer"}
              loading="lazy"
              decoding="async"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                display: "block",
                borderRadius: 8,
              }}
            />
          </Box>
        </Paper>
        <Box sx={{ width: { xs: "100%", sm: "55%" } }}>
          {course?.faq?.map((item) => (
            <StyledAccordion
              key={item._id}
              expanded={expanded === item._id}
              onChange={handleChange(item._id)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "14px",
                      sm: "16px",
                      md: "18px",
                      lg: "20px",
                      xl: "22px",
                    },
                    fontWeight: 600,
                  }}
                >
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "14px",
                      sm: "16px",
                      md: "18px",
                      lg: "20px",
                      xl: "22px",
                    },
                    color: "#ccc"
                  }}
                >
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
