import { useNavigate } from "react-router-dom";
import { useGetAllCategoryQuery, useGetAllPublishedCourseQuery, useGetCategoryCourseQuery } from "../../services/course.api";
import { useState } from "react";
import { Search } from "lucide-react";
import ButtonLoading from "../../components/Button/ButtonLoading";

const CourseCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState("");

  // Queries
  const { data: publishedCourses, isLoading, isError } = useGetAllPublishedCourseQuery({ currentPage, searchTerm });
  const { data: categoriesData, isLoading: categoryLoading } = useGetAllCategoryQuery();
  const { data: CategoryCourses, isLoading: categoryCoursesLoading } = useGetCategoryCourseQuery(categoryId, { skip: !categoryId });

  const categories = categoriesData?.data || [];
  const coursesData = categoryId ? CategoryCourses?.data  : publishedCourses?.data;
  console.log("Courses Data: ",coursesData);
  
  const courses = coursesData?.courses || [];
  const totalPages = coursesData?.totalPages || 1;
  const totalItems = coursesData?.totalItems || coursesData?.totalCourses;
  const itemsPerPage = 10;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);
  // console.log("total Item: ", totalItems);
  
  const navigate = useNavigate();
  const handleClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };
  const handleSearchClick = () => {
    setSearchTerm(searchQuery.trim());
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(searchQuery.trim());
    }
  };
  const handleClearFilter = () => {
    setCategoryId("");
    setSearchQuery("");
    setSearchTerm(""); 
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Explore Our Courses</h2>

      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row justify-center items-center mb-6 space-y-4 md:space-y-0 md:space-x-4 w-full px-4">
        {/* Dynamic Category Filter */}
        <div className="flex flex-col md:flex-row items-center w-full gap-2 md:w-full">
          <p className="text-center text-xl p-2">Search by Category:</p>

          <div className="flex w-full md:w-auto items-center border border-red-500 rounded-lg overflow-hidden">
            <select
              onChange={(e) => setCategoryId(e.target.value)}
              value={categoryId}
              className="p-2 w-full md:w-[200px] cursor-pointer focus:outline-none h-12"
            >
              <option value="">All Categories</option>
              {categoryLoading ? (
                <option disabled>Loading...</option>
              ) : (
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
            <button
              onClick={handleClearFilter}
              className="border-l border-red-500 px-4 cursor-pointer hover:bg-red-500 transition h-12 text-center"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex w-full md:w-full border border-red-500 rounded-lg overflow-hidden h-12">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 focus:outline-none"
            onKeyDown={handleKeyDown}
          />
          <button
            className="bg-red-500 px-4 text-white flex items-center justify-center hover:bg-red-600 cursor-pointer h-full"
            onClick={handleSearchClick}
          >
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* Loading/Error Messages */}
      {isLoading || categoryCoursesLoading ? (
        <p className="text-center text-2xl text-red-500">
          <ButtonLoading /> Loading courses...
        </p>
      ) : isError ? (
        <p className="text-center text-2xl text-red-500">Error loading courses.</p>
      ) : courses.length === 0 ? (
        <p className="text-center text-xl text-gray-500">No courses found.</p>
      ) : (
        // Courses Grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map((course, index) => (
            <div
              key={index}
              onClick={() => handleClick(course._id)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 hover:shadow-gray-400 cursor-pointer 
              transition-transform duration-500 ease-in-out"
            >
              <img className="w-full h-52 object-cover" src={course.thumbnail} alt={course.title} />
              <div className="p-4">
                <h3 className="text-xl mb-4 font-semibold">{course.title}</h3>
                <p className="text-gray-600">{course.instructor}</p>
                <p className="text-sm text-gray-500">{course.type || "Professional Certificate"} • {course.level || "Beginner to Advanced"}</p>
                <p className="text-sm mt-2"><strong>Skills you'll gain:</strong> {course.tags?.join(", ")}</p>
                <p className="mt-8 font-semibold">{course.rating || "4.1"} ⭐ ({course.reviews})</p>
                <p className="text-sm mt-2">{course.level || "Beginner to Advance"}{" . "}{course.type || "Professional Certificate"}{" . "}{course.duration}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {courses.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 px-4 w-full text-center gap-4">
          {/* Showing X to Y of Total Items */}
          <p className="text-md w-full md:w-auto">
            Showing {startItem} to {endItem} of {totalItems} courses
          </p>

          {/* Pagination Controls */}
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
export default CourseCard;
