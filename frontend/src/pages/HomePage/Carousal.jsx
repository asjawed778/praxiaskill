// import user from "/imgs/slider/user_icon2.png";
// import clock from "/imgs/slider/language2.png";

// import { useEffect, useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { setCourses } from "../../store/reducers/coursesReducer";
// import { setCategories } from "../../store/reducers/adminCategoryReducer";
// import CourseSkeleton from "../../components/skeletons/CourseSkeleton";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import {
//   useGetAllCategoryQuery,
//   useGetCategoryCourseQuery,
// } from "../../services/course.api";
// import Button from "../../components/Button/Button";

// export default function Carousal() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const categories = useSelector((state) => state.categories.categories);
//   const coursesAll = useSelector((state) => state.courses.courses);

//   const [activeTab, setActiveTab] = useState(null);

//   const { data: allCategories, isFetching: allCategoriesLoader } =
//     useGetAllCategoryQuery();
//   const { data: categoryCourse, isFetching: categoriesCourseLoader } =
//     useGetCategoryCourseQuery(activeTab, {
//       skip: !activeTab,
//     });
//   useEffect(() => {
//     if (allCategories?.success) {
//       dispatch(setCategories(allCategories.data || []));
//     }
//   }, [allCategories, dispatch]);

//   useEffect(() => {
//     if (categories.length > 0 && !activeTab) {
//       setActiveTab(categories[0]._id);
//     }
//   }, [categories]);

//   useEffect(() => {
//     if (activeTab && categoryCourse?.success) {
//       dispatch(setCourses(categoryCourse?.data?.courses));
//     }
//   }, [activeTab, categoryCourse, dispatch]);

//   const sliderRef = useRef(null);

//   // Function to scroll left
//   const scrollLeft = () => {
//     if (sliderRef.current) {
//       sliderRef.current.scrollBy({ left: -328, behavior: "smooth" });
//     }
//   };

//   // Function to scroll right
//   const scrollRight = () => {
//     if (sliderRef.current) {
//       sliderRef.current.scrollBy({ left: 328, behavior: "smooth" });
//     }
//   };

//   const handleCourseClick = (courseId, title) => {
//     const courseTitle = title.toLowerCase().split(" ").join("-");
//     navigate(`/course/${courseTitle}/${courseId}`);
//   };

//   return (
//     <div className="py-6 w-[90vw] lg:w-full mx-auto ">
//       <div className="mb-6 items-center">
//         <h2 className="font-sans font-semibold text-2xl text-[var(--color-primary)]">
//           All the skills you need in one place
//         </h2>
//         <p className="text-gray-600 font-sans">
//           From critical skills to technical topics, Praxia Skill supports your
//           professional development.
//         </p>
//       </div>

//       {/* Tab Menu */}
//       <div className="flex justify-start overflow-x-scroll scroll-smooth scrollbar-hide gap-8 md:gap-7 mb-1 whitespace-nowrap custom-scrollbar border-b border-neutral-300">
//         {/* <div className="flex w-auto flex-nowrap gap-4 space-x-1 overflow-x-auto carousel  scroll-snap-x scroll-smooth"> */}
//         {categories.map(
//           (tab) =>
//             tab.courses.length !== 0 && (
//               <button
//                 key={tab._id}
//                 onClick={() => {
//                   setActiveTab(tab._id);
//                 }}
//                 className={`flex justify-center items-center w-fit px-0 py-2 border-b-2 cursor-pointer ${
//                   activeTab === tab._id
//                     ? " border-[var(--color-primary)] text-[var(--secondary-heading-color)]"
//                     : " border-transparent text-[var(--alt-secondary-text-color)] carousel-item"
//                 }`}
//               >
//                 {tab.name}
//               </button>
//             )
//         )}
//       </div>

