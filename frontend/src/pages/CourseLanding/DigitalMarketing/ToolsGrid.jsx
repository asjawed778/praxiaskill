import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BrushIcon from '@mui/icons-material/Brush';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import CampaignIcon from '@mui/icons-material/Campaign';
import AdsClickIcon from "@mui/icons-material/AdsClick";
import EmailIcon from "@mui/icons-material/Email";
import EditNoteIcon from "@mui/icons-material/EditNote";
import InsightsIcon from "@mui/icons-material/Insights";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
const tools = [
  { name: "ChatGPT", icon: <SmartToyIcon fontSize="large" /> },
  { name: "Jasper", icon: <AutoAwesomeIcon fontSize="large" /> },
  { name: "Canva AI", icon: <BrushIcon fontSize="large" /> },
  { name: "Google Ads", icon: <AdsClickIcon fontSize="large" /> }, // Renamed here
  { name: "SurferSEO", icon: <TrendingUpIcon fontSize="large" /> },
  { name: "Mailchimp", icon: <EmailIcon fontSize="large" /> },
  { name: "GA4 (Google Analytics)", icon: <BarChartIcon fontSize="large" /> },
  { name: "WordPress", icon: <LanguageIcon fontSize="large" /> },
  { name: "SEMrush", icon: <SearchIcon fontSize="large" /> },
  { name: "Meta Ads Manager", icon: <CampaignIcon fontSize="large" /> },
  { name: "Copy.ai", icon: <EditNoteIcon fontSize="large" /> },
  { name: "Frase", icon: <InsightsIcon fontSize="large" /> },
  { name: "Pardot", icon: <AssessmentIcon fontSize="large" /> },
  { name: "HubSpot", icon: <BusinessCenterIcon fontSize="large" /> },
  { name: "Rasa", icon: <ChatIcon fontSize="large" /> },
  { name: "AdRoll", icon: <AdsClickIcon fontSize="large" /> },
];



const ToolsGrid = () => {
  return (
    <Box sx={{ backgroundColor: "#000", color: "#fff", py: 8, px: 2, textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Master 15+ Tools, Including AI-Powered Platforms
      </Typography>

      <Grid container spacing={2} justifyContent="center" sx={{ mt: 4, mx: { xs: 1, sm: 2, md: 16 } }}>
        {tools.map((tool, index) => (
          <Grid  key={index} size={{xs:4, sm: 3, lg: 2}}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                  alignItems: "center",
                  justifyContent: "center",
                }}
                elevation={4}
              >
                {tool.icon}
              </Card>
              <CardContent sx={{ p: 1 }}>
                <Typography variant="body2" fontWeight="medium" align="center">
                  {tool.name}
                </Typography>
              </CardContent>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ToolsGrid;
