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
    title: 'Search Engine Optimization (SEO)',
    description:
      'Learn the strategies and techniques for improving website visibility and ranking on search engines like Google through keyword optimization, backlinks, and technical SEO.',
    image:
      'https://img.freepik.com/premium-vector/digital-marketing-illustration-design_260839-10.jpg?semt=ais_hybrid&w=740',
  },
  {
    id: 'two',
    title: 'Social Media Marketing',
    description:
      'Master the art of promoting your brand on social media platforms like Facebook, Instagram, and LinkedIn to drive engagement, increase followers, and boost conversions.',
    image:
      'https://media.istockphoto.com/id/1648044864/photo/the-idea-is-that-online-marketing-digital-channels-relies-on-internet-to-communicate-and.jpg?s=612x612&w=0&k=20&c=tBHnsR6yAjTReCWf0NxvghXDat7gB5e-ZqtBJWA2cpY=',
  },
  {
    id: 'three',
    title: 'Pay-Per-Click Advertising (PPC)',
    description:
      'Learn how to create effective Google Ads campaigns, optimize ad spend, and use bidding strategies to drive targeted traffic to your website for increased sales and leads.',
    image:
      'https://media.istockphoto.com/id/974512548/photo/digital-marketing-new-startup-project-millennials-business-team-hands-at-work-with-financial.jpg?s=612x612&w=0&k=20&c=wQtH07ZMU6UwDKQd_Y6apNl41I6nYKSgQ-IyW8tAdF4=',
  },
  {
    id: 'four',
    title: 'Email Marketing Campaigns',
    description:
      'Discover how to build effective email marketing campaigns, segment your audience, and track open rates, click-through rates, and conversions to maximize ROI.',
    image:
      'https://thumbs.dreamstime.com/b/hands-using-mobile-payments-digital-marketing-banking-network-online-shopping-icon-customer-networking-connection-virtual-117351865.jpg',
  },
  {
    id: 'five',
    title: 'Content Marketing Strategy',
    description:
      'Learn how to create valuable, relevant content that resonates with your audience, builds brand authority, and drives traffic through blogs, videos, and more.',
    image:
      'https://img.freepik.com/premium-photo/marketing-digital-technology-business-concept-uds_31965-305041.jpg?semt=ais_hybrid&w=740',
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
