import { useState } from "react";
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
  Stack,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  useGetAllPublishedCourseQuery,
  useGetAllCategoryQuery,
  useGetCategoryCourseQuery,
} from "@/services/course.api";
import { useNavigate } from "react-router-dom";
import CourseCard from "./CourseCard";
import CustomButton from "../../components/CustomButton";

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

  const handleNavigate = (courseId, title) => {
    const slug = title.toLowerCase().split(" ").join("-");
    navigate(`/course/${courseId}/${slug}`);
  };

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
            <TextField
              value={searchQuery}
              size="small"
              borderRadius="8px"
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
              {/* <Typography fontWeight={600} flexShrink={0}>
                Filter by Category:
              </Typography> */}

              <Stack
                direction={{ xs: "row", sm: "row" }}
                spacing={2}
                alignItems={{ xs: "stretch", sm: "center" }}
                width="100%"
              >
                <Select
                  value={categoryId}
                  size="small"
                  onChange={(e) => setCategoryId(e.target.value)}
                  displayEmpty
                  fullWidth
                  sx={{ minWidth: 150 }}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>

                <CustomButton
                  label="Clear Filters"
                  variant="outlined"
                  onClick={handleClearFilter}
                  sx={{
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    height: 45,
                  }}
                />
                {/* Clear Filters
                </Button> */}
              </Stack>
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
          // <Grid
          //   container
          //   spacing={1}
          // sx={{
          //   justifyContent: {
          //     xs: "center",
          //     sm: "flex-start",
          //   },
          // }}
          // >
          //   {courses.map((course) => (
          //     <Grid
          //       item
          //       xs={12}
          //       sm={6}
          //       md={4}
          //       key={course._id}
          //     >
          //       <CourseCard course={course} onClick={handleNavigate} />
          //     </Grid>
          //   ))}
          // </Grid>
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
            {courses?.map((course) => (
              <CourseCard
                key={course?._id}
                course={course}
                onClick={handleNavigate}
              />
            ))}
          </Box>
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
