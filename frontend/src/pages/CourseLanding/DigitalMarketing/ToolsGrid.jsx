import React from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import { SiOpenai, SiGrammarly, SiHubspot, SiZapier } from "react-icons/si";
import { FaPaintBrush, FaGoogle, FaEnvelope, FaWordpress, FaChartLine, FaFacebook, FaBullhorn } from "react-icons/fa";
import { AiOutlineAppstoreAdd, AiOutlineRobot, AiOutlineFundProjectionScreen } from "react-icons/ai";

const tools = [
  { name: "ChatGPT", icon: <SiOpenai size={40} color="#00B8D9" /> },
  { name: "Jasper", icon: <SiGrammarly size={40} color="#60A917" /> },
  { name: "Canva AI", icon: <FaPaintBrush size={40} color="#FF6F61" /> },
  { name: "Google Ads", icon: <FaGoogle size={40} color="#4285F4" /> },
  { name: "SurferSEO", icon: <FaChartLine size={40} color="#FF6F00" /> },
  { name: "Mailchimp", icon: <FaEnvelope size={40} color="#FFE01B" /> },
  { name: "Google Analytics", icon: <AiOutlineAppstoreAdd size={40} color="#FF6200" /> },
  { name: "WordPress", icon: <FaWordpress size={40} color="#21759B" /> },
  { name: "Zapier", icon: <SiZapier size={40} color="#FF8A00" /> },
  { name: "Meta Ads Manager", icon: <FaFacebook size={40} color="#1877F2" /> },
  { name: "Copy.ai", icon: <SiGrammarly size={40} color="#11B6F0" /> },
  { name: "Frase", icon: <AiOutlineFundProjectionScreen size={40} color="#0F8C8C" /> },
  { name: "Pardot", icon: <AiOutlineFundProjectionScreen size={40} color="#FFAC33" /> },
  { name: "HubSpot", icon: <SiHubspot size={40} color="#FF7A59" /> },
  { name: "Rasa", icon: <AiOutlineRobot size={40} color="#8A2BE2" /> },
  { name: "AdRoll", icon: <FaBullhorn size={40} color="#FF5733" /> },
];

const ToolsGrid = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        px: 2,
        textAlign: "center",
      }}
    >
      <Typography
        component="h2"
        textAlign="center"
        fontWeight="bold"
        sx={{
          mb: 6,
          fontSize: { xs: "24px", sm: "36px", md: "44px" },
        }}
      >
        Master 15+ Tools, Including AI-Powered Platforms
      </Typography>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ mt: 4, mx: { xs: 1, sm: 2, md: 16 } }}
      >
        {tools.map((tool, index) => (
          <Grid key={index} size={{ xs: 4, sm: 3, lg: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
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
