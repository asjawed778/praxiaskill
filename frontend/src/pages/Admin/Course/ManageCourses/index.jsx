import { useRef, useState } from "react";
import { Box, Paper, Tab, useTheme, useMediaQuery, Grid } from "@mui/material";
import { useAppTheme } from "@/context/ThemeContext";
import CustomDropdownField from "@/components/CustomDropdownField";
import CustomSearchField from "@/components/CustomSearchField";
import CustomButton from "@/components/CustomButton";
import TableWrapper from "@/components/TableWrapper";
import DialogBoxWrapper from "@/components/DialogBoxWrapper";
import { useGetCoursesQuery } from "@/services/course.api";
import { useNavigate } from "react-router-dom";
import { CourseStatus } from "@/utils/enum";
import toast from "react-hot-toast";
import { useUpdateCourseStatusMutation } from "@/services/course.api";

import AddIcon from "@mui/icons-material/Add";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import PublishIcon from "@mui/icons-material/Publish";

const actionsList = (row) => {
  const isPublishable =
    row?.courseStatus === CourseStatus.TERMINATED ||
    row?.courseStatus === CourseStatus.DRAFT;

  return [
    {
      action: "addContent",
      label: "Add Content",
      icon: <AddIcon />,
      color: "primary",
    },
    {
      action: "lectures",
      label: "Lectures",
      icon: <MenuBookIcon />,
      color: "secondary",
    },
    {
      action: "updateCourse",
      label: "Update Course",
      icon: <EditIcon />,
      color: "info",
    },
    {
      action: "terminateCourse",
      label: isPublishable ? "Publish Course" : "Terminate Course",
      icon: isPublishable ? <PublishIcon /> : <CancelIcon />,
      color: isPublishable ? "success" : "error",
    },
  ];
};

const tabLabels = [
  { label: "All Courses", value: null },
  { label: "Active Courses", value: CourseStatus.PUBLISHED },
  { label: "Draft Courses", value: CourseStatus.DRAFT },
  { label: "Terminated Courses", value: CourseStatus.TERMINATED },
];

const courseColumns = [
  { key: "sno.", label: "S.No." },
  { key: "title", label: "Course Title" },
  { key: "category", label: "Category" },
];

