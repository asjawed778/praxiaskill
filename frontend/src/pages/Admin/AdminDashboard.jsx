import React from "react";
import {
  Box,
  Grid,
} from "@mui/material";
import GenericCard from "../../DashboardComponents/GenericCard";
import { cardData, enrollments, revenueData, topCourses, userData } from "../../data";
import GenericLineChart from "../../DashboardComponents/GenericLineChart";
import ChartWrapper from "../../DashboardComponents/ChartWrapper";
import GenericPieChart from "../../DashboardComponents/GenericPieChart";
import GenericBarChart from "../../DashboardComponents/GenericBarChart";
import GenericLinearProgress from "../../DashboardComponents/GenericLinearProgress";

const AdminDashboard = () => {
  return (
    <Box sx={{ padding: 3, backgroundColor: "#f5f7fb", minHeight: "100vh" }}>
      <Grid container spacing={3} >
          {cardData.map((card, index) => (
           <Grid size={{ xs: 6, md : 3 }} key={index}>
           <GenericCard value={card.value} title={card.title} />
         </Grid>
          ))}
      </Grid>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartWrapper title="Monthly Revenue">
            <GenericLineChart 
            data={revenueData}
            title="Monthly Revenue"
            yAxisLabel="Revenue ($)"
            lineColor="#4CAF50"
            />
          </ChartWrapper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
        <ChartWrapper title="User Analytics">
          <GenericPieChart data={userData} />
          </ChartWrapper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
        <ChartWrapper title="Course Enrollments">
          <GenericBarChart data={enrollments} />
          </ChartWrapper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
        <ChartWrapper title="Top Courses">
          <GenericLinearProgress data={topCourses} />
          </ChartWrapper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
