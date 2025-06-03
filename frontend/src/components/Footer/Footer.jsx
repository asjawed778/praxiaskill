import React from "react";
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import logo from "../../assets/logo-white-transparent-bg.png";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Phone,
  Email,
  X,
} from "@mui/icons-material";
import { useAppTheme } from "../../context/ThemeContext";

const Footer = () => {
  const { colors } = useAppTheme();
  const contactInfo = [
    {
      icon: <Phone fontSize="small" sx={{ color: "white", mr: 1 }} />,
      label: "+91 91237 35554",
      href: "tel:+919123735554",
    },
    {
      icon: <Email fontSize="small" sx={{ color: "white", mr: 1 }} />,
      label: "info@praxiaskill.com",
      href: "mailto:info@praxiaskill.com",
    },
    {
      icon: <Email fontSize="small" sx={{ color: "white", mr: 1 }} />,
      label: "support@praxiaskill.com",
      href: "mailto:support@praxiaskill.com",
    },
  ];

  return (
    <Box component="footer" sx={{ bgcolor: "#1f2737", color: "white" }}>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
          justifyContent="space-between"
          sx={{ pt: 6 }}
        >
          <Grid item xs={12} sm={6} md={3}>
            <Box
              component="img"
              src={logo}
              alt="logo"
              sx={{ width: "200px", height: "54px", mb: 2 }}
            />
            <Typography
            variant="body2"
              sx={{
                fontSize: "17px",
                lineHeight: "25px",
                fontWeight: 400,
                maxWidth: 220,
                mb: 2,
              }}
            >
              Praxia Skill offers expert-led courses in Full Stack, Digital
              Marketing, Data Science & more.
            </Typography>

            <Box>
              <IconButton
                href=""
                sx={{ color: "white", "&:hover": { transform: "scale(1.1)" } }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                href=""
                sx={{ color: "white", "&:hover": { transform: "scale(1.1)" } }}
              >
                <X />
              </IconButton>
              <IconButton
                href=""
                sx={{ color: "white", "&:hover": { transform: "scale(1.1)" } }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                href=""
                sx={{ color: "white", "&:hover": { transform: "scale(1.1)" } }}
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          {/* About Section */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
            variant="h6"
              sx={{ fontWeight: 700, fontSize: "17px", mt: 2 }}
            >
              About Praxiaskill
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[
                "Term & Conditions",
                "Privacy Policy",
                "Company Overview",
                "Fee Refund Policy",
                "Admission",
              ].map((item) => (
                <Typography
                variant="body2"
                  key={item}
                  sx={{ fontSize: "14px", lineHeight: "25px", fontWeight: 400 }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Our Courses Section */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
            variant="h6"
              sx={{ fontWeight: 700, fontSize: "17px", mt: 2 }}
            >
              Our Courses
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[
                "Web Development",
                "Digital Marketing",
                "Data Analytics",
                "Data Science",
                "Cyber Security",
              ].map((course) => (
                <Typography
                variant="body2"
                  key={course}
                  sx={{ fontSize: "14px", lineHeight: "25px", fontWeight: 400 }}
                >
                  {course}
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Resources Section */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, fontSize: "17px", mt: 2 }}
            >
              Resources
            </Typography>
            <Box sx={{ mt: 2 }}>
              {["Daily Blogs"].map((item) => (
                <Typography
                variant="body2"
                  key={item}
                  sx={{ fontSize: "14px", lineHeight: "25px", fontWeight: 400 }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Contact Us Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, fontSize: "17px", mt: 2 }}
            >
              Contact Us
            </Typography>
            <Box sx={{ mt: 2 }}>
              {contactInfo.map(({ icon, label, href }) => (
                <Box
                  key={label}
                  display="flex"
                  alignItems="center"
                  sx={{
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                >
                  {icon}
                  <Typography
                  variant="body2"
                    component="a"
                    href={href}
                    sx={{
                      fontSize: "14px",
                      lineHeight: "25px",
                      fontWeight: 400,
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box mt={6}>
          <Divider sx={{ bgcolor: "gray" }} />
          <Typography variant="subtitle2" sx={{ mt: 3 }}>
            Trending Courses
          </Typography>
          <Box display="flex" flexWrap="wrap" mt={1}>
            {[
              "Data Science Course",
              "Android App Development Course",
              "MERN Full Stack Website Development Course",
              "Frontend Website Development Course",
              "Backend Website Development Course",
              "Machine Learning Course",
              "DevOps Course",
            ].map((course, index) => (
              <Typography key={index} variant="caption" sx={{ mr: 2, mb: 1 }}>
                {course}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
