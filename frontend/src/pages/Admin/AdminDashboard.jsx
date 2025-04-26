import React from "react";
import {
  Box,
  Grid,
} from "@mui/material";
import { useAppTheme } from "../../context/ThemeContext"

import { cardData, enrollments, revenueData, topCourses, userData } from "../../data";
import CustomLineChart from "../../components/Dashboard/CustomLineChart";
import CustomPieChart from "../../components/Dashboard/CustomPieChart";
import CustomBarChart from "../../components/Dashboard/CustomBarChart";
import CustomLinearProgress from "../../components/Dashboard/CustomLinearProgress";
import GenericCard from "../../components/Dashboard/GenericCard";
import ChartWrapper from "../../components/Dashboard/ChartWrapper";

const AdminDashboard = () => {
  const { colors } = useAppTheme();
  return (
    <Box sx={{ padding: 3, backgroundColor: colors.dashboardBackground, minHeight: "100vh" }}>
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
            <CustomLineChart 
            data={revenueData}
            title="Monthly Revenue"
            yAxisLabel="Revenue ($)"
            // lineColor="#4CAF50"
            />
          </ChartWrapper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
        <ChartWrapper title="User Analytics">
          <CustomPieChart data={userData} colors = {[ colors.pieChartColor1, colors.pieChartColor2]} />
          </ChartWrapper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
        <ChartWrapper title="Course Enrollments">
          <CustomBarChart data={enrollments} />
          </ChartWrapper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
        <ChartWrapper title="Top Courses">
          <CustomLinearProgress data={topCourses} />
          </ChartWrapper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
