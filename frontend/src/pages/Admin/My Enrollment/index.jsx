import { useNavigate } from "react-router-dom";
import {
  // useGetAllPublishedCourseQuery,
  useGetMyCoursesQuery,
} from "../../../services/course.api";
import { useEffect, useState } from "react";
import ButtonLoading from "../../../components/Button/ButtonLoading";
import Filters from "./components/Filters";
import { useForm } from "react-hook-form";

const index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [courses, setCourses] = useState([]);
  const { register, setValue, watch } = useForm();
  const category = watch("category", "");

  const { data: myCourses, isFetching: myCoursesFetching } =
    useGetMyCoursesQuery(currentPage);
  const totalPages = myCourses?.data?.totalPages || 1;
  const totalItems = myCourses?.data?.totalCourses;
  const itemsPerPage = 10;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = category
    ? courses?.length
    : Math.min(startItem + itemsPerPage - 1, totalItems);
  const navigate = useNavigate();
  const handleClick = (courseId) => {
    navigate(`/course-lecture/${courseId}`);
  };

  useEffect(() => {
    if (myCourses && !category) {
      setCourses(myCourses?.data?.courses);
    } else {
      const categoryWiseCourses = myCourses?.data?.courses.filter(
        (course) => course.category._id === category
      );
      setCourses(categoryWiseCourses);
    }
  }, [myCourses, category]);

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-xl font-bold mb-6">My Courses</h2>

      <Filters register={register} setValue={setValue} />

      {myCoursesFetching ? (
        <div className=" flex h-28 justify-center items-center text-center mt-6 text-red-500">
          <div className="flex gap-2 items-center">
            <ButtonLoading />
            <span>Loading courses...</span>
          </div>
        </div>
      ) : courses?.length === 0 ? (
        <p className="flex items-center justify-center h-28 text-gray-500">
          No courses found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {courses?.map((course, index) => (
            <div
              key={index}
              onClick={() => handleClick(course._id)}
              className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-gray-400 cursor-pointer 
              transition-transform duration-500 ease-in-out"
            >
              <img
                className="w-full h-52 object-fit"
                src={course.thumbnail}
                alt={course.title}
              />
              <div className="relative p-4 flex-grow flex flex-col">
                <h3 className="text-xl mb-4 font-semibold flex-grow">
                  {course.title}
                </h3>
                <p className="text-7ray-600">{course?.instructor?.name}</p>
                <p className="text-sm text-gray-700">{course.subtitle}</p>
                <div className="flex items-center justify-between gap-2 mt-3 pb-3">
                  <p className="flex items-center flex-col">
                    <span className="lowercase text-xs">{course.duration}</span>
                    <span className="font-semibold">Duration</span>
                  </p>
                  <p className="flex flex-col items-center">
                    <span className="lowercase text-xs">
                      {course.validTill === "LifeTime"
                        ? "Life time"
                        : course.validTill}
                    </span>
                    <span className="font-semibold">Validity</span>
                  </p>
                  <p className="flex flex-col items-center">
                    <span className="lowercase text-xs">
                      {course.courseMode}
                    </span>
                    <span className="font-semibold">Mode</span>
                  </p>
                </div>
                <p
                  className={`absolute right-2 bottom-1 flex justify-end text-[9px] font-semibold ${
                    course.courseStatus === "ACTIVE"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {course.courseStatus}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {courses?.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 px-4 w-full text-center gap-4">
          <p className="text-md w-full md:w-auto">
            Showing {startItem} to {endItem} of {totalItems} courses
          </p>

          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={`px-3 py-1 border rounded-md shadow ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:bg-gray-50 active:scale-90"
              }`}
            >
              ←
            </button>
            <span className="px-4 py-1 border rounded-md bg-gray-50 shadow">
              {currentPage}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className={`px-3 py-1 border rounded ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:bg-gray-50 active:scale-90"
              }`}
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default index;
