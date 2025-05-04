import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FaqSection = () => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqData = [
    {
      id: 'panel1',
      question: 'What is Digital Marketing?',
      answer:
        'Digital marketing involves using the internet and digital platforms like search engines, social media, emails, and websites to promote products and services to potential customers.',
    },
    {
      id: 'panel2',
      question: 'Why is Digital Marketing important for businesses?',
      answer:
        'It allows businesses to reach a wider audience, engage with customers in real-time, and measure campaign performance more effectively compared to traditional marketing.',
    },
    {
      id: 'panel3',
      question: 'What are the main channels of Digital Marketing?',
      answer:
        'These include Search Engine Optimization (SEO), Search Engine Marketing (SEM), Social Media Marketing (SMM), Email Marketing, Content Marketing, Influencer Marketing, and Affiliate Marketing.',
    },
    {
      id: 'panel4',
      question: 'What tools are commonly used in Digital Marketing?',
      answer:
        'Tools like ChatGPT, Jasper, Canva AI, Google Ads, SurferSEO, Mailchimp, GA4, WordPress, SEMrush, and Meta Ads Manager help with content creation, SEO, analytics, automation, and ad management.',
    },
    {
      id: 'panel5',
      question: 'What is SEO, and why is it crucial?',
      answer:
        'Search Engine Optimization (SEO) improves your website’s visibility on search engines like Google, helping attract organic (unpaid) traffic and generate leads.',
    },
    {
      id: 'panel6',
      question: 'What’s the difference between SEO and SEM?',
      answer:
        'SEO focuses on organic traffic through unpaid strategies, while SEM (Search Engine Marketing) includes paid advertising to appear at the top of search engine results.',
    },
    {
      id: 'panel7',
      question: 'How do Social Media Ads work?',
      answer:
        'Social media platforms like Facebook, Instagram, and LinkedIn allow you to create highly targeted ads based on user behavior, demographics, interests, and location.',
    },
    {
      id: 'panel8',
      question: 'Is email marketing still effective?',
      answer:
        'Yes, email marketing remains one of the highest ROI channels by delivering personalized messages, product updates, and offers directly to a user’s inbox.',
    },
    {
      id: 'panel9',
      question: 'How do I measure the success of digital marketing campaigns?',
      answer:
        'Use tools like Google Analytics 4 (GA4), Meta Pixel, and email performance reports to track KPIs such as traffic, conversion rate, bounce rate, CTR, and ROI.',
    },
    {
      id: 'panel10',
      question: 'How long does it take to see results from Digital Marketing?',
      answer:
        'Depending on the strategy, paid campaigns can yield fast results within days, while SEO and content marketing may take 3–6 months to show consistent performance.',
    },
  ];
  

  return (
    <Box sx={{ bgcolor: '#000000', py: { xs: 4, sm: 6, md: 8 } }}>
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: 'white',
            textAlign: 'center',
            mb: { xs: 4, sm: 6 },
            fontWeight: 500,
            fontSize: {
              xs: '24px',
              sm: '36px',
              md: '44px',
            },
          }}
        >
          Frequently asked questions
        </Typography>

        <Box>
          {faqData.map((faq) => (
            <Accordion
              key={faq.id}
              expanded={expanded === faq.id}
              onChange={handleChange(faq.id)}
              sx={{
                mb: 2,
                bgcolor: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                '&:before': { display: 'none' },
                boxShadow: 'none',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                aria-controls={`${faq.id}-content`}
                id={`${faq.id}-header`}
                sx={{
                  color: 'white',
                  minHeight: isMobile ? 48 : 64,
                  '& .MuiAccordionSummary-content': {
                    my: 1,
                    fontSize: { xs: '0.95rem', sm: '1.1rem' },
                  },
                }}
              >
                <Typography sx={{ fontWeight:"bold" }}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ color: 'rgba(255, 255, 255, 0.8)', pb: 2 }}>
                <Typography sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FaqSection;
