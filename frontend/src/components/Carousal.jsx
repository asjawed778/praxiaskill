import user from "/imgs/slider/user_icon2.png";
import clock from "/imgs/slider/language2.png";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../store/reducers/coursesReducer";
import { setCategories } from "../store/reducers/adminCategoryReducer";
import CourseSkeleton from "./skeletons/CourseSkeleton";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  useGetAllCategoryQuery,
  useGetCategoryCourseQuery,
} from "../services/course.api";
import Button from "./Button/Button";

export default function Carousal() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.categories);
  const coursesAll = useSelector((state) => state.courses.courses);

  const [activeTab, setActiveTab] = useState(null);

  const { data: allCategories, isLoading: allCategoriesLoader } =
    useGetAllCategoryQuery();
  const { data: categoryCourse, isLoading: categoriesCourseLoader } =
    useGetCategoryCourseQuery(activeTab, {
      skip: !activeTab,
    });

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

  const sliderRef = useRef(null);

  // Function to scroll left
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -328, behavior: "smooth" });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 328, behavior: "smooth" });
    }
  };

  return (
    <div className="p-8 mt-4 w-[82vw] lg:w-full mx-auto">
      <div className="mb-6 items-center">
        <h2 className="font-sans font-semibold text-2xl text-[var(--color-primary)]">
          All the skills you need in one place
        </h2>
        <p className="text-gray-600 font-sans">
          From critical skills to technical topics, AbilitaEdge supports your
          professional development.
        </p>
      </div>

      {/* Tab Menu */}
      <div className="flex w-auto gap-4 space-x-1 overflow-x-auto carousel  scroll-snap-x scroll-smooth ">
        {categories
          .filter((_, i) => i < 4)
          .map(
            (tab) =>
              tab.courses.length !== 0 && (
                <button
                  key={tab._id}
                  onClick={() => {
                    setActiveTab(tab._id);
                  }}
                  className={`flex justify-center items-center w-fit px-0 py-2 border-b-2 cursor-pointer ${
                    activeTab === tab._id
                      ? " border-[var(--color-primary)] text-[var(--secondary-heading-color)]"
                      : " border-transparent text-[var(--alt-secondary-text-color)] carousel-item"
                  }`}
                >
                  {tab.name}
                </button>
              )
          )}
      </div>

      <div className="relative md:w-[90%] w-full">
        <hr className="border-gray-200" />
        {coursesAll?.length !== 0 && (
          <Link
            to="/courses"
            className="absolute right-0 -top-3 font-bold text-xs text-[var(--color-primary)] bg-white mx-auto"
          >
            View More
          </Link>
        )}
      </div>

      {/* Scrollable Course Cards */}
      {!(allCategoriesLoader || categoriesCourseLoader) ? (
        <div className="relative w-full">
          {/* Left Button */}
          {coursesAll?.length > 1 && (
            <button
              onClick={scrollLeft}
              className="absolute h-8 w-8 flex justify-center items-center -left-10 top-1/2 transform -translate-y-1/2 z-10  bg-primary hover:bg-primary-hover cursor-pointer text-white text-2xl rounded-full shadow-md mx-auto"
            >
              <IoIosArrowBack />
            </button>
          )}

          {/* Scrollable Container */}
          <div
            ref={sliderRef}
            className="flex overflow-x-scroll scroll-smooth scrollbar-hide gap-8 md:gap-7 p-4 whitespace-nowrap custom-scrollbar"
          >
            {coursesAll?.map((course, index) => (
              <Link
                key={index}
                to={`/course/${course?._id}`}
                className="bg-white flex flex-col h-70 gap-2 w-[300px] pb-3 rounded-lg shadow-md flex-none mx-auto md:mx-0"
              >
                <div className="w-full h-44 relative rounded-lg">
                  <img
                    src={course?.thumbnail}
                    alt={course?.title}
                    className="w-full h-full absolute rounded-lg object-cover"
                  />
                </div>
                <div className="flex flex-col px-3 w-full">
                  <h3 className="font-sans text-[var(--color-secondary)] w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    {course?.title}
                  </h3>

                  <hr className="mt-4 border-gray-200 mb-5 flex-grow" />
                  <div className="text-xs flex items-center justify-between gap-2 h-[38px]">
                    <div className="flex flex-row items-center gap-1">
                      <img
                        src={user}
                        alt="userLive"
                        className="w-[25px] h-[25px]"
                      />
                      <p className="text-gray-600">
                        {course?.courseMode?.charAt(0).toUpperCase() +
                          course?.courseMode?.slice(1).toLowerCase()}
                      </p>
                    </div>

                    <div className="flex flex-row items-center gap-1">
                      <img
                        src={clock}
                        alt="clock"
                        className="w-[25px] h-[25px]"
                      />
                      <p className="text-gray-600">
                        {course?.language === "ENGLISH_HINDI" ? "Bilingual" : course?.language?.charAt(0).toUpperCase() +
                          course?.language?.slice(1).toLowerCase()}
                      </p>
                    </div>

                    <Button className="text-white whitespace-nowrap px-3 py-1 ml-auto rounded-md duration-200">
                      Learn More
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Button */}
          {coursesAll?.length > 1 && (
            <button
              onClick={scrollRight}
              className="absolute h-8 w-8 flex justify-center items-center -right-10 top-1/2 transform -translate-y-1/2 z-10 bg-primary hover:bg-primary-hover cursor-pointer text-white text-2xl rounded-full shadow-md"
            >
              <IoIosArrowForward />
            </button>
          )}
        </div>
      ) : (
        <CourseSkeleton />
      )}
    </div>
  );
}

