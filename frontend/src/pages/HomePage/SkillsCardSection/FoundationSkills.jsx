import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";
import herosection from "../../../../public/foundationalskills/herosection.png";
import programframework from "../../../../public/foundationalskills/programframework.png";
import careerguidance from "../../../../public/foundationalskills/careerguidance.png";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

const offers = [
  "NEP Aligned School Innovation Council",
  "Mentoring & Project Guidance",
  "Career Counselling & Aptitude Testing",
  "Skill Training & Industry Exposure",
  "Teacher Capacity Building",
];

export default function FoundationalSkills() {
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Grid
        container
        spacing={4}
        alignItems="center"
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
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
            Foundational Skill
          </Typography>
          <Typography
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
              width: { xs: 354, sm: 382, md: 382, lg: 382, xl: 382 },
              height: { xs: 367, sm: 400, md: 400, lg: 400, xl: 400 },
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
              alt="Hero section"
              style={{
                height: '95%',
                width: '95%',
                objectFit: 'cover',
                marginBottom: -38
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Typography
        sx={{
          mt: 6,
          fontSize: {
            xs: "20px",
            sm: "22px",
            md: "24px",
            lg: "26px",
            xl: "28px",
          },
          fontWeight: 600,
          color: "#F83E5F",
        }}
      >
        What We Offer
      </Typography>
      <Grid container spacing={2}>
        {offers.map((item, idx) => (
          <Grid size={{ xs: 6, sm: 2.4 }} key={idx}>
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

              {/* Bottom-right icon */}
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
      {/* Program Framework */}
      <Box
        sx={{
          mt: { xs: 4, md: 6 },
          bgcolor: "#2e7d72",
          px: 4,
          // pb: {xs: 0, md: 2},
          borderRadius: 4,
          color: "white",
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "24px",
              sm: "28px",
              md: "32px",
              lg: "36px",
              xl: "40px",
            },
            pt: 2,
            fontWeight: 600,
          }}
        >
          Program Framework
        </Typography>
        <Grid container spacing={2} display="flex" alignItems="center"
          sx={{
            flexDirection: {
              xs: "column-reverse", sm: "row"
            }
          }}
            >
          <Grid size={{ xs: 12, sm: 6 }} pb={0}>
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
                  sx={{ py: { xs: 0 }, pl: { xs: 2, md: 8 } }}
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
                          xs: "14px",
                          sm: "16px",
                          md: "18px",
                          lg: "20px",
                        },
                        fontWeight: 500,
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                width: "100%",
                height: { xs: 250, sm: 280, md: 300 },
                overflow: "hidden",
                borderRadius: 2,
              }}
            >
              <img
                src={programframework}
                alt="Program"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  // display: "block",
                }}
              />
            </Box>
          </Grid>
        </Grid>
    </Box>

      {/* Career Readiness Section */ }
      <Typography
        sx={{
          fontSize: {
            xs: "24px",
            sm: "28px",
            md: "28px",
            lg: "32px",
            xl: "36px",
          },
          mt: { xs: 4, md: 6 },
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        Career Readiness & Guidance
      </Typography>
      <Box
        sx={{
          bgcolor: "#005fbb",
          borderRadius: 4,
          color: "white",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                width: "100%",
                maxHeight: 500,
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <img
                src={careerguidance}
                alt="Framework Illustration"
                style={{
                  width: "100%",
                  height: "auto",
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
    </Container >
  );
}
