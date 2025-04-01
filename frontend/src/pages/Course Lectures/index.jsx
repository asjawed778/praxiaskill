import React, { useEffect, useState } from "react";
import { useGetFullCourseContentQuery, useGetLectureVideoQuery } from "../../services/course.api";
import { useParams } from "react-router-dom";
import backgroundVideo from "/video/background_video.mp4";
import VideoPlayer from "./components/VideoPlayer";
import Sections from "./components/Sections";

const index = () => {
  const { courseId } = useParams();
  const { data: courseContent, isFetching } =
    useGetFullCourseContentQuery(courseId);
  const data = courseContent?.data;
  const [sectionIds, setSectionIds] = useState({sectionId: "", subSectionId: ""});
  const [videoSrc, setVideoSrc] = useState(null);

  const {data: lectureData, isFetching: lectureDataFetching}= useGetLectureVideoQuery({courseId, ...sectionIds}, {skip: !sectionIds.sectionId})
  console.log("lectureData", lectureData, lectureDataFetching)

  useEffect(() => {
    if(lectureData?.success)
    {
      setVideoSrc(lectureData?.data?.url)
    }
  }, [lectureData, lectureDataFetching])

  return (
    <div className="px-4">
      <div className="flex">
        <div className="flex-1 h-30">
          <VideoPlayer sectionIds={sectionIds} lectureData={lectureData} lectureDataFetching={lectureDataFetching} src={videoSrc} />
        </div>

        <div className="w-[450px]">
          <div className="h-12 border-b border-neutral-300 p-2">
            <p className="text-xl font-semibold">Content Section</p>
          </div>
          <div className="">
            <Sections sectionIds={sectionIds} courseContent={data} setSectionIds={setSectionIds} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
