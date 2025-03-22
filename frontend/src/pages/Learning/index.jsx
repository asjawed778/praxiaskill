import { useNavigate } from "react-router-dom";
import { courses } from "./data";

const CourseCard = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/course/345lkj345lj4lk5")        
    }
    return (
        <div className="container mx-auto px-12 py-10 ">
          <h2 className="text-3xl font-bold mb-6 text-center">Explore Our Courses</h2>
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div 
              key={index} 
              onClick={handleClick}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 hover:shadow-gray-400 cursor-pointer 
              transition-transform duration-500 ease-in-out">
                <img className="w-full h-52 object-cover" src={course.image} alt={course.course_name} />
                <div className="p-4">
                  <h3 className="text-xl mb-4 font-semibold ">{course.course_name}</h3>
                  <p className="text-gray-600">{course.provider}</p>
                  <p className="text-sm text-gray-500">{course.type} • {course.level}</p>
                  <p className="text-sm mt-2"><strong>Skills you'll gain:</strong> {course.skills_gained.join(", ")}</p>
                  <p className="mt-8 font-semibold">{course.rating} ⭐ ({course.total_reviews})</p>
                  <p className="text-sm mt-2"> {course.level}{" . "}{course.type}{" . "}{course.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}
export default CourseCard;