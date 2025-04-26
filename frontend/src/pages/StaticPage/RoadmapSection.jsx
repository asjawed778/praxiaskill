import React, { useState } from 'react';
import { Box, Typography, Grid, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const moduleData = [
  {
    id: 1,
    module: 'MODULE 1',
    title: 'Fundamentals of Digital Marketing',
    points: [
      'Setting marketing objectives',
      'Market & Competitor Research',
      'Understanding the marketing funnel & customer journey',
      'Identifying target audience segments',
      'Creating a Buyer Persona',
    ],
    alwaysOpen: true,
  },
  {
    id: 2,
    module: 'MODULE 2-3',
    title: 'SEO Fundamentals',
    points: [
      'Understanding SEO & Google updates',
      'SEO Myths & Proactive SEO',
      'Ranking Analysis',
      'Content Optimisation for SEO',
      'Introduction to Technical SEO',
      'Off-Page SEO',
    ],
    alwaysOpen: true,
  },
  {
    id: 3,
    module: 'MODULE 4',
    title: 'Social Media Marketing',
    points: [
      'Platform-specific strategies',
      'Content calendar planning',
      'Engagement & analytics',
    ],
    alwaysOpen: true,
  },
  {
    id: 4,
    module: 'MODULE 5',
    title: 'Performance Marketing',
    points: [
      'Running paid ads on Google & Meta',
      'A/B Testing strategies',
      'Budgeting & optimization',
    ],
    alwaysOpen: true,
  },
  {
    id: 5,
    module: 'MODULE 6',
    title: 'Email Marketing',
    points: [
      'Email list building',
      'Campaign design & automation',
      'Open rate and CTR improvement',
    ],
  },
  {
    id: 6,
    module: 'MODULE 7',
    title: 'Analytics & Reporting',
    points: [
      'Google Analytics basics',
      'Tracking user behavior',
      'Building marketing dashboards',
    ],
  },
  {
    id: 7,
    module: 'MODULE 8',
    title: 'Influencer & Affiliate Marketing',
    points: [
      'Outreach strategies',
      'Partnership management',
      'Measuring impact',
    ],
  },
  {
    id: 8,
    module: 'MODULE 9',
    title: 'Capstone Project',
    points: [
      'End-to-end campaign execution',
      'Performance analysis',
      'Presentation & feedback',
    ],
  },
];

const RoadmapSection = () => {
  const [openModules, setOpenModules] = useState({});

  const toggleModule = (id) => {
    setOpenModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Box sx={{ backgroundColor: '#000', color: '#fff', py: 8, px: 2, mx: 16, }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Here’s your Actionable Roadmap to becoming <br />
        a Top 1% Digital Marketer
      </Typography>

      <Grid
  container
  spacing={4}
  mt={4}
  sx={{
    
    '@media (max-width: 1200px)': {
      mx: 4,
    },
    '@media (max-width: 600px)': {
      mx: 2,
    },
  }}
>
  {moduleData.map((mod) => {
    const isOpen = mod.alwaysOpen || openModules[mod.id];

    return (
      <Grid item xs={12} sm={6} md={6} key={mod.id} sx={{ display: 'flex', alignItems:"center",  }}>
        <Box
          sx={{
            background: '#111',
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid #333',
            display: 'flex',
            width: "500px",
            flexDirection: 'column',
            flexGrow: 1, // 📌 Ensure equal height
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(to right, #a033ff, #6b00b6)',
              px: 2,
              py: 0.5,
              width: 'fit-content',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              mt: -1,
              ml: -1,
              fontSize: 12,
              fontWeight: 'bold',
            }}
          >
            {mod.module}
          </Box>

          <Box
            sx={{
              px: 3,
              py: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: isOpen ? '1px solid #333' : 'none',
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              {mod.title}
            </Typography>
            {!mod.alwaysOpen && (
              <IconButton
                onClick={() => toggleModule(mod.id)}
                sx={{ color: '#fff' }}
              >
                <ExpandMoreIcon
                  sx={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: '0.3s',
                  }}
                />
              </IconButton>
            )}
          </Box>

          <Collapse in={isOpen}>
            <Box component="ul" sx={{ px: 4, py: 2, m: 0 }}>
              {mod.points.map((pt, i) => (
                <li key={i} style={{ marginBottom: '8px', lineHeight: 1.6 }}>
                  {pt}
                </li>
              ))}
            </Box>
          </Collapse>
        </Box>
      </Grid>
    );
  })}
</Grid>

    </Box>
  );
};

export default RoadmapSection;
