import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Container,
  Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQSection = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqData = [
    {
      id: 'panel1',
      question: 'What are the prerequisites for this course?',
      answer: 'There are no formal prerequisites for this course. However, basic knowledge of the subject area will be helpful. All necessary materials and resources will be provided during the course.'
    },
    {
      id: 'panel2',
      question: 'When do the live group calls and guest sessions take place?',
      answer: 'Live group calls take place every Tuesday at 7:00 PM EST. Guest sessions are scheduled monthly, typically on the last Thursday of each month. All sessions are recorded and made available in the course portal.'
    },
    {
      id: 'panel3',
      question: 'What happens if I can\'t attend the live sessions?',
      answer: 'Don\'t worry! All live sessions are recorded and posted in the member area within 24 hours. You can watch them at your convenience and still submit questions beforehand that will be addressed during the session.'
    },
    {
      id: 'panel4',
      question: 'How involved is the mentor in this program?',
      answer: 'The mentor is highly involved throughout the program. They provide weekly feedback on your work, respond to questions in the community forum within 48 hours, and are available for one-on-one support during scheduled office hours.'
    },
  ];

  return (
    <Box sx={{ bgcolor: '#000000', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" sx={{ color: 'white', textAlign: 'center', mb: 6, fontWeight: 500 }}>
          Frequently asked questions
        </Typography>

        <Box sx={{ mb: 4 }}>
          {faqData.map((faq) => (
            <Accordion 
              key={faq.id}
              expanded={expanded === faq.id} 
              onChange={handleChange(faq.id)}
              sx={{
                mb: 1.5,
                bgcolor: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '4px !important',
                '&:before': { display: 'none' }, // Removes the default divider
                boxShadow: 'none',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                aria-controls={`${faq.id}-content`}
                id={`${faq.id}-header`}
                sx={{
                  color: 'white',
                  '& .MuiAccordionSummary-content': {
                    my: 1.5,
                  }
                }}
              >
                <Typography sx={{ fontWeight: 500 }}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ color: 'rgba(255, 255, 255, 0.8)', pb: 3 }}>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FAQSection;