import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import seminarpana from "@/assets/images/seminarpana.png";
import checkIcon from "@/assets/icons/tick-mark.svg";

const CoursesSection = () => {
  const theme = useTheme();

  const leftColumnCourses = [
    'AI & ML using Python',
    'Industrial IOT',
    'Data Science and Machine Learning',
    'Full Stack Web Developer',
    'Core JAVA',
    'App Developer',
    'Python',
    'Cyber Security',
    'Block chain Development',
    'DevOps Engineering',
    'Big Data Analytics',
    'Embedded Systems and Robotics'
  ];

  const rightColumnCourses = [
    'Natural Language Processing (NLP)',
    'Graphic Design',
    'Social Media & Digital Marketing',
    'SEO',
    'Video Editing',
    'Photoshop',
    'Financial Modelling & valuation Analytics',
    'Investment banking',
    'GST & taxation courses',
    'C & Data Structure',
    'AWS & Cloud Infra',
    'Red Hat Linux'
  ];

  return (
    <Box
      sx={{
        backgroundColor: '#0F121F',
        display: 'flex',
        flexDirection: { lg: 'row', md: 'column', sm: 'column', xs: 'column' },
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 500,
        maxHeight: { lg: 580 }
      }}
    >
      <Grid
        sx={{
          backgroundColor: '#fff',
          width: { md: '100%', lg: '40%' },
          minHeight: { ls: '500px', md: '500px', sm: '400px', xs: '300px' },
          maxHeight: { lg: 580 },
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          clipPath: { lg: 'circle(81.2% at 16% 26%)', xs: 'circle(81.2% at 34% 8%)' }
        }}
      >
        <Box
          sx={{
            marginRight: { lg: '-124px', md: 0, xs: 0 },
            height: { md: '100%', lg: '100%', sm: '50%', xs: '50%' },
            width: { md: '100%', lg: '100%' },
          }}
        >
          <img
            src={seminarpana}
            alt="Hero section"
            style={{
              objectFit: "cover",
            }}
          />
        </Box>
      </Grid >

      <Grid
        sx={{
          backgroundColor: '#0F121F',
          width: { md: '100%', lg: '60%' },
          height: '100%',
          display: 'flex',
          justifyContent: {lg: 'left', md: 'center', sm: 'center', xs: 'center'},
          marginLeft: { lg: '24px' }
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              color: '#fff',
              fontFamily: 'Roboto',
              fontWeight: 600,
              fontSize: { xs: '32px', md: '36px' },
              lineHeight: '117%',
              letterSpacing: '0%',
              marginBottom: 4,
            }}
          >
            Courses We Offer
          </Typography>

          <Grid
            sx={{
              display: 'flex',
              gap: { md: 6, sm: 8, xs: 0 },
              marginBottom: { lg: 0, md: 4, sm: 4, xs: 4 },
              flexDirection: { lg: 'row', md: 'row', sm: 'row', xs: 'column' },
            }}
          >
            <Grid item xs={12} sm={6}>
              <List sx={{ p: 0 }}>
                {leftColumnCourses.map((course, index) => (
                  <ListItem key={index} sx={{ p: 0, mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: '30px' }}>
                      <img src={checkIcon} alt="check" style={{ width: '16px', height: '16px' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={course}
                      primaryTypographyProps={{
                        sx: {
                          color: '#fff',
                          fontFamily: 'Roboto',
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '117%'
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} sm={6}>
              <List sx={{ p: 0 }}>
                {rightColumnCourses.map((course, index) => (
                  <ListItem key={index} sx={{ p: 0, mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: '30px' }}>
                      <img src={checkIcon} alt="check" style={{ width: '16px', height: '16px' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={course}
                      primaryTypographyProps={{
                        sx: {
                          color: '#fff',
                          fontFamily: 'Roboto',
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '117%'
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Box >
  );
};

export default CoursesSection;