import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import WebIcon from "@mui/icons-material/Web";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt"; // closest to Next.js layout
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import StorageIcon from "@mui/icons-material/Storage";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ApiIcon from "@mui/icons-material/Api";
import DataObjectIcon from "@mui/icons-material/DataObject";
import GitHubIcon from "@mui/icons-material/GitHub";
import SettingsIcon from "@mui/icons-material/Settings"; // for Docker
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch"; // for Vercel
import CloudIcon from "@mui/icons-material/Cloud"; // Firebase, AWS
import PaymentIcon from "@mui/icons-material/Payment";
import BugReportIcon from "@mui/icons-material/BugReport"; // for Postman
import TerminalIcon from "@mui/icons-material/Terminal"; // for ESLint / Prettier
import SecurityIcon from "@mui/icons-material/Security"; // for Zod / Yup
import AccountTreeIcon from "@mui/icons-material/AccountTree"; // for CI/CD

const tools = [
  { name: "HTML/CSS/JS", icon: <CodeIcon fontSize="large" /> },
  { name: "React.js", icon: <WebIcon fontSize="large" /> },
  { name: "Next.js", icon: <ViewQuiltIcon fontSize="large" /> },
  { name: "Node.js", icon: <DeveloperModeIcon fontSize="large" /> },
  { name: "Express.js", icon: <IntegrationInstructionsIcon fontSize="large" /> },
  { name: "MongoDB", icon: <StorageIcon fontSize="large" /> },
  { name: "PostgreSQL", icon: <StorageIcon fontSize="large" /> },
  { name: "JWT Auth", icon: <VerifiedUserIcon fontSize="large" /> },
  { name: "REST APIs", icon: <ApiIcon fontSize="large" /> },
  { name: "GraphQL", icon: <DataObjectIcon fontSize="large" /> },
  { name: "Git & GitHub", icon: <GitHubIcon fontSize="large" /> },
  { name: "Docker", icon: <SettingsIcon fontSize="large" /> },
  { name: "CI/CD", icon: <AccountTreeIcon fontSize="large" /> },
  { name: "Firebase", icon: <CloudIcon fontSize="large" /> },
  { name: "AWS", icon: <CloudIcon fontSize="large" /> },
  { name: "Stripe", icon: <PaymentIcon fontSize="large" /> },
  { name: "Postman", icon: <BugReportIcon fontSize="large" /> },
  { name: "Vercel", icon: <RocketLaunchIcon fontSize="large" /> },
  { name: "ESLint / Prettier", icon: <TerminalIcon fontSize="large" /> },
  { name: "Zod / Yup", icon: <SecurityIcon fontSize="large" /> },
];


const ToolsGrid = () => {
  return (
    <Box sx={{ backgroundColor: "#000", color: "#fff", py: 8, px: 2, textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Master 20+ Tools
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
