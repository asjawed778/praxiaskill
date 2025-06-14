import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Paper,
  Tab,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useAppTheme } from "../../../../context/ThemeContext";
import CustomDropdownField from "@/components/CustomDropdownField";
import CustomSearchField from "@/components/CustomSearchField";
import CustomButton from "../../../../components/CustomButton";
import TableWrapper from "../../../../components/TableWrapper";
import { useGetCoursesQuery } from "../../../../services/course.api";


const ManageCourses = () => {
  const [filter, setFilter] = useState(2);
  const courseManagePageRef = useRef(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedCourseCategory, setSelectedCourseCategory] = useState(null);
  // const navigate = useNavigate();

  const {
    data: courses,
    isLoading,
    isFetching,
    isError,
  } = useGetCoursesQuery({
    page: page + 1,
    limit: 10,
    search: searchQuery,
    category: selectedCourseCategory,
    status: statusFilter,
  });
  const coursesData = courses?.data?.courses.map((course) => ({
      ...course,
    category: course?.category.name
  }));

  const theme = useTheme();
  const { colors } = useAppTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const tabLabels = [
    { label: "All Courses", value: 1 },
    { label: "Active Courses", value: 2 },
    { label: "Draft Courses", value: 3 },
    { label: "Terminated Courses", value: 4 },
  ];
  const courseColumns = [
  { key: "sno.", label: "S.No." },
  { key: "title", label: "Course Title" },
  { key: "category", label: "Category" },
];
const actionsList = [
  {
    action: "addContent",
    label: "Add Content",
  },
  {
    action: "lectures",
    label: "Lectures",
  },
  {
    action: "updateCourse",
    label: "Update Courese",
  },
  {
    action: "terminateCourse",
    label: "Terminate Course",
  },
];
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleRowsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(0);
  };

  const handleActionClick = (action, row) => {
    switch (action) {
      case "addContent":
        // navigate(`/dashboard/course/content/${row?._id}`)
        alert("addContent");
        break;
      case "lectures":
        alert("lectures");
        break;
      case "updateCourse":
        alert("updateCourse");
        break;
      case "terminateCourse":
        alert("terminateCourse");
        break;
    }
  };
  const handleChange = (val) => {
    setStatusFilter(val);
    setPage(0);
  };

  return (
    <Box ref={courseManagePageRef} sx={{ width: "100%", px: 2, mt: 4, mb: 2 }}>
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          mx: "auto",
          mb: 2,
          p: 1,
          borderRadius: 2,
          overflowX: "auto",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap={isMobile ? "wrap" : "nowrap"}
          gap={1}
        >
          {tabLabels.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
              onClick={() => setFilter(tab.value)}
              sx={{
                flex: 1,
                minWidth: 120,
                px: 2,
                py: 1,
                borderRadius: 1,
                whiteSpace: "nowrap",
                textTransform: "none",
                backgroundColor:
                  filter === tab.value ? colors.primary : "transparent",
                color: filter === tab.value ? "#fff" : "text.primary",
                fontWeight: filter === tab.value ? "bold" : "normal",
                textAlign: "center",
                "&:hover": {
                  backgroundColor:
                    filter === tab.value
                      ? "primary.dark"
                      : theme.palette.action.hover,
                },
              }}
            />
          ))}
        </Box>
      </Paper>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 2,
          mb: 2,
        }}
      >
        {" "}
        <CustomSearchField
          placeholder="Search courses..."
          onSearch={setSearchQuery}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <CustomDropdownField
            label="Filter by Category"
            placeholder="Select Category"
            value={selectedCourseCategory}
            onChange={setSelectedCourseCategory}
            endpoint="course/category"
            required={false}
          />

          <CustomButton
            label="Clear Filter"
            variant="outlined"
            onClick={() => setSelectedCourseCategory(null)}
            sx={{
              whiteSpace: "nowrap",
            }}
          />
        </Box>
      </Box>
      <TableWrapper
        columns={courseColumns}
        rows={coursesData || []}
        totalCount={courses?.data?.totalCourses || 0}
        page={page}
        rowsPerPage={limit}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onActionClick={handleActionClick}
        isLoading={isLoading || isFetching}
        actionsList={actionsList}
      />
    </Box>
  );
};

export default ManageCourses;
