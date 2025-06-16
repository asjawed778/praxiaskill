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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { styled } from '@mui/material/styles';
import seminarpana from "../../../../public/employabilityskills/seminarpana.png";
// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '20px',
  width: '280px',
  height: '200px',
  position: 'relative',
  zIndex: 2,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
}));




const CoursesSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
        minHeight: '626px',
        width: '100%',
        py: 6,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Grid
        sx={{
          backgroundColor: '#fff',
          clipPath: 'circle(87.5% at 0 52%);',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          maxWidth: '30%',
        }}
      >
        <img
          src={seminarpana}
          alt="Hero section"
          style={{
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Grid>

      <Grid item xs={12} md={7}
        sx={{
          backgroundColor: '#0F121F',
        }}
      >
        <Box sx={{ pl: { md: 4 } }}>
          <Typography
            variant="h4"
            sx={{
              color: '#fff',
              fontFamily: 'Roboto',
              fontWeight: 600,
              fontSize: { xs: '32px', md: '48px' },
              lineHeight: '117%',
              mb: 4,
              letterSpacing: '0%'
            }}
          >
            Courses We Offer
          </Typography>

          <Grid container spacing={3}>
            {/* Left column of courses */}
            <Grid item xs={12} sm={6}>
              <List sx={{ p: 0 }}>
                {leftColumnCourses.map((course, index) => (
                  <ListItem key={index} sx={{ p: 0, mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: '30px' }}>
                      <CheckCircleIcon
                        sx={{
                          color: '#4CAF50',
                          fontSize: '16px'
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={course}
                      primaryTypographyProps={{
                        sx: {
                          color: '#fff',
                          fontFamily: 'Roboto',
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '140%'
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* Right column of courses */}
            <Grid item xs={12} sm={6}>
              <List sx={{ p: 0 }}>
                {rightColumnCourses.map((course, index) => (
                  <ListItem key={index} sx={{ p: 0, mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: '30px' }}>
                      <CheckCircleIcon
                        sx={{
                          color: '#4CAF50',
                          fontSize: '16px'
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={course}
                      primaryTypographyProps={{
                        sx: {
                          color: '#fff',
                          fontFamily: 'Roboto',
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '140%'
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
    </Box>
  );
};

export default CoursesSection;