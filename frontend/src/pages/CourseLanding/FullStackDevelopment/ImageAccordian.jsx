import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';

const accordionData = [
  {
    id: 'one',
    title: 'Frontend Development',
    description:
      'Design user-friendly, responsive interfaces using HTML, CSS, JavaScript, and modern frameworks like React.js or Vue.js.',
    image:
      'https://img.freepik.com/free-vector/frontend-development-concept-website-interface-design-improvement-web-page-programming-coding-testing-it-profession-isolated-flat-vector-illustration_613284-2357.jpg',
  },
  {
    id: 'two',
    title: 'Backend Development',
    description:
      'Build scalable backend systems with Node.js, Express.js, and connect them to databases like MongoDB or PostgreSQL.',
    image:
      'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'three',
    title: 'Database Management',
    description:
      'Efficiently store, retrieve, and manage data using SQL or NoSQL databases, and design relational or document-based schemas.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWgseiwlVfBo-60fELz9BiuSrB9mV9vlfX3Q&s',
  },
  {
    id: 'four',
    title: 'API Integration',
    description:
      'Create and consume RESTful or GraphQL APIs to enable seamless communication between frontend and backend components.',
    image:
      'https://www.infoneotech.com/img/API.png',
  },
  {
    id: 'five',
    title: 'Deployment & DevOps',
    description:
      'Use Git, CI/CD, Docker, and deploy apps to platforms like Vercel, Netlify, Render, or AWS for live hosting and scalability.',
    image:
      'https://ecloudasia.com/wp-content/uploads/2021/12/Deployment.jpg',
  },
];


const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: '#1e1e1e',
  color: '#fff',
  border: '1px solid #333',
  borderRadius: '8px !important',
  marginBottom: '12px',
  '& .MuiAccordionSummary-content': {
    fontWeight: 600,
    fontSize: '18px',
  },
  '&:before': {
    display: 'none',
  },
}));

export default function ImageAccordion() {
  const [expanded, setExpanded] = useState('one');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // <=600px
  const isTablet = useMediaQuery(theme.breakpoints.down('md')); // <=900px

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const currentItem = accordionData.find((item) => item.id === expanded);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isTablet ? 'column' : 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 4,
        bgcolor: '#000',
        color: '#fff',
        px: { xs: 2, sm: 3, md: 6 },
        py: { xs: 4, sm: 6, md: 8 },
      }}
    >
      {/* Left Image */}
      <Paper
        elevation={6}
        sx={{
          width: isTablet ? '100%' : '45%',
          bgcolor: '#111',
          p: 2,
          borderRadius: 2,
        }}
      >
        <img
          src={currentItem?.image}
          alt={currentItem?.title}
          style={{
            width: '100%',
            borderRadius: 12,
            objectFit: 'cover',
            height: isMobile ? '200px' : '300px',
          }}
        />
      </Paper>

      {/* Right Accordion Section */}
      <Box sx={{ width: isTablet ? '100%' : '50%' }}>
        {accordionData.map((item) => (
          <StyledAccordion
            key={item.id}
            expanded={expanded === item.id}
            onChange={handleChange(item.id)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}>
              <Typography>{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: '#ccc', fontSize: '14px' }}>
                {item.description}
              </Typography>
            </AccordionDetails>
          </StyledAccordion>
        ))}
      </Box>
    </Box>
  );
}
