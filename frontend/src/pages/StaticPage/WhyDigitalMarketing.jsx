import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

const stats = [
  { value: '$786.2B', description: 'Global digital marketing market by 2026.' },
  { value: '#1', description: 'Most In-Demand Skill According to Michael Page report 2023' },
  { value: '11 Lakhs+', description: 'Average annual salary of digital managers in India' },
  { value: '14000+', description: 'Job openings worldwide' },
  { value: '72%', description: 'of the marketing budget goes towards Digital Marketing, according to a survey from Gartner.' },
  { value: '49%', description: 'of businesses say that organic search brings them the best marketing ROI.' },
];

const WhyDigitalMarketing = () => {
  return (
    <Box sx={{ backgroundColor: '#000', color: '#fff', py: 6, px: 2 }}>
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        gutterBottom
      >
        Here’s Why You Need to <br />Master Digital Marketing
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          border: '1px solid #444',
          marginTop: 4,
          mx: 16,
        //   width: "200px"
        }}
      >
        {stats.map((item, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: '#0e0e0e',
              borderRight: (index + 1) % 3 !== 0 ? '1px solid #444' : 'none',
              borderBottom: index < 3 ? '1px solid #444' : 'none',
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              minHeight: 180,
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: '#c63bfa', fontWeight: 'bold' }}
            >
              {item.value}
            </Typography>
            <Typography variant="body1" mt={1}>
              {item.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default WhyDigitalMarketing;
