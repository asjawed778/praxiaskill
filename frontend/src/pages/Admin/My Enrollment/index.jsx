// import React from 'react'

// const index = () => {
//   return (
//     <div>
//       Hello
//     </div>
//   )
// }

// export default index
import { useNavigate } from "react-router-dom";
import { useGetAllCategoryQuery, useGetAllPublishedCourseQuery, useGetCategoryCourseQuery } from "../../../services/course.api";
import { useEffect, useState } from "react";
import ButtonLoading from "../../../components/Button/ButtonLoading";
import Filters from "./components/Filters";
import { useForm } from "react-hook-form";


const index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [courses, setCourses] = useState([]);
  const {register, setValue, watch} = useForm()
  const category = watch("category", "");

  // Queries
  const { data: publishedCourses, isFetching: isLoading, isError } = useGetAllPublishedCourseQuery(currentPage);
  console.log("data", publishedCourses)
  
//   const courses = publishedCourses?.data?.courses || [];

  const totalPages = publishedCourses?.data?.totalPages || 1;
  const totalItems = publishedCourses?.data?.totalCourses;
  const itemsPerPage = 10;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = category? courses?.length : Math.min(startItem + itemsPerPage - 1, totalItems);
  
  const navigate = useNavigate();
  const handleClick = (courseId) => {
    navigate(`/course-lecture/${courseId}`);
  };


  useEffect(() => {
    if (publishedCourses && !category) {
      setCourses(publishedCourses?.data?.courses);
    } else {
      const categoryWiseCourses = publishedCourses?.data?.courses.filter(
        (course) => course.category._id === category
      );
      setCourses(categoryWiseCourses);
    }
  }, [publishedCourses, category]);


  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-xl font-bold mb-6">My Enrollments</h2>

      <Filters register={register} setValue={setValue} />

      {isLoading ? (
        <p className=" flex h-28 justify-center items-center text-center mt-6 text-red-500">
          <ButtonLoading /> Loading courses...
        </p>
      ) : courses?.length === 0 ? (
        <p className="flex items-center justify-center h-28 text-gray-500">No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {courses?.map((course, index) => (
            <div
              key={index}
              onClick={() => handleClick(course._id)}
              className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-gray-400 cursor-pointer 
              transition-transform duration-500 ease-in-out"
            >
              <img className="w-full h-44 object-fit" src={course.thumbnail} alt={course.title} />
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-xl mb-4 font-semibold flex-grow">{course.title}</h3>
                <p className="text-gray-600">{course?.instructor?.name}</p>
                <p className="text-sm text-gray-500">{course.type || "Professional Certificate"} • {course.level || "Beginner to Advanced"}</p>
                {/* <p className="text-sm mt-2"><strong>Skills you'll gain:</strong> {course.tags?.join(", ")}</p>
                <p className="mt-8 font-semibold">{course?.totalRatings} ⭐ ({course.reviews || "0"})</p>
                <p className="text-sm mt-2">{course.level || "Beginner to Advance"}{" . "}{course.type || "Professional Certificate"}{" . "}{course.duration}</p> */}
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
              className={`px-3 py-1 border rounded-md shadow ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-gray-50 active:scale-90"}`}
            >
              ←
            </button>
            <span className="px-4 py-1 border rounded-md bg-gray-50 shadow">
              {currentPage}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className={`px-3 py-1 border rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-gray-50 active:scale-90"}`}
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