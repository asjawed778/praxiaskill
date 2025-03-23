import React, { useState, useEffect } from 'react';

const UserCoursesPage = () => {
  const [hasCourses, setHasCourses] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [courses, setCourses] = useState([]);

  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('Recently Accessed');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProgress, setSelectedProgress] = useState('');
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [coursesPerPage] = useState(8);

  // Simulate API fetch
  useEffect(() => {
    // Simulate loading time
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // For demo, we're simulating an empty response
        const response = [];
        
        setCourses(response);
        setHasCourses(response.length > 0);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Update displayed courses when filters change
  useEffect(() => {
    if (courses.length > 0) {
      let filteredCourses = [...courses];
      
      // Apply filters...
      // (filtering code would be here - same as in previous component)
      
      setDisplayedCourses(filteredCourses);
    } else {
      setDisplayedCourses([]);
    }
  }, [courses, searchQuery, selectedCategory, selectedProgress, selectedInstructor, sortBy]);

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-8 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your courses...</p>
        </div>
      </div>
    );
  }

  // Empty state - when user has no purchased courses
  if (!hasCourses) {
    return (
      <div className="container mx-auto p-8 flex justify-center items-center min-h-screen">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <svg className="w-24 h-24 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">You haven't purchased any courses yet</h2>
          <p className="text-gray-600 mb-8">
            Explore our Courses and find the perfect courses to enhance your skills and achieve your learning goals.
          </p>
          <button 
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 shadow-md flex items-center justify-center mx-auto"
            onClick={() => window.location.href = '/'}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  // Regular view with courses would be here
 return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>
      
      {/* Filter and Sort UI would be here */}
      
      {/* Empty state when search returns no results */}
      {displayedCourses.length === 0 && (
        <div className="text-center py-16">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">No courses found</h3>
          <p className="text-gray-600 mb-4">
            We couldn't find any courses matching your current filters.
          </p>
          <button 
            className="text-blue-500 hover:text-blue-700 font-medium"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('');
              setSelectedProgress('');
              setSelectedInstructor('');
            }}
          >
            Clear all filters
          </button>
        </div>
      )}
      
      {/* Courses Grid would be here */}
      
      {/* Pagination would be here */}
    </div>
  );
};

export default UserCoursesPage;