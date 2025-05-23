import user from "/imgs/slider/user_icon2.png";
import clock from "/imgs/slider/language2.png";

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../../store/reducers/coursesReducer";
import { setCategories } from "../../store/reducers/adminCategoryReducer";
import CourseSkeleton from "../../components/skeletons/CourseSkeleton";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  useGetAllCategoryQuery,
  useGetCategoryCourseQuery,
} from "../../services/course.api";
import Button from "../../components/Button/Button";

export default function Carousal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector((state) => state.categories.categories);
  const coursesAll = useSelector((state) => state.courses.courses);

  const [activeTab, setActiveTab] = useState(null);

  const { data: allCategories, isFetching: allCategoriesLoader } =
    useGetAllCategoryQuery();
  const { data: categoryCourse, isFetching: categoriesCourseLoader } =
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

  const handleCourseClick = (courseId, title) => {
    const courseTitle = title.toLowerCase().split(' ').join('-');
    navigate(`/course/${courseTitle}/${courseId}`);
  };
  

  return (
    <div className="py-8 mt-4 w-[90vw] lg:w-full mx-auto">
      <div className="mb-6 items-center">
        <h2 className="font-sans font-semibold text-2xl text-[var(--color-primary)]">
          All the skills you need in one place
        </h2>
        <p className="text-gray-600 font-sans">
          From critical skills to technical topics, Praxia Skill supports your
          professional development.
        </p>
      </div>

      {/* Tab Menu */}
      <div className="flex overflow-x-scroll scroll-smooth scrollbar-hide gap-8 md:gap-7 px-4 mb-1 whitespace-nowrap custom-scrollbar border-b border-neutral-300">
        {/* <div className="flex w-auto flex-nowrap gap-4 space-x-1 overflow-x-auto carousel  scroll-snap-x scroll-smooth"> */}
        {categories
          .map(
            (tab) =>
              tab.courses.length !== 0 && (
                <button
                  key={tab._id}
                  onClick={() => {
                    setActiveTab(tab._id);
                  }}
                  className={`flex justify-center items-center w-fit px-0 py-2 border-b-2 cursor-pointer ${activeTab === tab._id
                      ? " border-[var(--color-primary)] text-[var(--secondary-heading-color)]"
                      : " border-transparent text-[var(--alt-secondary-text-color)] carousel-item"
                    }`}
                >
                  {tab.name}
                </button>
              )
          )}
      </div>

      {/* Scrollable Course Cards */}
      {!(allCategoriesLoader || categoriesCourseLoader) ? (
        <div className="relative w-full">
          {/* Left Button */}
          <div className="md:flex items-center justify-end gap-4 hidden mt-2">
            {coursesAll?.length > 1 && (
              <button
                onClick={scrollLeft}
                className="h-8 w-8 flex justify-center items-center bg-primary hover:bg-primary-hover cursor-pointer text-white text-2xl rounded-full shadow-md"
              >
                <IoIosArrowBack />
              </button>
            )}

            {/* Right Button */}
            {coursesAll?.length > 1 && (
              <button
                onClick={scrollRight}
                className="h-8 w-8 flex justify-center items-center bg-primary hover:bg-primary-hover cursor-pointer text-white text-2xl rounded-full shadow-md"
              >
                <IoIosArrowForward />
              </button>
            )}
          </div>

          {/* Scrollable Container */}
          <div
            ref={sliderRef}
            className="flex overflow-x-scroll scroll-smooth scrollbar-hide gap-8 md:gap-7 p-4 whitespace-nowrap custom-scrollbar"
          >
            {coursesAll?.map((course, index) => (
              <button
                key={index}
                onClick={()=>handleCourseClick(course._id, course?.title)}
                className="bg-white flex flex-col h-70 gap-2 w-[300px] pb-3 rounded-lg shadow-md flex-none mx-auto md:mx-0 cursor-pointer"
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
                        {course?.language === "ENGLISH_HINDI"
                          ? "Bilingual"
                          : course?.language?.charAt(0).toUpperCase() +
                          course?.language?.slice(1).toLowerCase()}
                      </p>
                    </div>

                    <Button className="text-white whitespace-nowrap px-3 py-1 ml-auto rounded-md duration-200">
                      Learn More
                    </Button>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <CourseSkeleton />
      )}
      <div className="relative w-full">
        {coursesAll?.length !== 0 && (
          <Link
            to="/courses"
            className="absolute right-0 top-0 font-bold text-xs text-[var(--color-primary)] bg-white mx-auto cursor-pointer z-50"
          >
            View More
          </Link>
        )}
      </div>
    </div>
  );
}
