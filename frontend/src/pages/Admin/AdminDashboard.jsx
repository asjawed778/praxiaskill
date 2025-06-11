import React from "react";
import { Box, Grid } from "@mui/material";
import { useAppTheme } from "../../context/ThemeContext";

import {
  cardData,
  enrollments,
  revenueData,
  topCourses,
  userData,
} from "../../data";
import CustomLineChart from "../../components/Dashboard/CustomLineChart";
import CustomPieChart from "../../components/Dashboard/CustomPieChart";
import CustomBarChart from "../../components/Dashboard/CustomBarChart";
import CustomLinearProgress from "../../components/Dashboard/CustomLinearProgress";
import GenericCard from "../../components/Dashboard/GenericCard";
import ChartWrapper from "../../components/Dashboard/ChartWrapper";
import { useDashboardQuery } from "../../services/generalApi";

// const AdminDashboard = () => {
//   const { colors } = useAppTheme();
//   const {data, isLoading, isError} = useDashboardQuery();
//   console.log("Dashboard data: ", data);

//   return (
//     <Box sx={{ padding: 3, backgroundColor: colors.dashboardBackground, minHeight: "100vh" }}>
//       <Grid container spacing={3} >
//           {cardData.map((card, index) => (
//            <Grid size={{ xs: 6, md : 3 }} key={index}>
//            <GenericCard value={card.value} title={card.title} />
//          </Grid>
//           ))}
//       </Grid>
//       <Grid container spacing={3} sx={{ mt: 3 }}>
//         <Grid size={{ xs: 12, md: 6 }}>
//           <ChartWrapper title="Monthly Revenue">
//             <CustomLineChart
//             data={revenueData}
//             title="Monthly Revenue"
//             yAxisLabel="Revenue ($)"
//             // lineColor="#4CAF50"
//             />
//           </ChartWrapper>
//         </Grid>
//         <Grid size={{ xs: 12, md: 6 }}>
//         <ChartWrapper title="User Analytics">
//           <CustomPieChart data={userData} colors = {[ colors.pieChartColor1, colors.pieChartColor2]} />
//           </ChartWrapper>
//         </Grid>
//         <Grid size={{ xs: 12, md: 6 }}>
//         <ChartWrapper title="Course Enrollments">
//           <CustomBarChart data={enrollments} />
//           </ChartWrapper>
//         </Grid>
//         <Grid size={{ xs: 12, md: 6 }}>
//         <ChartWrapper title="Top Courses">
//           <CustomLinearProgress data={topCourses} />
//           </ChartWrapper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default AdminDashboard;

