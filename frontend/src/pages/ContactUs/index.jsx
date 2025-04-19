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
        <Paper elevation={2} sx={{ borderRadius: 4, overflow: 'hidden', p: 1, whiteSpace:2 , mb: 4 }}>
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
        color: "red",
        fontSize: { xs: '1rem', md: '1.5rem' }
      }}
    >
      Get expert guidance
      to accelerate your learning journey
    </Typography>
    <Typography 
      variant="body1" 
      sx={{ 
        maxWidth: 500, 
        mx: 'auto',
        color: '#d13838'
      }}
    >
     "Talk with a Praxia Skill advisor to get personalized support in choosing the right course for your goals. Discover how our industry-relevant programs, hands-on learning, and expert mentorship can help you upskill faster and build a future-ready career."
    </Typography>
  </Box>
);

export default ContactPage;