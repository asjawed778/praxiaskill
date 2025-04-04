import React, { useEffect } from "react";
import Heading from "./Heading";
import Button from "../../components/Button/Button";
import CourseDetails from "./CourseDetails";
import { FaCheck, FaCircleCheck } from "react-icons/fa6";
import { PiNewspaper } from "react-icons/pi";
import { BiBell } from "react-icons/bi";
import Curriculum from "./Curriculum";
import { GoDotFill } from "react-icons/go";

import { NAVS } from "../../Dummy Data/Course Landing Page/data";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetFullCourseDetailsQuery } from "../../services/course.api";
import { setSpecificCourse } from "../../store/reducers/coursesReducer";

const Course = () => {
  const dispatch = useDispatch()
  const { courseId } = useParams();
  const {data:courseDetails, isLoading} = useGetFullCourseDetailsQuery(courseId)

  const navigate = useNavigate();


  useEffect(() => {
    window.scrollTo(0, 0)
    if(courseDetails?.success)
    {
      dispatch(setSpecificCourse(courseDetails?.data))
    }
  }, [courseDetails, isLoading])

  const courses = useSelector((state) => state.courses);
  const specificCourse = courses?.specificCourse;
  return (
    <div className="md:px-12 px-4">
      <div>
        <Heading specificCourse={specificCourse} />
      </div>
      <div className="bg-[#FFF7ED] -mx-12 px-12 pt-8 lg:pb-20 mt-3 flex flex-col gap-10 relative mb-20">
        {/* <div>Logo</div> */}
        <div className="lg:w-3/5 md:w-4/5 w-full flex flex-col gap-3">
          <h1 className="text-[40px] font-semibold  text-neutral-900">
            {specificCourse?.title}
          </h1>
          <p className="text-neutral-800">
            {specificCourse?.subtitle}
          </p>
          <div className="flex gap-3 items-center">
            {/* for instructor image */}
            <div className="h-8 w-8 bg-neutral-800 rounded-full">
              <img src={specificCourse?.instructor?.profilePic} className="h-full w-full rounded-full" alt={specificCourse?.instructor?.name} />
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-800">
              <span>Instrutor: </span>
              <span>{specificCourse?.instructor?.name}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3 flex-col">
          <div className="flex gap-3">
          <Button className="flex flex-col gap-0.5 w-[13rem] font-semibold">
            <span className="text-xs">Enroll for Free</span>
            <span className="text-[10px]">Starts Mar 16</span>
          </Button>
          <Button onClick={() => navigate(`/course-payment/${courseId}`,{ state: courseDetails?.data} )} className="w-[13rem] font-semibold">
            <span className="">Buy Now</span>
          </Button>
          </div>
          <p className="text-sm flex items-center gap-1">
            <span className="font-semibold">7,772</span>
            <span className="text-neutral-600">already enrolled</span>
          </p>
        </div>

        {/* absolute position div  */}
        <CourseDetails />
      </div>

      <div className="w-full md:w-4/5 lg:w-3/4 flex py-2 gap-5 md:gap-14 border-b-2 border-neutral-200 mb-10">
        {NAVS.map((item,index) => (
          <a key={index}
            className="text-sm font-semibold px-2 py-2 rounded-sm focus:text-primary focus:underline focus:bg-neutral-100 capitalize"
            href={`#${item}`}
          >
            {item}
          </a>
        ))}
      </div>

      <div
        id="about"
        className="w-full md:w-4/5 lg:w-3/4 flex flex-col gap-6 mb-10"
      >
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">What you'll learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-neutral-800">
            {specificCourse?.whatWillYouLearn?.map((item, index) => (
              <div key={index} className="flex gap-2">
                <FaCheck className="mt-1" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">Skills you'll gain</h2>
          <div className="flex flex-wrap gap-5 text-neutral-800">
            {specificCourse?.tags?.map((item, index) => (
              <span key={index} className="py-1 px-2 text-sm bg-primary-hover cursor-pointer rounded text-white hover:underline capitalize">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">Details to know</h2>
          <div className="flex md:gap-20 gap-10">
            <div className="flex flex-col gap-3 border border-neutral-200 p-4 rounded-lg ">
              <PiNewspaper size={20} />
              <span className="text-sm font-semibold">Taught in {specificCourse?.language === "ENGLISH_HINDI" ? "Bilingual" : specificCourse?.language?.slice(0,1) + specificCourse?.language?.slice(1).toLowerCase()}</span>
            </div>

            <div className="flex flex-col gap-2 border border-neutral-200 p-4 rounded-lg">
              <BiBell size={20} />
              <span className="text-sm font-semibold">Recently updated!</span>
              <span className="text-xs text-neutral-600">October 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* keypoints and thumnail  */}
      <div id="outcomes" className="flex justify-between flex-col-reverse lg:flex-row gap-10 mb-10">
        <div className="flex flex-col gap-5">
          <section>
            <h1 className="text-xl font-bold">
              Prepare for a career in Computer Science
            </h1>
          </section>

          {/* Course Features */}
          <ul className="flex flex-col gap-3">
            {specificCourse?.keypoints?.map((keypoint, index) => (
              <li key={index} className="text-sm text-neutral-600">
                <div className="flex items-center">
                  <FaCircleCheck size={8} style={{ color: "#3B82F6" }} />
                  <div className="ml-2">{keypoint}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Course Image */}
        <img
          src={specificCourse?.thumbnail}
          className="h-[220px] w-[500px] object-cover rounded-md mx-auto"
        />
      </div>

      {/* Overview */}
      <div className="w-full md:w-4/5 lg:w-3/4 flex flex-col gap-3 mb-10">
        <h1 className="font-bold text-lg">Explore Our Immersive Bootcamp</h1>

        <section className="text-justify text-sm text-neutral-700">
          <p
            dangerouslySetInnerHTML={{ __html: specificCourse?.description }}
          />
        </section>
      </div>

      {/* Curriculum */}
      <div id="courses" className="w-full md:w-4/5 lg:w-3/4 flex flex-col gap-3 mb-10">
        <h1 className="font-bold text-lg">Courses</h1>
        <Curriculum specificCourse={specificCourse} />
      </div>
    </div>
  );
};

export default Course;
