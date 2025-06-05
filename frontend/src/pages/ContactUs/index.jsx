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
  <Box
    sx={{
      textAlign: "center",
      mb: { xs: 4, md: 6 },
      px: { xs: 2, sm: 4 },
    }}
  >
    <Typography
    variant="h3"
      sx={{
        // fontWeight: 700,
        // fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
        background: "linear-gradient(to right, #ff416c, #ff4b2b)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        mb: 2,
      }}
    >
      Get expert guidance to accelerate your learning journey
    </Typography>

    <Typography
      variant="body1"
      sx={{
        maxWidth: 700,
        mx: "auto",
        // fontSize: { xs: "0.8rem", md: "1rem" },
        color: "text.secondary",
        lineHeight: 1.75,
      }}
    >
      "Talk with a <strong>Praxia Skill advisor</strong> to get personalized
      support in choosing the right course for your goals. Discover how our
      <strong> industry-relevant programs</strong>, <strong>hands-on learning</strong>, and
      <strong> expert mentorship</strong> can help you upskill faster and build a
      future-ready career."
    </Typography>
  </Box>
);


export default ContactPage;