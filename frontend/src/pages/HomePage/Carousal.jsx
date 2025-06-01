import { useEffect, useRef, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  IconButton,
  Card,
  CardActions,
  Divider,
  useTheme,
} from "@mui/material";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  useGetAllCategoryQuery,
  useGetCategoryCourseQuery,
} from "../../services/course.api";
import { setCourses } from "../../store/reducers/coursesReducer";
import { setCategories } from "../../store/reducers/adminCategoryReducer";
import CourseSkeleton from "../../components/skeletons/CourseSkeleton";
import userIcon from "/imgs/slider/user_icon2.png";
import clockIcon from "/imgs/slider/language2.png";

const Carousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const theme = useTheme();

  const categories = useSelector((state) => state.categories.categories);
  const coursesAll = useSelector((state) => state.courses.courses);

  const [activeTab, setActiveTab] = useState(null);
  const [cardsPerView, setCardsPerView] = useState(1);
  const cardWidth = 300; // consistent with MUI Card style
  const gap = 16;

  const { data: allCategories, isFetching: allCategoriesLoading } =
    useGetAllCategoryQuery();
  const { data: categoryCourse, isFetching: categoryCourseLoading } =
    useGetCategoryCourseQuery(activeTab, {
      skip: !activeTab,
    });

  useEffect(() => {
    if (allCategories?.success) {
      dispatch(setCategories(allCategories.data || []));
    }
  }, [allCategories, dispatch]);

  useEffect(() => {
    if (categories.length && !activeTab) {
      setActiveTab(categories[0]._id);
    }
  }, [categories, activeTab]);

  useEffect(() => {
    if (activeTab && categoryCourse?.success) {
      dispatch(setCourses(categoryCourse?.data?.courses));
    }
  }, [activeTab, categoryCourse, dispatch]);

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = containerRef.current?.offsetWidth || 0;
      const totalCardSpace = cardWidth + gap;
      setCardsPerView(Math.floor(width / totalCardSpace));
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const scrollNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: (cardWidth + gap) * cardsPerView,
        behavior: "smooth",
      });
    }
  };

  const scrollPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -(cardWidth + gap) * cardsPerView,
        behavior: "smooth",
      });
    }
  };

  const handleCourseClick = (id, title) => {
    const slug = encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-"));
    navigate(`/course/${slug}/${id}`);
  };

  return (
    <Box ref={containerRef}>
      <Box mb={2}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          All the skills you need in one place
        </Typography>
        <Typography variant="body2" color="textSecondary">
          From critical skills to technical topics, Praxia Skill supports your
          professional development.
        </Typography>
      </Box>

      <Tabs
        value={activeTab}
        onChange={(e, val) => setActiveTab(val)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2, borderBottom: "1px solid #ccc" }}
      >
        {categories
          .filter((cat) => cat.courses.length > 0)
          .map((tab) => (
            <Tab
              key={tab._id}
              label={tab.name}
              value={tab._id}
              sx={{
                textTransform: "none",
                fontWeight: activeTab === tab._id ? "bold" : "normal",
                color:
                  activeTab === tab._id ? "primary.main" : "text.secondary",
              }}
            />
          ))}
      </Tabs>

      {allCategoriesLoading || categoryCourseLoading ? (
        <CourseSkeleton />
      ) : coursesAll?.length ? (
        <Box sx={{ position: "relative" }}>
          <Box display="flex" justifyContent="flex-end" gap={2} mb={1}>
            <IconButton
              onClick={scrollPrev}
              sx={{ bgcolor: "primary.main", color: "#fff" }}
            >
              <IoIosArrowBack />
            </IconButton>
            <IconButton
              onClick={scrollNext}
              sx={{ bgcolor: "primary.main", color: "#fff" }}
            >
              <IoIosArrowForward />
            </IconButton>
          </Box>

          <Box
            ref={sliderRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: `${gap}px`,
              scrollSnapType: "x mandatory",
              "&::-webkit-scrollbar": { display: "none" },
              py: 1,
            }}
          >
            {coursesAll.map((course) => (
              <Card
                key={course._id}
                onClick={() => handleCourseClick(course._id, course.title)}
                sx={{
                  width: cardWidth,
                  minWidth: cardWidth,
                  height: 300,
                  flex: "0 0 auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  boxShadow: 3,
                  borderRadius: 2,
                  scrollSnapAlign: "start",
                }}
              >
                <Box
                  sx={{
                    height: 160,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "#f5f5f5",
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    loading="lazy"
                  />
                </Box>

                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    lineHeight: 1.4,
                    px: 1,
                    mt: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {course.title}
                </Typography>

                <Divider sx={{ my: 1 }} />

                <CardActions
                  sx={{ px: 2, pb: 1, pt: 0, justifyContent: "space-between" }}
                >
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <img src={userIcon} alt="mode" width={20} height={20} />
                    <Typography variant="caption" color="text.secondary">
                      {course.courseMode?.[0]?.toUpperCase() +
                        course.courseMode?.slice(1).toLowerCase()}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={0.5}>
                    <img src={clockIcon} alt="lang" width={20} height={20} />
                    <Typography variant="caption" color="text.secondary">
                      {course.language === "ENGLISH_HINDI"
                        ? "Bilingual"
                        : course.language?.[0]?.toUpperCase() +
                          course.language?.slice(1).toLowerCase()}
                    </Typography>
                  </Box>

                  <Button
                    size="small"
                    variant="contained"
                    sx={{ fontSize: 12 }}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Link
              to="/courses"
              style={{
                color: theme.palette.error.main,
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              View More
            </Link>
          </Box>
        </Box>
      ) : (
        <Typography variant="body2" color="textSecondary" align="center">
          No courses available.
        </Typography>
      )}
    </Box>
  );
};

export default Carousel;
