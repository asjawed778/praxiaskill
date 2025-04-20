import React from 'react';
import { Box, Fade, Grid } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PeopleIcon from '@mui/icons-material/People';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GenericCard from '../../DashboardComponents/GenericCard';

const cardData = [
  { 
    icon: <SchoolIcon sx={{ color: 'primary.main' }} />, 
    value: '0', 
    label: 'Enrolled Courses', 
    color: 'primary' 
  },
  { 
    icon: <AutoStoriesIcon sx={{ color: 'secondary.main' }} />, 
    value: '0', 
    label: 'Active Courses', 
    color: 'secondary' 
  },
  { 
    icon: <BookmarkIcon sx={{ color: 'warning.main' }} />, 
    value: '0', 
    label: 'Completed Courses', 
    color: 'warning' 
  },
  { 
    icon: <PeopleIcon sx={{ color: 'info.main' }} />, 
    value: '0', 
    label: 'Total Student', 
    color: 'info' 
  },
  { 
    icon: <LibraryBooksIcon sx={{ color: 'success.main' }} />, 
    value: '0', 
    label: 'Total Courses', 
    color: 'success' 
  },
  { 
    icon: <MonetizationOnIcon sx={{ color: 'error.main' }} />, 
    value: '0', 
    label: 'Total Earning', 
    color: 'error' 
  },
];

const AdminDashboard = () => {
  return (
    <Box sx={{ padding: 3, backgroundColor: '#f5f7fb', minHeight: '100vh' }}>
      {/* Summary Cards */}
      <Grid container spacing={3}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Fade in timeout={500 + index * 200}>
              <Box>
                <GenericCard
                  icon={card.icon}
                  value={card.value}
                  label={card.label}
                  color={card.color}
                />
              </Box>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
