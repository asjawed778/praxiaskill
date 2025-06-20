import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { FaCheck, FaCircleCheck } from "react-icons/fa6";
import { PiNewspaper } from "react-icons/pi";
import { BiBell } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetFullCourseDetailsQuery } from "../../services/course.api";
import { setSpecificCourse } from "../../store/reducers/coursesReducer";
import SEOHelmet from "../../SEO/SEOHelmet";
import { generateOrganizationSchema } from "../../SEO/SEOHelper";
import { Box, CircularProgress, Typography } from "@mui/material";
import Landing from "./Landing";

const CourseLandingPage = () => {
  const dispatch = useDispatch()
  const { slug } = useParams();
  const { data: courseDetails, isLoading, isError } = useGetFullCourseDetailsQuery(slug);
  
  
  useEffect(() => {
    window.scrollTo(0, 0)
    if (courseDetails?.success) {
      dispatch(setSpecificCourse(courseDetails?.data))
    }
  }, [courseDetails, isLoading])

  const courses = useSelector((state) => state.courses);
  const specificCourse = courses?.specificCourse;
  const courseSEOSchema = generateOrganizationSchema({
    name: specificCourse?.title,
    url: `https://praxiaskill.com/course/${slug}`,
    logo: specificCourse?.thumbnail,
  })
  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        my={4}
        height="40vh"
      >
        <Typography variant="h5" my={4} color="text.primary">
          Course is loading, please wait...
        </Typography>
        <CircularProgress size={30} thickness={4} />
      </Box>
    );
  }
  if (isError) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        my={4}
        height="40vh"
      >
        <Typography variant="h5" my={4} color="error">
          Somethings are wrong. Please refresh the page!
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <SEOHelmet
        title={specificCourse?.title}
        description={specificCourse?.description}
        keywords={specificCourse?.tags?.join(", ")}
        image={specificCourse?.thumbnail}
        url={`https://praxiaskill.com/course/${slug}`}
        robots="index, follow"
        schema={courseSEOSchema}
      />
      <Landing course={specificCourse} />
    </>
  );
};

export default CourseLandingPage;
