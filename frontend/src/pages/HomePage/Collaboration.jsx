import {
  Box,
  Typography,
  Grid,
  Container,
  useTheme,
  Avatar,
} from "@mui/material";
import { GroupsOutlined } from "@mui/icons-material";
import zohoLogo from "@/assets/PartnersIcons/zoho.png";
import rapidoLogo from "@/assets/PartnersIcons/rapido.png";

const PartnerLogo = ({ name, logo }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar
        variant="rounded"
        src={logo}
        alt={`${name} logo`}
        sx={{
          width: 60,
          height: 60,
          bgcolor: "transparent", 
          border: "none", 
          borderRadius: 2,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
          mb: 1,
        }}
      />
      <Typography align="center">{name}</Typography>
    </Box>
  );
};

const Collaboration = () => {
  const theme = useTheme();
  const partners = [
    {
      name: "Zoho",
      logo: zohoLogo,
    },
    {
      name: "Rapido",
      logo: rapidoLogo,
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#f9fafc",
        py: 4,
        my: 2,
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
              <PartnerLogo name={partner.name} logo={partner.logo} />
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
