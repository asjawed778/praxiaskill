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
      question: 'What is Full Stack Web Development?',
      answer:
        'Full Stack Web Development refers to the development of both the frontend (client-side) and backend (server-side) parts of a web application. A full stack developer handles everything from UI design to database management.',
    },
    {
      id: 'panel2',
      question: 'What technologies are commonly used in Full Stack Development?',
      answer:
        'Frontend: HTML, CSS, JavaScript, React.js, Angular, Vue.js. Backend: Node.js, Express.js, Django, Ruby on Rails, Spring Boot. Databases: MongoDB, PostgreSQL, MySQL. Others: Git, Docker, REST APIs, GraphQL, CI/CD tools, cloud platforms like AWS or Firebase.',
    },
    {
      id: 'panel3',
      question: 'What is the difference between Frontend and Backend?',
      answer:
        'Frontend is what users interact with directly—UI, layout, design. Backend is the server-side logic that processes data, handles authentication, and connects to databases.',
    },
    {
      id: 'panel4',
      question: 'What is a tech stack?',
      answer:
        'A tech stack is a combination of technologies used to build a web application. Example: MERN Stack – MongoDB, Express.js, React.js, Node.js.',
    },
    {
      id: 'panel5',
      question: 'Do I need to learn both frontend and backend to be a full stack developer?',
      answer:
        'Yes. A full stack developer is expected to handle both frontend and backend tasks. However, you can start with one and gradually learn the other.',
    },
    {
      id: 'panel6',
      question: 'How long does it take to become a full stack developer?',
      answer:
        'It typically takes 6 months to 1 year of consistent learning and practice, depending on your background and dedication.',
    },
    {
      id: 'panel7',
      question: 'What are REST APIs and why are they important?',
      answer:
        'REST APIs (Representational State Transfer) allow communication between the frontend and backend of a web application. They are essential for sending and receiving data over HTTP.',
    },
    {
      id: 'panel8',
      question: 'What is the role of Git in Full Stack Development?',
      answer:
        'Git is a version control system used to track changes in code. Platforms like GitHub or GitLab help teams collaborate and manage code repositories effectively.',
    },
    {
      id: 'panel9',
      question: 'Is Full Stack Development a good career choice?',
      answer:
        'Yes. Full stack developers are in high demand due to their versatility in handling multiple aspects of development. It also opens doors to roles like software engineer, tech lead, or startup CTO.',
    },
    {
      id: 'panel10',
      question: 'Do I need a degree to become a Full Stack Developer?',
      answer:
        'Not necessarily. Many successful full stack developers are self-taught or have completed bootcamps. What matters most is your skills, portfolio, and practical experience.',
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
                <Typography sx={{ fontWeight: "bold" }}>{faq.question}</Typography>
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
