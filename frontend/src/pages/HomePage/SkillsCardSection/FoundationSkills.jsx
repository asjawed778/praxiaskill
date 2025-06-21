import {
  Box,
  Grid,
  Typography,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
} from "@mui/material";
import herosection from "@/assets/images/fingerup-boy.png";
import programframework from "@/assets/images/programframework.png";
import careerguidance from "@/assets/images/careerguidance.png";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

const offers = [
  "NEP Aligned School Innovation Council",
  "Mentoring & Project Guidance",
  "Career Counselling & Aptitude Testing",
  "Skill Training & Industry Exposure",
  "Teacher Capacity Building",
];

const FoundationalSkills = () => {
  return (
    <Container maxWidth="lg" sx={{ my: { xs: 2, sm: 4 }, pb: 1}}>
      <Grid
        container
        spacing={4}
        alignItems="center"
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid size={{ xs: 12, sm: 6 }} sx={{textAlign: {xs: "center", md: "start"}}}>
          <Typography
            component="h1"
            sx={{
              fontSize: {
                xs: "32px",
                sm: "36px",
                md: "40px",
                lg: "44px",
                xl: "48px",
              },
              mb: 1,
              fontWeight: 600,
              color: "#F83E5F",
            }}
          >
            Foundational Skills
          </Typography>
          <Typography
          component="h2"
            sx={{
              fontSize: {
                xs: "14px",
                sm: "16px",
              },
            }}
          >
            The Foundational Skill Program is designed to equip School Students
            in AI/ML Basics, Financial Literacy, Cyber Safety, Design Thinking
            and Communication. It prepares students for real-world readiness and
            builds foundational technical and personal skills.
          </Typography>
        </Grid>
        <Grid size={{ sx: 12, sm: 6 }}>
          <Box
            sx={{
              // width: { xs: 354, sm: 382, md: 382, lg: 382, xl: 382 },
              // height: { xs: 367, sm: 400, md: 400, lg: 400, xl: 400 },
              maxWidth: 350,
              maxHeight: 380,
              bgcolor: "#F83E5F",
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              mx: "auto",
              position: "relative",
            }}
          >
            <img
              src={herosection}
              alt="Foundationalm Skills"
              loading="lazy"
              decoding="async"
              style={{
                height: "95%",
                width: "95%",
                objectFit: "cover",
                marginBottom: -76,
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Typography
      component="h2"
        sx={{
          mt: 6,
          mb: 1,
          fontSize: {
            xs: "20px",
            sm: "22px",
            md: "24px",
            lg: "26px",
            xl: "28px",
          },
          textAlign: { xs: "center", sm: "start" },
          fontWeight: 600,
          color: "#F83E5F",
        }}
      >
        What We Offer
      </Typography>
      <Grid container spacing={2} display="flex" justifyContent="center">
        {offers.map((item, idx) => (
          <Grid size={{ xs: 6, sm: 2.4 }} key={idx} textAlign="center">
            <Card
              sx={{
                bgcolor: "#F83E5F",
                color: "white",
                borderRadius: "20px",
                py: { xs: 1.5, sm: 2, md: 4 },
                px: { xs: 0, sm: 1, md: 0 },
                height: { xs: "150px", sm: "160px", md: "200px" },
                position: "relative",
              }}
            >
              <Typography
                variant="body1"
                fontWeight={600}
                sx={{ textAlign: "center" }}
              >
                {item}
              </Typography>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                }}
              >
                <LibraryBooksOutlinedIcon sx={{ fontSize: "40px" }} />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          mt: { xs: 8, md: 10 },
          bgcolor: "#568776",
          px: 4,
          py: 2,
          borderRadius: 4,
          color: "white",
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
          Program Framework
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column-reverse",
              sm: "row",
            },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              flex: 1,
              width: { xs: "100%", sm: "50%" },
            }}
          >
            <List dense>
              {[
                "Inaugural Motivation Session",
                "Mentor-Led Learning Tracks",
                "Expert Interaction & Real-World Insight",
                "Group Projects using Latest Technology",
                "Intellectual Property Support",
              ].map((point, idx) => (
                <ListItem
                  key={idx}
                  disableGutters
                  sx={{ py: { xs: 0, md: 0.5  }, pl: { xs: 2, md: 4 } }}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <TaskAltOutlinedIcon
                      sx={{
                        color: "white",
                        fontSize: {
                          xs: "16px",
                          sm: "18px",
                          md: "20px",
                          lg: "22px",
                          xl: "24px",
                        },
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={point}
                    primaryTypographyProps={{
                      sx: {
                        color: "white",
                        fontSize: {
                          xs: "16px",
                          sm: "18px",
                          md: "20px",
                          lg: "22px",
                          xl: "24px",
                        },
                        fontWeight: 500,
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box
            sx={{
              flex: 1,
              width: { xs: "100%", sm: "50%" },
              maxWidth: 543,
              height: { xs: 250, sm: 300, md: 342 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src={programframework}
              alt="Program FrameWork"
              loading="lazy"
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>
        </Box>
      </Box>
      <Typography
      component="h2"
        sx={{
          fontSize: {
            xs: "24px",
            sm: "28px",
            md: "28px",
            lg: "32px",
            xl: "36px",
          },
          mt: { xs: 6, md: 8 },
          mb: 1,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        Career Readiness & Guidance
      </Typography>
      <Box
        sx={{
          backgroundImage: "linear-gradient(to right, #0085FD, #00C5F0)",
          borderRadius: 4,
          color: "white",
          py: 2,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                width: { xs: "100%", sm: "70%" },
                maxWidth: 543,
                height: { xs: 250, sm: 300, md: 342 },
                borderRadius: 2,
                overflow: "hidden",
                ml: {xs: 0, sm: 4},
              }}
            >
              <img
                src={careerguidance}
                alt="Career Guidance"
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} p={2}>
            <Typography
              sx={{
                fontSize: {
                  xs: "20px",
                  sm: "22px",
                  md: "24px",
                  lg: "26px",
                  xl: "28px",
                },
                fontWeight: 600,
              }}
            >
              One-on-One Counselling
            </Typography>
            <Typography sx={{ fontSize: { xs: "14px", sm: "16px" }, mb: 3 }}>
              Personalized mentoring to support student growth.
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "20px",
                  sm: "22px",
                  md: "24px",
                  lg: "26px",
                  xl: "28px",
                },
                fontWeight: 600,
              }}
            >
              Career Path Exploration
            </Typography>
            <Typography sx={{ fontSize: { xs: "14px", sm: "16px" }, mb: 3 }}>
              Discover future-ready career paths.
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "20px",
                  sm: "22px",
                  md: "24px",
                  lg: "26px",
                  xl: "28px",
                },
                fontWeight: 600,
              }}
            >
              Goal Setting and Follow-up Support
            </Typography>
            <Typography sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
              Continued guidance throughout the learning journey.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default FoundationalSkills;
