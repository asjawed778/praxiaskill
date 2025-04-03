import React, { useEffect, useState } from "react";
import {
  useGetFullCourseContentQuery,
  useGetLectureVideoQuery,
} from "../../services/course.api";
import { useParams } from "react-router-dom";
import backgroundVideo from "/video/background_video.mp4";
import VideoPlayer from "./components/VideoPlayer";
import Sections from "./components/Sections";
import ButtonLoading from "../../components/Button/ButtonLoading";

const index = () => {
  const { courseId } = useParams();

  const { data: courseContent, isFetching: courseContentFetching } =
    useGetFullCourseContentQuery(courseId);
  const data = courseContent?.data;

  //sectionsIds are the ids of selected subsection and section
  const [sectionIds, setSectionIds] = useState({
    sectionId: "",
    subSectionId: "",
  });

  //this contains the link of video to play
  const [videoSrc, setVideoSrc] = useState(null);

  //{ skip: !sectionIds.sectionId } -> when the sectionsIds is empty then this will not fetch the data
  const { data: lectureData, isFetching: lectureDataFetching } =
    useGetLectureVideoQuery(
      { courseId, ...sectionIds },
      { skip: !sectionIds.sectionId }
    );

  useEffect(() => {
    if (lectureData?.success) {
      setVideoSrc(lectureData?.data?.url);
    }
  }, [lectureData, lectureDataFetching]);

  // for section sidebar it will only showup when the view-width is larger
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="px-4">
      <div className="flex flex-grow">
        <div className="flex-1 w-full">
          <VideoPlayer
            sectionIds={sectionIds}
            lectureData={lectureData}
            lectureDataFetching={lectureDataFetching}
            src={videoSrc}
          />
        </div>

        <div
          className={`w-96 mr-5 rounded-md border border-neutral-200 shadow-md h-[calc(100vh-5rem)] z-50 overflow-y-hidden transition-all duration-300 ${
            isSidebarOpen ? "" : "hidden"
          }`}
        >
          <div className="h-12 border-b border-neutral-300 p-2">
            <p className="text-xl font-semibold">Content Section</p>
          </div>
          {!courseContentFetching ? (
            data?.sections?.length > 0 ? (
              <div className="overflow-y-auto h-full">
                <Sections
                  sectionIds={sectionIds}
                  courseContent={data}
                  setSectionIds={setSectionIds}
                />
              </div>
            ) : (
              <div className="w-full h-28 flex justify-center items-center text-neutral-500 text-sm">
                No sections available
              </div>
            )
          ) : (
            <div className="w-full h-28 flex justify-center items-center">
              <ButtonLoading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default index;
