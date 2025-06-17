// import React from 'react';
// import {
//   Box,
//   Typography,
//   Grid,
//   Paper,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Container,
//   useTheme,
//   useMediaQuery
// } from '@mui/material';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import { styled } from '@mui/material/styles';
// import seminarpana from "/employabilityskills/seminarpana.png";

// const CoursesSection = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const leftColumnCourses = [
//     'AI & ML using Python',
//     'Industrial IOT',
//     'Data Science and Machine Learning',
//     'Full Stack Web Developer',
//     'Core JAVA',
//     'App Developer',
//     'Python',
//     'Cyber Security',
//     'Block chain Development',
//     'DevOps Engineering',
//     'Big Data Analytics',
//     'Embedded Systems and Robotics'
//   ];

//   const rightColumnCourses = [
//     'Natural Language Processing (NLP)',
//     'Graphic Design',
//     'Social Media & Digital Marketing',
//     'SEO',
//     'Video Editing',
//     'Photoshop',
//     'Financial Modelling & valuation Analytics',
//     'Investment banking',
//     'GST & taxation courses',
//     'C & Data Structure',
//     'AWS & Cloud Infra',
//     'Red Hat Linux'
//   ];

//   return (
//     <Box
//       sx={{
//         backgroundColor: '#0F121F',
//         display: 'flex',
//         flexDirection: isMobile ? 'column' : 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: isMobile ? 'auto' : 626,
//       }}
//     >
//       <Grid
//         sx={{
//           backgroundColor: '#fff',
//           width: isMobile ? '100%' : '50%',
//           height: '100%',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           paddingBottom: isMobile ? 24 : 0,
//           clipPath: isMobile ? 'circle(81.2% at 34% 8%)' : 'circle(81.2% at 16% 26%)'
//         }}
//       >
//         <img
//           src={seminarpana}
//           alt="Hero section"
//           style={{
//             height: {lg: 626, md: 500, sm: 400, xs: 300},
//             width: {lg: 625, md: 500, sm: 400, xs: 300},
//             objectFit: "cover",
//             display: 'block'
//           }}
//         />
//       </Grid>

//       <Grid
//         sx={{
//           backgroundColor: '#0F121F',
//           width: isMobile? '100%' : '50%',
//           paddingLeft: isMobile ? 2 : 0,
//         }}
//       >
//         <Box>
//           <Typography
//             variant="h4"
//             sx={{
//               color: '#fff',
//               fontFamily: 'Roboto',
//               fontWeight: 600,
//               fontSize: { xs: '32px', md: '48px' },
//               lineHeight: '117%',
//               letterSpacing: '0%'
//             }}
//           >
//             Courses We Offer
//           </Typography>

//           <Grid container spacing={3}
//           >
//             <Grid item xs={12} sm={6}>
//               <List sx={{ p: 0 }}>
//                 {leftColumnCourses.map((course, index) => (
//                   <ListItem key={index} sx={{ p: 0, mb: 1 }}>
//                     <ListItemIcon sx={{ minWidth: '30px' }}>
//                       <CheckCircleIcon
//                         sx={{
//                           color: '#4CAF50',
//                           fontSize: '16px'
//                         }}
//                       />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary={course}
//                       primaryTypographyProps={{
//                         sx: {
//                           color: '#fff',
//                           fontFamily: 'Roboto',
//                           fontWeight: 400,
//                           fontSize: '14px',
//                           lineHeight: '140%'
//                         }
//                       }}
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <List sx={{ p: 0 }}>
//                 {rightColumnCourses.map((course, index) => (
//                   <ListItem key={index} sx={{ p: 0, mb: 1 }}>
//                     <ListItemIcon sx={{ minWidth: '30px' }}>
//                       <CheckCircleIcon
//                         sx={{
//                           color: '#4CAF50',
//                           fontSize: '16px'
//                         }}
//                       />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary={course}
//                       primaryTypographyProps={{
//                         sx: {
//                           color: '#fff',
//                           fontFamily: 'Roboto',
//                           fontWeight: 400,
//                           fontSize: '14px',
//                           lineHeight: '140%'
//                         }
//                       }}
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//             </Grid>
//           </Grid>
//         </Box>
//       </Grid>
//     </Box>
//   );
// };

// export default CoursesSection;








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
import seminarpana from "/employabilityskills/seminarpana.png";
import TaskAltIcon from '@mui/icons-material/TaskAlt';

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
        backgroundColor: '#0F121F',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: isMobile ? 'auto' : 626,
      }}
    >
      <Grid
        sx={{
          backgroundColor: '#fff',
          width: isMobile ? '100%' : '50%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: isMobile ? 4 : 0,
          clipPath: isMobile ? 'circle(81.2% at 34% 8%)' : 'circle(81.2% at 16% 26%)',
        }}
      >
        <img
          src={seminarpana}
          alt="Hero section"
          style={{
            height: {lg: 626, md: 500, sm: 400, xs: 300},
            width: {lg: 625, md: 500, sm: 400, xs: 300},
            objectFit: "cover",
            display: 'block'
          }}
        />
      </Grid>

      <Grid
        sx={{
          backgroundColor: '#0F121F',
          width: isMobile? '100%' : '50%',
          paddingLeft: isMobile ? 2 : 0,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              color: '#fff',
              fontFamily: 'Roboto',
              fontWeight: 600,
              fontSize: {
                  xs: '28px', 
                  sm: '32px',
                  md: "36px",
                  lg: "40px",
                  xl: "44px"
              },
              lineHeight: '117%',
              letterSpacing: '0%'
            }}
          >
            Courses We Offer
          </Typography>

          <Grid 
          container 
          spacing={4}
          mt={{xs: 2, md: 3}}
          >
            <Grid item xs={12} sm={6}>
              <List sx={{ p: 0 }}>
                {leftColumnCourses.map((course, index) => (
                  <ListItem key={index} sx={{ p: 0, mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: '30px' }}>
                      <TaskAltIcon
                        sx={{
                          color: '#fff',
                          fontSize: {
                            xs: "14px",
                            sm: "15px",
                            lg: "16px"
                          },
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={course}
                      primaryTypographyProps={{
                        sx: {
                          color: '#fff',
                          fontWeight: 400,
                          fontSize: {
                            xs: "14px",
                            sm: "15px",
                            lg: "16px"
                          },
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
                      <TaskAltIcon
                        sx={{
                          color: '#fff',
                          fontSize: {
                            xs: "14px",
                            sm: "15px",
                            lg: "16px"
                          },
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={course}
                      primaryTypographyProps={{
                        sx: {
                          color: '#fff',
                          fontWeight: 400,
                          fontSize: {
                            xs: "14px",
                            sm: "15px",
                            lg: "16px"
                          },
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




