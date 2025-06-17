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
      <Typography
        sx={{
          fontSize: {
            xs: "14px",
            sm: "16px",
            md: "18px",
            lg: "20px",
            xl: "22px",
          },
          textAlign: "center"
        }}
      >
        {name}
      </Typography>
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
        borderRadius: "4px",
        backgroundColor: "#f9fafc",
        py: 2,
        mt: {xs: 4, md: 6, xl: 8}
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              width: 60,
              height: 60,
              mb: 2,
              mx: "auto",
            }}
          >
            <GroupsOutlined fontSize="medium" />
          </Avatar> */}
          <Typography
            sx={{
              fontSize: {
                xs: "24px",
                sm: "28px",
                md: "32px",
                lg: "36px",
                xl: "40px",
              },
              fontWeight: 600,
            }}
          >
            Backed by a strong placement support system offering access to 100+
            recruiting companies.
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
      </Container>
    </Box>
  );
};

export default Collaboration;
