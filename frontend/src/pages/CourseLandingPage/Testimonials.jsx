import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';
import { motion, useAnimation } from 'framer-motion';

const testimonials = [
  {
    name: 'Neha Sethi',
    role: 'Digital Marketing Specialist',
    message:
      'The blend of AI tools like ChatGPT and Canva AI with practical digital marketing strategies was a game changer for my career.',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Rohan Malhotra',
    role: 'Performance Marketing Analyst',
    message:
      'I now confidently run Meta Ads and track results in GA4. This course truly bridges the gap between theory and execution.',
    avatar: 'https://randomuser.me/api/portraits/men/51.jpg',
  },
  {
    name: 'Isha Thakur',
    role: 'SEO & Content Strategist',
    message:
      'From mastering SurferSEO to creating engaging posts with Jasper, this platform made my content workflow 3x faster!',
    avatar: 'https://randomuser.me/api/portraits/women/57.jpg',
  },
  {
    name: 'Tanmay Rathi',
    role: 'Email Marketing Manager',
    message:
      'I loved the deep dive into Mailchimp automations. Now I run high-converting email campaigns with zero guesswork.',
    avatar: 'https://randomuser.me/api/portraits/men/64.jpg',
  },
];

const TestimonialCard = styled(Paper)(({ theme }) => ({
  minWidth: 300,
  maxWidth: 300,
  marginRight: theme.spacing(3),
  backgroundColor: '#1e1e1e',
  color: '#fff',
  padding: theme.spacing(3),
  borderRadius: 16,
  flexShrink: 0,
}));

export default function Testimonials() {
  const controls = useAnimation();
  const containerRef = useRef(null);
  const xPos = useRef(0);
  const isHovering = useRef(false);

  const startAnimation = (fromX = 0) => {
    const totalDistance = containerRef.current.scrollWidth / 2;
    const remainingDistance = totalDistance + fromX; // since fromX is negative
    const duration = (remainingDistance / totalDistance) * 20;
  
    controls.start({
      x: [fromX, -totalDistance],
      transition: {
        x: {
          duration: duration,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        },
      },
    });
  };
  
  useEffect(() => {
    if (containerRef.current) {
      startAnimation(0);
    }
  }, []);

  const handlePause = () => {
    isHovering.current = true;
    controls.stop();
    const computedStyle = window.getComputedStyle(containerRef.current);
    const matrix = new WebKitCSSMatrix(computedStyle.transform);
    xPos.current = matrix.m41; 
  };

  const handleResume = () => {
    if (!isHovering.current) return;
    isHovering.current = false;
    startAnimation(xPos.current);
  };

  return (
    <Box
      sx={{
        bgcolor: '#000',
        color: '#fff',
        px: 3,
        py: 4,
        overflow: 'hidden',
        position: 'relative',
        

      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{fontSize: {
              xs: '24px',
              sm: '36px',
              md: '44px',
            },}}>
        What Our Learners Say
      </Typography>

      <Box
        ref={containerRef}
        component={motion.div}
        animate={controls}
        sx={{ display: 'flex', width: 'fit-content', mt: 4 }}
      >
        {[...testimonials, ...testimonials, ...testimonials].map((t, idx) => (
          <Box key={idx} onMouseEnter={handlePause} onMouseLeave={handleResume}>
            <TestimonialCard elevation={6}>
              <Avatar
                src={t.avatar}
                alt={t.name}
                sx={{ 
                  // width: 56, 
                  // height: 56, 
                  mb: 1 
                }}
              />
              <Typography variant="h6">{t.name}</Typography>
              <Typography
                variant="body2"
                sx={{ color: '#ccc', mb: 1, fontStyle: 'italic' }}
              >
                {t.role}
              </Typography>
              <Typography sx={{ fontSize: '15px', color: '#ddd' }}>
                “{t.message}”
              </Typography>
            </TestimonialCard>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
