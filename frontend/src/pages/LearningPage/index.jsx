import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Select,
  MenuItem,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Pagination,
  Container,
  CircularProgress,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  useGetAllPublishedCourseQuery,
  useGetAllCategoryQuery,
  useGetCategoryCourseQuery,
} from "@/services/course.api";
import { useNavigate } from "react-router-dom";
import CourseCard from "./CourseCard";

const LearningPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const navigate = useNavigate();

  const { data: categoriesData } = useGetAllCategoryQuery();
  const { data: publishedCourses, isFetching: isLoading } =
    useGetAllPublishedCourseQuery(currentPage);
  const { data: CategoryCourses, isLoading: categoryCoursesLoading } =
    useGetCategoryCourseQuery(categoryId, { skip: !categoryId });
  const categories = categoriesData?.data || [];
  const coursesData = categoryId
    ? CategoryCourses?.data
    : publishedCourses?.data;
  const courses = coursesData?.courses || [];

  const totalPages = coursesData?.totalPages || 1;

  const handleSearch = () => {
    setSearchTerm(searchQuery.trim());
  };

  const handleClearFilter = () => {
    setCategoryId("");
    setSearchQuery("");
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleNavigate = (id, title) => {
    const slug = title.toLowerCase().split(" ").join("-");
    navigate(`/course/${slug}/${id}`);
  };

  return (
    <Container maxWidth="lg">
      <Box py={5}>
        <Typography variant="h4" align="center" mb={4}>
          Explore Our Courses
        </Typography>
        <Grid container spacing={2} mb={4} px={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              value={searchQuery}
              size="small"
              fullWidth
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search courses..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ flexGrow: 1, minWidth: 250 }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              display="flex"
              sx={{
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: 2,
                width: "100%",
                justifyContent: "flex-start",
              }}
            >
              <Typography fontWeight={600} flexShrink={0}>
                Filter by Category:
              </Typography>
              <Box
                display="flex"
                flexWrap="wrap"
                gap={2}
                sx={{ flexDirection: { sm: "row" }, width: "100%" }}
              >
                <Select
                  value={categoryId}
                  size="small"
                  onChange={(e) => setCategoryId(e.target.value)}
                  displayEmpty
                  sx={{ minWidth: 150, flexGrow: 1 }}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>

                <Button
                  variant="outlined"
                  onClick={handleClearFilter}
                  sx={{ flexShrink: 0 }}
                >
                  Clear Filters
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        {isLoading || categoryCoursesLoading ? (
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
        ) : courses.length === 0 ? (
          <Typography align="center" color="red">
            No courses found. Try again!
          </Typography>
        ) : (
          <Grid container spacing={1}>
            {courses.map((course) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={course._id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CourseCard course={course} onClick={handleNavigate} />
              </Grid>
            ))}
          </Grid>
        )}
        {courses.length > 0 && (
          <Box display="flex" justifyContent="center" mt={5}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => setCurrentPage(page)}
              shape="rounded"
              color="primary"
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default LearningPage;
