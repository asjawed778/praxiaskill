import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Button as MUIButton,
  Stack,
  Divider,
} from "@mui/material";
import Section from "./Section";
import { useGetFullCourseContentQuery } from "@/services/course.api";

const AddCourseContent = () => {
  const { courseId } = useParams();
  const { data: courseContent, isFetching } = useGetFullCourseContentQuery(courseId);
  const data = courseContent?.data;
  const courseTitle = data?.title;
  const [deletePopUpIds, setDeletePopIds] = useState(null);

  if (isFetching) {
    return (
      <Box p={2}>
        <Typography variant="h5" fontWeight="bold">
          Course Content
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" height={100}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Course Content
      </Typography>

      <Stack spacing={4} mb={4}>
        {data?.sections?.map((section, index) => (
          <Section
            key={index}
            index={index}
            courseId={courseId}
            section={section}
            courseTitle={courseTitle}
          />
        ))}
      </Stack>

      {/* <Box display="flex" justifyContent="flex-end">
        <MUIButton variant="contained" color="primary">
          Submit
        </MUIButton>
      </Box> */}
    </Box>
  );
}

export default AddCourseContent;
