import React from "react";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import logo from "../../public/logopng.png"

const SplashScreen: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.main
      }}
    >
      {/* Logo */}
      <img src={logo} alt="Logo" width={120} height={120} style={{ marginBottom: 16 }} />
      
      {/* App Name */}
      <Typography variant="h4">TCMS</Typography>
      
      {/* Loading Indicator */}
      <CircularProgress color="secondary" sx={{ mt: 2 }} />
    </Box>
  );
};

export default SplashScreen;
