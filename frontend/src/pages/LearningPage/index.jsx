import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Container,
  CircularProgress,
  Stack,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import CourseCard from "@/components/CourseCard";
import CustomButton from "@/components/CustomButton";
import CoursePagination from "./CoursePagination";
import { useGetCoursesQuery } from "@/services/course.api";
import CustomSearchField from "@/components/CustomSearchField";
import CustomDropdownField from "@/components/CustomDropdownField";

const LearningPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(12);
  const [selectedCourseCategory, setSelectedCourseCategory] = useState(null);

  const navigate = useNavigate();

  const {
    data: courses,
    isLoading,
    isError,
  } = useGetCoursesQuery({
    page: currentPage,
    limit,
    search: searchQuery,
    category: selectedCourseCategory,
  });
  
  const totalCourses = courses?.data?.totalCourses || 0;
  const totalPages = Math.ceil(totalCourses / limit);
  
  const handleClearFilter = () => {
    setSearchQuery("");
    setSelectedCourseCategory(null);
    setCurrentPage(1);
  };

  const handleNavigate = (slug) => {
    navigate(`/course/${slug}`);
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCourseCategory]);

  return (
    <Container maxWidth="lg">
      <Box py={2}>
        <Typography
          sx={{
            textAlign: "center",
            mb: 2,
            fontWeight: 600,
            fontSize: {
              xs: "32px",
              sm: "36px",
              md: "40px",
              lg: "44px",
              xl: "48px",
            },
          }}
        >
          Explore Our Courses
        </Typography>

        <Grid container spacing={2} mb={4} px={1}>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomSearchField
              placeholder="Search Courses..."
              value={searchQuery}
              onSearch={setSearchQuery}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} noWrap>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "flex-start", md: "center" },
                gap: 2,
              }}
            >
              <Stack
                direction={{ xs: "row", sm: "row" }}
                spacing={2}
                alignItems={{ xs: "stretch", sm: "center" }}
                width="100%"
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
                  label="Clear Filters"
                  variant="outlined"
                  onClick={handleClearFilter}
                  sx={{
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    height: 40,
                  }}
                />
              </Stack>
            </Box>
          </Grid>
        </Grid>
        {isLoading ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            py={4}
          >
            <Typography align="center" mb={2}>
              Loading courses...
            </Typography>
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            py={4}
          >
            <Typography align="center" color="primary" mb={2}>
              Somethings worngs. Please try again!
            </Typography>
          </Box>
        ): courses?.data?.courses.length === 0 ? (
          <Typography align="center" color="red">
            No courses found.
          </Typography>
        ) : (
          <Box
            display="flex"
            flexWrap="wrap"
            sx={{
              alignItems: "center",
              alignContent: "center",
              justifyContent: {
                xs: "center",
                sm: "flex-start",
              },
            }}
            gap={1}
          >
            {courses?.data?.courses?.map((course) => (
              <CourseCard
                key={course?._id}
                course={course}
                onClick={() => handleNavigate(course.slug)}
              />
            ))}
          </Box>
        )}
        {courses?.data?.courses.length > 0 && (
          <>
            <Box
              display="flex"
              flexWrap="wrap"
              sx={{
                alignItems: "center",
                justifyContent: {
                  xs: "center",
                  sm: "flex-start",
                },
              }}
              gap={2}
            >
            </Box>

            <Box display="flex" justifyContent="center" mt={5}>
              <CoursePagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                limit={limit}
                totalCourses={totalCourses}
              />
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default LearningPage;
