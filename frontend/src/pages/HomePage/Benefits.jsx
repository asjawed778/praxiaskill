import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Container,
  useTheme,
} from "@mui/material";
import {
  SchoolOutlined,
  BuildOutlined,
  SupportOutlined,
  ScheduleOutlined,
} from "@mui/icons-material";

const Benefits = () => {
  const theme = useTheme();

  const benefits = [
    {
      icon: <SchoolOutlined fontSize="medium" />,
      title: "Expert Faculty from MAANG",
      description:
        "Top-tier education enriched by practical knowledge and innovation",
      color: theme.palette.primary.main,
    },
    {
      icon: <BuildOutlined fontSize="medium" />,
      title: "Projects & Mentors",
      description: "Hands-on learning to spark creative problem-solving",
      color: theme.palette.secondary.main,
    },
    {
      icon: <SupportOutlined fontSize="medium" />,
      title: "Fastest Doubt Support",
      description:
        "Personalized assistance for a clear understanding of concepts",
      color: theme.palette.success.main,
    },
    {
      icon: <ScheduleOutlined fontSize="medium" />,
      title: "Self-Paced Learning",
      description: "Learn at your pace with practice and instant feedback",
      color: theme.palette.warning.main,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          px: {xs: 1, md: 1.5, lg: 3},
          py: 1.5,
          mt: { xs: 4, md: 6, xl: 8 },
          borderRadius: "4px",
          background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)",
          position: "relative",
          overflow: "hidden",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(circle at 20% 50%, rgba(25, 118, 210, 0.08) 0%, transparent 50%)",
            zIndex: 0,
          },
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
          component="h2"
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
            How Praxia Skill help you?
          </Typography>
          <Typography
          component="h3"
            sx={{
              fontSize: {
                xs: "14px",
                sm: "16px",
                md: "18px",
                lg: "20px",
                xl: "22px",
              },
              color: "text.secondary",
            }}
          >
            Connects theoretical understanding with practical implementation
            through expert insights.
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ position: "relative", zIndex: 1 }}>
          {benefits.map((benefit, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: `0 10px 20px rgba(0, 0, 0, 0.1)`,
                  },
                  borderRadius: "12px",
                  borderBottom: `4px solid ${benefit.color}`,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: `${benefit.color}20`,
                      color: benefit.color,
                      width: 36,
                      height: 36,
                      mb: 1,
                    }}
                  >
                    {benefit.icon}
                  </Avatar>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "16px",
                        sm: "16px",
                        md: "18px",
                        lg: "20px",
                        xl: "22px",
                      },
                      fontWeight: 600,
                    }}
                    gutterBottom
                  >
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Benefits;
