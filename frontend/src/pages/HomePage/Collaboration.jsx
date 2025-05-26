import React from "react";
import {
  Box,
  Typography,
  Grid,
  Container,
  useTheme,
  Avatar,
} from "@mui/material";
import { GroupsOutlined } from "@mui/icons-material";

const PartnerLogo = ({ name }) => {
  const theme = useTheme();
  return (
    <Avatar
      sx={{
        width: 120,
        height: 60,
        bgcolor: "background.paper",
        color: theme.palette.secondary.main,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 2,
        },
        transition: "all 0.3s ease",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem" }}>
        {name}
      </Typography>
    </Avatar>
  );
};

const Collaboration = () => {
  const theme = useTheme();
  const partners = ["Zoho", "Rapido"];

  return (
    <Box
      sx={{
        py: 4,
        my:2,
        backgroundColor:
          theme.palette.mode === "light"
            ? "#f9fafc"
            : theme.palette.background.default,
        position: "relative",
        overflow: "hidden",
        width: "88vw",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at 80% 20%, rgba(25, 118, 210, 0.05) 0%, transparent 50%)",
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: "center",
            mb: 6,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              width: 60,
              height: 60,
              mb: 3,
              mx: "auto",
            }}
          >
            <GroupsOutlined fontSize="medium" />
          </Avatar>
          <Typography
            sx={{
              fontWeight: 700,
              mb: 2,
              color: theme.palette.text.primary,
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            We collaborate with 100+ leading universities and companies
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: "700px",
              mx: "auto",
              fontSize: { xs: "0.8rem", md: "1rem" },
            }}
          >
            Partnering with top institutions worldwide to deliver exceptional
            learning experiences
          </Typography>
        </Box>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          {partners.map((partner, index) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <PartnerLogo name={partner} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              fontStyle: "italic",
              fontSize: { xs: "0.6rem", md: "0.8rem" },
            }}
          >
            And 45+ other prestigious institutions worldwide
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Collaboration;
