import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar, Container } from '@mui/material';

const MentorsSection = () => {
  const mentors = [
    {
      id: 1,
      name: 'Krishni Miglani',
      title: 'Product Marketing',
      company: 'agoda',
      imgUrl: '/api/placeholder/120/120',
    },
    {
      id: 2,
      name: 'Manas Barpande',
      title: 'GM - Copy & Social Media Lead',
      company: 'DUNZO',
      imgUrl: '/api/placeholder/120/120',
    },
    {
      id: 3,
      name: 'Alice Mendonça',
      title: 'Ex LinkedIn Ad Grants',
      company: 'G',
      imgUrl: '/api/placeholder/120/120',
      logoCircle: true,
    },
    {
      id: 4,
      name: 'Siddhartha Kathpalia',
      title: 'Ex Associate Director',
      company: 'VWO',
      imgUrl: '/api/placeholder/120/120',
    },
    {
      id: 5,
      name: 'Ankit Agarwal',
      title: 'Head of Digital & Performance Marketing',
      company: 'Uber',
      imgUrl: '/api/placeholder/120/120',
    },
  ];

  return (
    <Box sx={{ bgcolor: '#000000', py: 6, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          align="center"
          sx={{ color: 'white', mb: 6, fontWeight: 'bold' }}
        >
          Meet Your Mentors
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {mentors.slice(0, 3).map((mentor) => (
            <Grid item xs={12} sm={6} md={4} key={mentor.id}>
              <MentorCard mentor={mentor} />
            </Grid>
          ))}
        </Grid>

        <Grid 
          container 
          spacing={3} 
          justifyContent="center" 
          sx={{ mt: 2 }}
        >
          {mentors.slice(3).map((mentor) => (
            <Grid item xs={12} sm={6} md={4} key={mentor.id}>
              <MentorCard mentor={mentor} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const MentorCard = ({ mentor }) => {
  return (
    <Card
      sx={{
        bgcolor: 'transparent',
        backgroundImage: 'linear-gradient(135deg, #3c1053 0%, #1d0625 100%)',
        color: 'white',
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'visible',
        boxShadow: 3,
        p: 2,
      }}
    >
      <CardContent sx={{ p: 2, pb: '16px !important' }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
          {mentor.name}
        </Typography>
        <Typography variant="body2" color="rgba(255,255,255,0.8)" sx={{ mb: 1 }}>
          {mentor.title}
        </Typography>
        
        {mentor.logoCircle ? (
          <Box 
            sx={{ 
              bgcolor: 'white', 
              borderRadius: '50%', 
              width: 36, 
              height: 36, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mt: 1
            }}
          >
            <Typography sx={{ color: '#000', fontWeight: 'bold' }}>
              {mentor.company}
            </Typography>
          </Box>
        ) : (
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: 'bold', 
              fontSize: mentor.company.length > 5 ? '1rem' : '1.2rem',
              mt: 1
            }}
          >
            {mentor.company}
          </Typography>
        )}
      </CardContent>
      
      <Avatar
        src={mentor.imgUrl}
        alt={mentor.name}
        sx={{
          width: 100,
          height: 100,
          border: '2px solid rgba(255,255,255,0.2)',
          mr: 1,
          alignSelf: 'center',
        }}
      />
    </Card>
  );
};

export default MentorsSection;