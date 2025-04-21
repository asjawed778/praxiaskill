import React from 'react';
import { Box, Fade, Grid, keyframes } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PeopleIcon from '@mui/icons-material/People';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GenericCard from '../../DashboardComponents/GenericCard';
import { cardsData, lineChartData } from '../../data';
import GenericLineChart from '../../DashboardComponents/GeneticLineChart';



const AdminDashboard = () => {
  return (
    <Box sx={{ padding: 3, backgroundColor: '#f5f7fb', minHeight: '100vh' }}>
      {/* Summary Cards */}
      <Grid container spacing={3}>
        
                <GenericCard
                  cards={cardsData}
                />
                <GenericLineChart data={lineChartData} xKey="name" yKey="value" color="#1976d2"  />
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