const ManageCourses = () => {
  const [filter, setFilter] = useState(null);
  const courseManagePageRef = useRef(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(false);
  const [openTerminateCourseModal, setOpenTerminateCourseModal] =
    useState(false);
  const [selectedCourseCategory, setSelectedCourseCategory] = useState(null);

  const navigate = useNavigate();
  const theme = useTheme();
  const { colors } = useAppTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    data: courses,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetCoursesQuery({
    page: page + 1,
    limit,
    search: searchQuery,
    category: selectedCourseCategory,
    status: filter,
  });
  const [terminateCourse, { isLoading: terminateCourseLoading }] =
    useUpdateCourseStatusMutation();

  const coursesData = courses?.data?.courses.map((course) => ({
    ...course,
    category: course?.category.name,
  }));

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(0);
  };
  //   useEffect(() => {
  //   refetch();
  // }, [location]);

  const handleActionClick = (action, row) => {
    setSelectedCourse(row);
    switch (action) {
      case "addContent":
        navigate(`/dashboard/course/content/${row?._id}`);
        break;
      case "lectures":
        navigate(`/course-lecture/${row?._id}`);
        break;
      case "updateCourse":
        setEditMode(true);
        navigate("/dashboard/add-course", {
          state: {
            course: row,
            editMode,
          },
          replace: false,
        });
        break;
      case "terminateCourse":
        setOpenTerminateCourseModal(true);
        break;
    }
  };
  const handleChangeTab = (val) => {
    setFilter(val);
    setPage(0);
  };
  const activeTabIndex = tabLabels.findIndex((tab) => tab.value === filter);

  const handleUpdateCourseStatus = async () => {
    try {
      await terminateCourse({
        courseId: selectedCourse?._id,
        status:
          selectedCourse?.courseStatus === CourseStatus.PUBLISHED
            ? CourseStatus.TERMINATED
            : CourseStatus.PUBLISHED,
      }).unwrap();

      const message =
        selectedCourse?.courseStatus === CourseStatus.PUBLISHED
          ? "Course Terminated Successfully."
          : "Course Published Successfully.";
      toast.success(message);
      navigate("/dashboard/manage-course");
      refetch();
      setOpenTerminateCourseModal(false);
    } catch (error) {
      const errorMessage =
        error?.data?.message ||
        error?.error ||
        "Something went wrong. Please try again!";
      console.log("error: ", errorMessage);

      toast.error(errorMessage);
    }
  };

  return (
    <Box ref={courseManagePageRef} sx={{ width: "100%", px: 2, mt: 4, mb: 2 }}>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          mx: "auto",
          mb: 3,
          p: 1,
          borderRadius: 3,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)"
              : "linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.05) 100%)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.08)"
          }`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            bottom: 8,
            width: `calc(${100 / tabLabels.length}% - 16px)`,
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primary}DD 50%, ${colors.primary}AA 100%)`,
            borderRadius: 2,
            transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transform: `translateX(calc(${activeTabIndex} * (100% + 8px)))`,
            zIndex: 1,

            "&::before": {
              content: '""',
              position: "absolute",
              inset: -1,
              background: `linear-gradient(135deg, ${colors.primary}30, transparent, ${colors.primary}20)`,
              borderRadius: 2.5,
              filter: "blur(4px)",
              zIndex: -1,
            },

            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              animation: "shimmer 3s infinite",
              borderRadius: 2,
            },

            "@keyframes shimmer": {
              "0%": { left: "-100%" },
              "100%": { left: "100%" },
            },
          }}
        />

        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap={isMobile ? "wrap" : "nowrap"}
          gap={1}
          position="relative"
          zIndex={2}
        >
          {tabLabels.map((tab, index) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
              onClick={() => handleChangeTab(tab.value)}
              sx={{
                flex: 1,
                minWidth: isMobile ? "100%" : 120,
                px: 2.5,
                py: 1.5,
                borderRadius: 2,
                whiteSpace: "nowrap",
                textTransform: "none",
                position: "relative",
                zIndex: 3,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

                color:
                  filter === tab.value ? "#fff" : theme.palette.text.primary,
                fontWeight: filter === tab.value ? 700 : 500,
                fontSize: isMobile ? "0.8rem" : "0.875rem",
                textAlign: "center",

                "&:hover": {
                  color: filter === tab.value ? "#fff" : colors.primary,
                  transform:
                    filter === tab.value
                      ? "translateY(-1px)"
                      : "translateY(-2px) scale(1.01)",
                },
                "&:active": {
                  transform: "translateY(0px) scale(0.98)",
                  transition: "all 0.1s ease",
                },
                [theme.breakpoints.down("sm")]: {
                  py: 1.2,
                  fontSize: "0.75rem",
                  minWidth: "auto",
                  flex: isMobile ? "1 1 auto" : 1,
                },
              }}
            />
          ))}
        </Box>
      </Paper>

      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          gap: 2,
          mb: 2,
        }}
      >
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomSearchField
            placeholder="Search Courses..."
            onSearch={setSearchQuery}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
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
            />
          </Box>
        </Grid>
      </Grid>

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
        isError={isError}
        actionsList={actionsList}
      />
      {openTerminateCourseModal && (
        <DialogBoxWrapper
          open={openTerminateCourseModal}
          onClose={() => setOpenTerminateCourseModal(false)}
          onConfirm={handleUpdateCourseStatus}
          isLoading={terminateCourseLoading}
          title={
            selectedCourse?.courseStatus === CourseStatus.PUBLISHED
              ? "Terminate Course"
              : "Publish Course"
          }
          message={
            <>
              {selectedCourse?.courseStatus === CourseStatus.PUBLISHED ? (
                <>
                  Are you sure you want to terminate the{" "}
                  <strong>"{selectedCourse?.title}"</strong> course? Once
                  terminated, it will no longer be available.
                </>
              ) : (
                <>
                  Are you sure you want to publish the{" "}
                  <strong>"{selectedCourse?.title}"</strong> course? After this,
                  the course will be live.
                </>
              )}
            </>
          }
        />
      )}
    </Box>
  );
};

export default ManageCourses;
