import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const GenericCard = ({ title, value }) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        width: '100%',
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: '#14335F',
        color: 'white',
        textAlign: 'center',
        borderRadius: '10px',
        px: 2
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h4" component="div" fontWeight="bold" gutterBottom>
          {value}
        </Typography>
        <Typography variant="body1" color="inherit">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GenericCard