//       {/* Scrollable Course Cards */}
//       {!(allCategoriesLoader || categoriesCourseLoader) ? (
//         <div className="relative w-full">
//           {/* Left Button */}
//           <div className="md:flex items-center justify-end gap-4 hidden mt-2">
//             {coursesAll?.length > 1 && (
//               <button
//                 onClick={scrollLeft}
//                 className="h-8 w-8 flex justify-center items-center bg-primary hover:bg-primary-hover cursor-pointer text-white text-2xl rounded-full shadow-md"
//               >
//                 <IoIosArrowBack />
//               </button>
//             )}

//             {/* Right Button */}
//             {coursesAll?.length > 1 && (
//               <button
//                 onClick={scrollRight}
//                 className="h-8 w-8 flex justify-center items-center bg-primary hover:bg-primary-hover cursor-pointer text-white text-2xl rounded-full shadow-md"
//               >
//                 <IoIosArrowForward />
//               </button>
//             )}
//           </div>

//           {/* Scrollable Container */}
//           <div
//             ref={sliderRef}
//             className="flex overflow-x-scroll scroll-smooth scrollbar-hide gap-8 md:gap-7 py-4  custom-scrollbar"
//           >
//             {coursesAll?.map((course, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleCourseClick(course._id, course?.title)}
//                 className="bg-white flex flex-col gap-2 w-[300px] h-[300px]  pb-3 rounded-lg shadow-md flex-none mx-auto md:mx-0 cursor-pointer"
//               >
//                 <div className="flex  w-full h-44 relative rounded-lg">
//                   <img
//                     src={course?.thumbnail}
//                     alt={course?.title}
//                     className="w-full h-full absolute rounded-lg object-cover"
//                   />
//                 </div>
//                 <div className="flex flex-col px-3 w-full">
//                   <h3 className="font-sans text-[var(--color-secondary)] w-full text-sm break-words line-clamp-2 text-left">

//                     {course?.title}
//                   </h3>

//                   <hr className="mt-2 border-gray-200 mb-5 flex-grow" />
//                   <div className="text-xs flex items-center justify-between gap-2 h-[24px]">
//                     <div className="flex flex-row items-center gap-1">
//                       <img
//                         src={user}
//                         alt="userLive"
//                         className="w-[25px] h-[25px]"
//                       />
//                       <p className="text-gray-600">
//                         {course?.courseMode?.charAt(0).toUpperCase() +
//                           course?.courseMode?.slice(1).toLowerCase()}
//                       </p>
//                     </div>

//                     <div className="flex flex-row items-center gap-1">
//                       <img
//                         src={clock}
//                         alt="clock"
//                         className="w-[25px] h-[25px]"
//                       />
//                       <p className="text-gray-600">
//                         {course?.language === "ENGLISH_HINDI"
//                           ? "Bilingual"
//                           : course?.language?.charAt(0).toUpperCase() +
//                             course?.language?.slice(1).toLowerCase()}
//                       </p>
//                     </div>

//                     <Button className="text-white whitespace-nowrap px-3 py-1 ml-auto rounded-md duration-200">
//                       Learn More
//                     </Button>
//                   </div>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <CourseSkeleton />
//       )}
//       <div className="relative w-full">
//         {coursesAll?.length !== 0 && (
//           <Link
//             to="/courses"
//             className="absolute right-0 top-0 font-bold text-xs text-[var(--color-primary)] bg-white mx-auto cursor-pointer z-50"
//           >
//             View More
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// }





