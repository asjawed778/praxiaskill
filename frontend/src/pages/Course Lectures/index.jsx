import React from "react";
import { useGetFullCourseContentQuery } from "../../services/course.api";
import { useParams } from "react-router-dom";
import backgroundVideo from "/video/background_video.mp4";
import VideoPlayer from "./components/VideoPlayer";
import Sections from "./components/Sections";

const index = () => {
  const { courseId } = useParams();
  const { data: courseContent, isFetching } =
    useGetFullCourseContentQuery(courseId);
  const data = courseContent?.data;
  const courseTitle = courseContent?.data?.title;
  console.log("data", data);

  return (
    <div className="px-4">
      <div className="flex">
        <div className="flex-1 h-30">
          <VideoPlayer src="https://cdn.pixabay.com/video/2025/03/03/262215_large.mp4" />
        </div>

        <div className="w-[450px]">
          <div className="h-12 border-b border-neutral-300 p-2">
            <p className="text-xl font-semibold">Content Section</p>
          </div>
          <div className="">
            <Sections specificCourse={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