const AdminDashboard = () => {
  const { colors } = useAppTheme();
  const { data: dashboardData, isLoading, isError } = useDashboardQuery();
  console.log("Dashboard data: ", dashboardData);
  const courseOverview = [
    {
      name: "Active Courses",
      value: dashboardData?.data?.courseAnalytics?.courseOverview?.activeCourses || 0
    },
    {
      name: "Draft Courses",
      value: dashboardData?.data?.courseAnalytics?.courseOverview?.draftCourses || 0
    },
    {
      name: "Terminated Courses",
      value: dashboardData?.data?.courseAnalytics?.courseOverview?.terminatedCourses || 0
    }
  ];
  const userGrowth= [
    {
      name: "Daily Growth",
      value: dashboardData?.data?.userAnalytics?.timePeriods?.dailyGrowth
    },
    {
      name: "Weekly Growth",
      value: dashboardData?.data?.userAnalytics?.timePeriods?.weeklyGrowth
    },
    {
      name: "Monthly Growth",
      value: dashboardData?.data?.userAnalytics?.timePeriods?.monthlyGrowth
    },
  ];
  const userSnapshot = [
    {
      name: "Today",
      count: dashboardData?.data?.userAnalytics?.timePeriods?.today
    },
    {
      name: "Yesterday",
      count: dashboardData?.data?.userAnalytics?.timePeriods?.yesterday
    },
    {
      name: "This Week",
      count: dashboardData?.data?.userAnalytics?.timePeriods?.thisWeek
    },
    {
      name: "Last Week",
      count: dashboardData?.data?.userAnalytics?.timePeriods?.lastWeek
    },
    {
      name: "This Month",
      count: dashboardData?.data?.userAnalytics?.timePeriods?.thisMonth
    },
    {
      name: "Last Month",
      count: dashboardData?.data?.userAnalytics?.timePeriods?.lastMonth
    },
    {
      name: "This Year",
      count: dashboardData?.data?.userAnalytics?.timePeriods?.thisYear
    },
    
  ];
  const userOverview = [
    {
      name: "Active Users",
      value: dashboardData?.data?.userAnalytics?.totals?.active
    },
    {
      name: "Instructor",
      value: dashboardData?.data?.userAnalytics?.totals?.instructors
    },
    {
      name: "Students",
      value: dashboardData?.data?.userAnalytics?.totals?.students
    },
  ];
  const enquiryOverview = [
    {
      name: "Today",
      count: dashboardData?.data?.enquiryAnalytics?.today
    },
    {
      name: "This Week",
      count: dashboardData?.data?.enquiryAnalytics?.thisWeek
    },
    {
      name: "This Month",
      count: dashboardData?.data?.enquiryAnalytics?.thisMonth
    },
    {
      name: "Last Six Month",
      count: dashboardData?.data?.enquiryAnalytics?.lastSixMonths1
    },
    {
      name: "This Year",
      count: dashboardData?.data?.enquiryAnalytics?.thisYear
    },
  ];
  const enquiryStatus = [
    {
      name: "Closed",
      value: dashboardData?.data?.enquiryAnalytics?.byStatus?.CLOSED
    },
    {
      name: "Pending",
      value: dashboardData?.data?.enquiryAnalytics?.byStatus?.PENDING
    },
  ];
  const userTrends = dashboardData?.data?.userAnalytics?.trends?.monthly?.map((items) => ({
    name: items.month,
    value: items.users
  }))
  

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: colors.dashboardBackground,
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={3}>
        <Grid size={{ xs: 6, md: 3 }}>
          <GenericCard
            value={dashboardData?.data?.userAnalytics?.totals?.users}
            title="Total Users"
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <GenericCard
            value={dashboardData?.data?.courseAnalytics?.courseOverview?.totalCourses}
            title="Total Courses"
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <GenericCard
            value={dashboardData?.data?.courseAnalytics?.courseOverview?.activeCourses}
            title="Active Courses"
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <GenericCard
            value={dashboardData?.data?.courseAnalytics?.enrollmentMetrics?.totalEnrollments}
            title="Total Enrollments"
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartWrapper title="User Growth">
            <CustomLineChart
              data={userGrowth}
              title="Monthly Revenue"
              yAxisLabel="Revenue ($)"
              // lineColor="#4CAF50"
            />
          </ChartWrapper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartWrapper title="Course OVerview">
            <CustomPieChart
              data={courseOverview}
              colors={[colors.pieChartColor2, colors.pieChartColor1, colors.error]}
            />
          </ChartWrapper>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <ChartWrapper title="User Snapshots Overview">
            <CustomBarChart data={userSnapshot} />
          </ChartWrapper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartWrapper title="User Trends">
            <CustomLineChart
              data={userTrends}
              title="Monthly Revenue"
              yAxisLabel="Revenue ($)"
              // lineColor="#4CAF50"
            />
          </ChartWrapper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartWrapper title="User OVerview">
            <CustomPieChart
              data={userOverview}
              colors={[colors.pieChartColor2, colors.pieChartColor1, colors.error]}
            />
          </ChartWrapper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartWrapper title="Enquiry Overview">
            <CustomBarChart data={enquiryOverview} />
          </ChartWrapper>
        </Grid>
         <Grid size={{ xs: 12, md: 6 }}>
          <ChartWrapper title="Enquiry Status">
            <CustomPieChart
              data={enquiryStatus}
              colors={[colors.pieChartColor2, colors.pieChartColor1]}
            />
          </ChartWrapper>
        </Grid>
        
        {/* <Grid size={{ xs: 12, md: 6 }}>
          <ChartWrapper title="Top Courses">
            <CustomLinearProgress data={topCourses} />
          </ChartWrapper>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
