// ContactPage.jsx - Main component
import React from 'react';
import { Box, Container, Paper, Grid, Typography, colors } from '@mui/material';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import { useAppTheme } from '../../context/ThemeContext';

function ContactPage() {
  const {colors} = useAppTheme(); 
   return (
    <Box sx={{ minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <PageHeader />
        <Paper elevation={2} sx={{ borderRadius: 4, overflow: 'hidden', p: 1, whiteSpace:2  }}>
          <Grid container spacing={3}>
            {/* Contact Information Panel */}
            <Grid size={{xs: 12, md: 4}}>
              <ContactInfo />
            </Grid>

            <Grid size={{xs: 12, md: 8}}>
              <ContactForm />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

const PageHeader = () => (
  <Box sx={{ textAlign: 'center', mb: 6 }}>
    <Typography 
      variant="h2" 
      component="h1" 
      sx={{ 
        fontWeight: 700, 
        color: '#333',
        fontSize: { xs: '2rem', md: '2.5rem' }
      }}
    >
      Get In Touch
    </Typography>
    <Typography 
      variant="body1" 
      sx={{ 
        maxWidth: 700, 
        mx: 'auto',
        color: '#666'
      }}
    >
     "We'll create high-quality, engaging content for our courses and build a strong learning ecosystem that connects students with top-tier resources, expert instructors, and peer-driven learning. Our platform will empower learners to gain valuable skills and certifications recognized by industry leaders."
    </Typography>
  </Box>
);

export default ContactPage;