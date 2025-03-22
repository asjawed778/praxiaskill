import { useNavigate } from "react-router-dom";
import { useGetAllPublishedCourseQuery } from "../../services/course.api";
import { useState } from "react";

const CourseCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: publishedCourses, isLoading } = useGetAllPublishedCourseQuery(currentPage);
  console.log("data", publishedCourses)
  const courses = publishedCourses?.data?.courses
    const navigate = useNavigate()
    const handleClick = (courseId) => {
        navigate(`/course/${courseId}`)        
    }
    return (
        <div className="container mx-auto px-12 py-10 ">
          <h2 className="text-3xl font-bold mb-6 text-center">Explore Our Courses</h2>
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses?.map((course, index) => (
              <div 
              key={index} 
              onClick={() => handleClick(course._id)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 hover:shadow-gray-400 cursor-pointer 
              transition-transform duration-500 ease-in-out">
                <img className="w-full h-52 object-cover" src={course.thumbnail} alt={course.title} />
                <div className="p-4">
                  <h3 className="text-xl mb-4 font-semibold ">{course.title}</h3>
                  <p className="text-gray-600">{course.instructor}</p>
                  <p className="text-sm text-gray-500">{course.type || "Professional Certificate"} • {course.level || "Beginner to Advanced"}</p>
                  <p className="text-sm mt-2"><strong>Skills you'll gain:</strong> {course.tags?.join(", ")}</p>
                  <p className="mt-8 font-semibold">{course.rating || "4.1"} ⭐ ({course.reviews})</p>
                  <p className="text-sm mt-2"> {course.level || "Beginner to Advance"}{" . "}{course.type || "Professional Certificate"}{" . "}{course.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}
export default CourseCard;