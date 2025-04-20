import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import { useAppTheme } from "../../context/ThemeContext";

const contactItems = [
  {
    icon: <PhoneIcon />,
    content: (
      <Box>
        <Typography variant="body2">
          <a href="tel:+919123735554">+91 91237 35554</a>
        </Typography>
      </Box>
    ),
  },
  {
    icon: <EmailIcon />,
    content: (
      <Box>
        <Stack alignItems="left">
          <a
            href="mailto:info@praxiaskill.com"
            underline="none"
            sx={{
              color: "primary.main",
              px: 2,
              py: 1,
              "&:active": {
                color: "#fff",
                bgcolor: "primary.main",
              },
            }}
          >
            info@praxiaskill.com
          </a>
          <a
            href="mailto:support@praxiaskill.com"
            underline="none"
            sx={{
              color: "primary.main",
              px: 2,
              py: 1,
              "&:active": {
                color: "#fff",
                bgcolor: "primary.main",
              },
            }}
          >
            support@praxiaskill.com
          </a>
        </Stack>
      </Box>
    ),
  },
  {
    icon: (
      <Box
        width={40}
        height={40}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="50%"
      >
        <LocationIcon fontSize="small" />
      </Box>
    ),
    content: (
      <Typography variant="body2">
        CAG College Praxia Campus, 5, Pollock Street (Near Tea Board)
        Kolkata-700001
      </Typography>
    ),
  },
];

const ContactInfo = () => {
  const { colors } = useAppTheme();

  return (
    <Box
      sx={{
        backgroundColor: colors.primary, 
        color: "white",
        padding: 4,
        borderRadius: 2,
        position: "relative",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Contact Information
      </Typography>
      <Typography variant="body2" paragraph>
        At our course learning platform, we are dedicated to delivering
        high-quality, interactive course content.
      </Typography>

      <Box sx={{ mt: 6, display: "flex", flexDirection: "column", gap: 3 }}>
        {contactItems.map((item, index) => (
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
            key={index}
          >
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </Box>
            {item.content}
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        }}
      />
    </Box>
  );
};

export default ContactInfo;
