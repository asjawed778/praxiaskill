import React, { useEffect, useState } from "react";
import {
  useGetFullCourseContentQuery,
  useGetLectureVideoQuery,
} from "../../services/course.api";
import { useParams } from "react-router-dom";
import VideoPlayer from "./components/VideoPlayer";
import Sections from "./components/Sections";
import ButtonLoading from "../../components/Button/ButtonLoading";
import VideoInformation from "./components/VideoInformation";

const index = () => {
  const { courseId } = useParams();

  //this is to track if the content section is expanded or not. if it is then it will be expanded on both small and larger screens
  const [expandedLessons, setExpandedLessons] = useState({});


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
        <div className="w-full">
          <VideoPlayer
            sectionIds={sectionIds}
            lectureData={lectureData}
            lectureDataFetching={lectureDataFetching}
            src={videoSrc}
          />
          <div className="w-full">
            <VideoInformation
              sectionIds={sectionIds}
              courseContent={data}
              setSectionIds={setSectionIds}
              isSidebarOpen={isSidebarOpen}
              setExpandedLessons={setExpandedLessons}
              expandedLessons={expandedLessons}
            />
          </div>
        </div>

        <div
          className={`w-[450px] relative mr-5 ${isSidebarOpen ? "" : "hidden"}`}
        >
          <div className="sticky top-0 w-[350px] h-screen right-5 rounded-md border border-neutral-200 shadow-md z-50 overflow-y-hidden transition-all duration-300 pb-14">
            <div className="h-12 border-b border-neutral-300 p-2">
              <p className="text-xl font-semibold">Content Section</p>
            </div>
            {!courseContentFetching ? (
              data?.sections?.length > 0 ? (
                <div className="overflow-y-auto h-full custom-styled-scrollbar">
                  <Sections
                    sectionIds={sectionIds}
                    courseContent={data}
                    setSectionIds={setSectionIds}
                    expandedLessons={expandedLessons}
                    setExpandedLessons={setExpandedLessons}
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
    </div>
  );
};

export default index;