import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Divider,
  Container,
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

  const categories = useSelector((state) => state.categories.categories);
  const coursesAll = useSelector((state) => state.courses.courses);

  const [activeTab, setActiveTab] = useState(null);

  const { data: allCategories, isFetching: allCategoriesLoading } =
    useGetAllCategoryQuery();
  const { data: categoryCourse, isFetching: categoryCourseLoading } =
    useGetCategoryCourseQuery(activeTab, { skip: !activeTab });

  useEffect(() => {
    if (allCategories?.success) {
      dispatch(setCategories(allCategories.data || []));
    }
  }, [allCategories, dispatch]);

  useEffect(() => {
    if (categories.length > 0 && !activeTab) {
      setActiveTab(categories[0]._id);
    }
  }, [categories]);

  useEffect(() => {
    if (activeTab && categoryCourse?.success) {
      dispatch(setCourses(categoryCourse?.data?.courses));
    }
  }, [activeTab, categoryCourse, dispatch]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -328, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 328, behavior: "smooth" });
    }
  };

  const handleCourseClick = (id, title) => {
    const slug = title.toLowerCase().split(" ").join("-");
    navigate(`/course/${slug}/${id}`);
  };

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          All the skills you need in one place
        </Typography>
        <Typography variant="body2" color="textSecondary">
          From critical skills to technical topics, Praxia Skill supports your
          professional development.
        </Typography>
      </Box>

      {/* Category Tabs */}
      <Tabs
        value={activeTab}
        onChange={(e, newVal) => setActiveTab(newVal)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 2,
          borderBottom: "1px solid #ccc",
        }}
      >
        {categories.map(
          (tab) =>
            tab.courses.length !== 0 && (
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
            )
        )}
      </Tabs>

      {!(allCategoriesLoading || categoryCourseLoading) ? (
        <Box sx={{ position: "relative" }}>
          {/* Scroll Buttons */}
          {coursesAll?.length > 1 && (
            <Box display="flex" justifyContent="flex-end" gap={2} mb={1}>
              <IconButton
                onClick={scrollLeft}
                sx={{ bgcolor: "primary.main", color: "#fff" }}
              >
                <IoIosArrowBack />
              </IconButton>
              <IconButton
                onClick={scrollRight}
                sx={{ bgcolor: "primary.main", color: "#fff" }}
              >
                <IoIosArrowForward />
              </IconButton>
            </Box>
          )}

          {/* Course Cards */}
          <Box
            ref={sliderRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              scrollBehavior: "smooth",
              gap: 3,
              py: 2,
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {coursesAll?.map((course, index) => (
              <Card
                key={index}
                onClick={() => handleCourseClick(course._id, course.title)}
                sx={{
                  width: 300,
                  // maxWidth: 300,
                  height: 300,
                  // flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  boxShadow: 3,
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    height: 160,
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f5f5f5",
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
                    }}
                  />
                </Box>

                {/* <CardContent sx={{ px: 1, py: 0.5 }}> */}
                  <Typography
                    variant="subtitle2"
                    color="text.primary"
                    sx={{
                      fontWeight: 600,
                      lineHeight: 1.4,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color: "secondary",
                      px: 1
                    }}
                  >
                    {course.title}
                  </Typography>
                {/* </CardContent> */}

                <Divider />

                <CardActions
                  sx={{
                    px: 2,
                    pb: 1,
                    pt: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 1,
                  }}
                >
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <img src={userIcon} alt="mode" width={20} height={20} />
                    <Typography variant="caption" color="text.secondary">
                      {course?.courseMode?.charAt(0).toUpperCase() +
                        course?.courseMode?.slice(1).toLowerCase()}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={0.5}>
                    <img src={clockIcon} alt="lang" width={20} height={20} />
                    <Typography variant="caption" color="text.secondary">
                      {course.language === "ENGLISH_HINDI"
                        ? "Bilingual"
                        : course.language?.charAt(0).toUpperCase() +
                          course.language?.slice(1).toLowerCase()}
                    </Typography>
                  </Box>

                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      marginLeft: "auto",
                      whiteSpace: "nowrap",
                      fontSize: 12,
                    }}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>

          {coursesAll?.length !== 0 && (
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Link
                to="/courses"
                style={{color: "red", textDecoration: "none",fontWeight: "bold",
                  fontSize: 12, }}                 
              >
                View More
              </Link>
            </Box>
          )}
        </Box>
      ) : (
        <CourseSkeleton />
      )}
    </Box>
  );
};

export default Carousel;
