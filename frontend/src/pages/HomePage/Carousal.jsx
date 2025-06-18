import { useEffect, useRef, useState, useMemo } from "react";
import {
  Box,
  Typography,
  IconButton,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  useGetAllCategoryQuery,
  useGetCoursesQuery,
} from "../../services/course.api";
import { setCourses } from "../../store/reducers/coursesReducer";
import { setCategories } from "../../store/reducers/adminCategoryReducer";
import CourseSkeleton from "../../components/skeletons/CourseSkeleton";
import CourseCard from "../../components/CourseCard";
import CustomButton from "../../components/CustomButton";

const Carousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const categories = useSelector((state) => state.categories.categories);
  const coursesAll = useSelector((state) => state.courses.courses);
  const [activeTab, setActiveTab] = useState(null);
  const [cardsPerView, setCardsPerView] = useState(1);
  const cardWidth = 300;
  const gap = 16;

  const {
    data: courses,
    isLoading,
    isFetching,
  } = useGetCoursesQuery(activeTab === "all" ? {} : { category: activeTab });

  const { data: allCategories, isFetching: allCategoriesLoading } =
    useGetAllCategoryQuery();

  const allCoursesOption = { _id: "all", name: "All Courses" };
  const filteredCategories = useMemo(() => {
    return [
      allCoursesOption,
      ...categories.filter((cat) => cat?.courses?.length > 0),
    ];
  }, [categories]);

  useEffect(() => {
    if (allCategories?.success) {
      dispatch(setCategories(allCategories.data || []));
    }
  }, [allCategories, dispatch]);

  useEffect(() => {
    if (filteredCategories.length && !activeTab) {
      setActiveTab(filteredCategories[0]._id);
    }
  }, [filteredCategories, activeTab]);

  useEffect(() => {
    if (activeTab === "all" && courses?.data?.success) {
      dispatch(setCourses(courses.data?.courses || []));
    }
  }, [activeTab, courses, dispatch]);

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
    sliderRef.current?.scrollBy({
      left: (cardWidth + gap) * cardsPerView,
      behavior: "smooth",
    });
  };

  const scrollPrev = () => {
    sliderRef.current?.scrollBy({
      left: -(cardWidth + gap) * cardsPerView,
      behavior: "smooth",
    });
  };

  const handleCourseClick = (slug) => {
    navigate(`/course/${slug}`);
  };

  return (
    <Box ref={containerRef} mt={{ xs: 4, md: 6, xl: 8 }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
        component="h2"
          sx={{
            maxWidth: "sm",
            fontSize: {
              xs: "20px",
              sm: "22px",
              md: "24px",
              lg: "26px",
              xl: "28px",
            },
            color: "#101828",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Career-Ready or Startup-Ready <br /> Your Journey Begins at Praxia
          Skill
        </Typography>
        <Typography
        component="h3"
          sx={{
            maxWidth: "md",
            fontSize: {
              xs: "14px",
              sm: "15px",
              lg: "16px",
            },
            color: "text.secondary",
            textAlign: "center",
            mt: { xs: 0.5, sm: 1 },
          }}
        >
          Whether you're just entering the workforce, upskilling for a better
          role, or laying the foundation to launch your own startup, our
          job-oriented courses equip you with the real-world skills that top
          companies and innovative ventures demand.
        </Typography>
      </Box>

      {activeTab && (
        <Tabs
          value={activeTab}
          onChange={(e, val) => setActiveTab(val)}
          variant="scrollable"
          // scrollButtons="auto"
          sx={{
            mt: { xs: 1, md: 2 },
            mb: 2,
            pl: 2,
            ml: -2,
            "& .MuiTabs-flexContainer": {
              borderBottom: "1px solid #ccc",
            },
          }}
        >
          {filteredCategories.map((tab) => (
            <Tab
              key={tab._id}
              label={tab.name}
              value={tab._id}
              sx={{
                fontSize: { xs: "14px", sm: "16px" },
                textTransform: "none",
                fontWeight: activeTab === tab._id ? "bold" : "normal",
                color:
                  activeTab === tab._id ? "primary.main" : "text.secondary",
              }}
            />
          ))}
        </Tabs>
      )}

      {allCategoriesLoading ||
        isLoading ||
        isFetching ||
        (activeTab === "all" && isLoading) ? (
        <CourseSkeleton />
      ) : courses?.data?.courses?.length ? (
        <Box sx={{ position: "relative" }}>
          <Box
            ref={sliderRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: `${gap}px`,
              scrollSnapType: "x mandatory",
              "&::-webkit-scrollbar": { display: "none" },
              pb: 1,
            }}
          >
            {courses?.data?.courses?.map((course) => (
              <Box
                key={course._id}
                sx={{
                  flex: "0 0 auto",
                  scrollSnapAlign: "start",
                }}
              >
                <CourseCard
                  width={280}
                  course={course}
                  onClick={() => handleCourseClick(course.slug)}
                />
              </Box>
            ))}
          </Box>
          <Box
            mt={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            position="relative"
          >
            <CustomButton
              label="Explore All Program"
              onClick={() => navigate("/courses")}
              sx={{
                color: "#667085",
                bgcolor: "#00FFB7",
                FontSize: {
                  xs: "15px",
                  md: "16px",
                },
                borderRadius: "8px",
                fontWeight: 600,
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(0, 255, 183, 0.2)",
                "&:hover": {
                  transform: "scale(1.08)",
                  boxShadow: "0 12px 30px rgba(0, 255, 183, 0.4)",
                  bgcolor: "#00E6A3",
                  color: "#333"
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  animation: "wave 2.5s ease-in-out infinite"
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                  animation: "shimmer 3s ease-in-out infinite"
                },
                "@keyframes wave": {
                  "0%": { left: "-100%" },
                  "50%": { left: "100%" },
                  "100%": { left: "100%" }
                },
                "@keyframes shimmer": {
                  "0%": { transform: "translateX(-100%) rotate(45deg)" },
                  "100%": { transform: "translateX(100%) rotate(45deg)" }
                }
              }}
            />
            {!isMobile && (
              <Box
                sx={{
                  position: "absolute",
                  right: 0,
                  display: "flex",
                  gap: 1.5,
                }}
              >
                <IconButton
                  onClick={scrollPrev}
                  sx={{
                    bgcolor: "#101828",
                    color: "#fff",
                    transition:
                      "transform 0.2s ease-in-out, background-color 0.2s ease-in-out",
                    "&:hover": {
                      bgcolor: "#090d14",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <IoIosArrowBack />
                </IconButton>

                <IconButton
                  onClick={scrollNext}
                  sx={{
                    bgcolor: "#101828",
                    color: "#fff",
                    transition:
                      "transform 0.2s ease-in-out, background-color 0.2s ease-in-out",
                    "&:hover": {
                      bgcolor: "#090d14",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <IoIosArrowForward />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <Typography variant="body2" color="red" align="center">
          No courses available.
        </Typography>
      )}
    </Box>
  );
};

export default Carousel;
