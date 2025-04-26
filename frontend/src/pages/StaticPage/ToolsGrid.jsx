import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

// MUI Icons
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CampaignIcon from "@mui/icons-material/Campaign";
import FacebookIcon from "@mui/icons-material/Facebook";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import TimelineIcon from "@mui/icons-material/Timeline";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DataObjectIcon from "@mui/icons-material/DataObject";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// Tool data with icon components
const tools = [
  { name: "ChatGPT", icon: <SmartToyIcon fontSize="large" /> },
  { name: "Google Ads", icon: <CampaignIcon fontSize="large" /> },
  { name: "Facebook Ads", icon: <FacebookIcon fontSize="large" /> },
  { name: "Google Analytics", icon: <QueryStatsIcon fontSize="large" /> },
  { name: "Mixpanel", icon: <TimelineIcon fontSize="large" /> },
  { name: "Matomo", icon: <AnalyticsIcon fontSize="large" /> },
  { name: "Clarity", icon: <VisibilityIcon fontSize="large" /> },
  { name: "Google Tag Manager", icon: <DataObjectIcon fontSize="large" /> },
  { name: "Similar Web", icon: <LanguageIcon fontSize="large" /> },
  { name: "LinkedIn Ads", icon: <LinkedInIcon fontSize="large" /> },
];

const ToolsGrid = () => {
  return (
    <Box sx={{ backgroundColor: "#000", color: "#fff", py: 8, px: 2, textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Master 20+ Tools, Including AI-Powered Platforms
      </Typography>

      <Grid container spacing={6} justifyContent="center" sx={{ mt: 4, mx: 16, }}>
        {tools.map((tool, index) => (
          <Grid key={index} item xs={6} sm={4} md={3} lg={2}>
            <Card
              sx={{
                backgroundColor: "#150d1f",
                color: "#fff",
                borderRadius: 2,
                border: "1px solid rgba(255, 255, 255, 0.5)",
                textAlign: "center",
                py: 3,
                height: "80px",
                width: "100px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              elevation={4}
            >
              {tool.icon}
              </Card>
              <CardContent sx={{ p: 0, mt: 1 }}>
                <Typography variant="body2" fontWeight="medium">
                  {tool.name}
                </Typography>
              </CardContent>
            
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ToolsGrid;
