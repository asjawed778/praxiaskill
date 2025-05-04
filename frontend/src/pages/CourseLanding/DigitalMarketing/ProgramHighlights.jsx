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
import CampaignIcon from "@mui/icons-material/Campaign";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SchoolIcon from "@mui/icons-material/School";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const digitalMarketingHighlights = [
  {
    icon: <CampaignIcon fontSize="large" sx={{ color: "#9c6dff" }} />,
    title: "50+ Live",
    subtitle: "Marketing Sessions",
  },
  {
    icon: <TrendingUpIcon fontSize="large" sx={{ color: "#9c6dff" }} />,
    title: "30+ Projects",
    subtitle: "with Real Brands",
  },
  {
    icon: <AutoStoriesIcon fontSize="large" sx={{ color: "#9c6dff" }} />,
    title: "15+ Core Modules",
    subtitle: "incl. SEO, PPC, Analytics",
  },
  {
    icon: <SchoolIcon fontSize="large" sx={{ color: "#9c6dff" }} />,
    title: "150+ Hours of",
    subtitle: "Curated Content",
  },
  {
    icon: <SmartToyIcon fontSize="large" sx={{ color: "#9c6dff" }} />,
    title: "15+ Marketing Tools",
    subtitle: "incl. Google Ads, Meta, SEMrush",
  },
];

const ProgramHighlights = () => {
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
            mb: 6,
            fontSize: { xs: "24px", sm: "36px", md: "44px" },
          }}
        >
          Program Highlights
        </Typography>

        <Grid container spacing={2} justifyContent="center" sx={{ mb: 6 }}>
          {digitalMarketingHighlights.map((item, index) => (
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
