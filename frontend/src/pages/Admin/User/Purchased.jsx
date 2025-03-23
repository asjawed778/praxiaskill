import React, { useState, useEffect } from 'react';
// import webDevImage from '../images/course1.jpeg';

const webDevImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4bltNxyXCmTTjBUSrTkHyy5_10dIpwnkvDw&s"

const UserCoursesPage = () => {
  // Sample course data
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "The Complete C Programming Tutorial",
      instructor: "DoEdu IT Educations, High Quality Training",
      category: "Programming",
      progress: 100,
      image:webDevImage ,
      lastAccessed: new Date("2025-03-10"),
      students: 65000,
      isBestSeller: false
    },
    {
      id: 2,
      title: "Beginner Full Stack Web Development: HTML, CSS, React & Node",
      instructor: "Mark Price, Unity 3D Android iOS 10 Swift 3 & React Teacher",
      category: "Web Development",
      progress: 45,
      image: webDevImage,
      lastAccessed: new Date("2025-03-12"),
      students: 120000,
      isBestSeller: true
    },
    {
      id: 3,
      title: "Digital Marketing Masterclass:Get Your First 1000 Customers",
      instructor: "Evan Kimbrell, Founder of Sprintkick | Ex-VC | Ex-startup founder",
      category: "Marketing",
      progress: 30,
      image: "/images/digital-marketing.jpg",
      lastAccessed: new Date("2025-03-05"),
      students: 95000,
      isBestSeller: true
    },
    {
      id: 4,
      title: "E-commerce Profits: How to Start a Business Dropshipping",
      instructor: "Matt Bernstein, Best Selling Instructor, 175,000+ Students",
      category: "Business",
      progress: 10,
      image: webDevImage,
      lastAccessed: new Date("2025-03-01"),
      students: 175000,
      isBestSeller: true
    },
    {
      id: 5,
      title: "Social Media Marketing: Complete Certificate Course",
      instructor: "Jason Miles, Award Winning Instructor",
      category: "Marketing",
      progress: 80,
      image: webDevImage,
      lastAccessed: new Date("2025-02-28"),
      students: 85000,
      isBestSeller: true
    },
    {
      id: 6,
      title: "Email Marketing: Build a List of Subscribers",
      instructor: "Phil Ebiner, Top Instructor",
      category: "Marketing",
      progress: 60,
      image: webDevImage,
      lastAccessed: new Date("2025-02-25"),
      students: 60000,
      isBestSeller: false
    },
    {
      id: 7,
      title: "Ethical Hacking: Complete Course",
      instructor: "Zaid Sabih, Ethical Hacker & Pentester",
      category: "IT & Software",
      progress: 20,
      image: webDevImage,
      lastAccessed: new Date("2025-03-08"),
      students: 150000,
      isBestSeller: true
    },
    {
      id: 8,
      title: "Python for Data Science and Machine Learning",
      instructor: "Jose Portilla, Head of Data Science",
      category: "Data Science",
      progress: 50,
      image: webDevImage,
      lastAccessed: new Date("2025-03-07"),
      students: 200000,
      isBestSeller: true
    },
    {
      id: 9,
      title: "React Native - The Practical Guide",
      instructor: "Maximilian Schwarzmüller, Professional Developer",
      category: "Mobile Development",
      progress: 35,
      image: webDevImage,
      lastAccessed: new Date("2025-02-20"),
      students: 110000,
      isBestSeller: true
    }
  ]);

  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('Recently Accessed');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProgress, setSelectedProgress] = useState('');
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [coursesPerPage] = useState(8);

  const categories = [...new Set(courses.map(course => course.category))];
  const instructors = [...new Set(courses.map(course => course.instructor.split(',')[0]))];

  const progressOptions = [
    { label: 'All', value: '' },
    { label: 'Not Started (0%)', value: '0' },
    { label: 'In Progress (1-99%)', value: '1-99' },
    { label: 'Completed (100%)', value: '100' }
  ];

  useEffect(() => {
    let filteredCourses = [...courses];

    if (searchQuery) {
      filteredCourses = filteredCourses.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filteredCourses = filteredCourses.filter(course => course.category === selectedCategory);
    }

    if (selectedInstructor) {
      filteredCourses = filteredCourses.filter(course => 
        course.instructor.split(',')[0].includes(selectedInstructor)
      );
    }

    if (selectedProgress) {
      if (selectedProgress === '0') {
        filteredCourses = filteredCourses.filter(course => course.progress === 0);
      } else if (selectedProgress === '100') {
        filteredCourses = filteredCourses.filter(course => course.progress === 100);
      } else if (selectedProgress === '1-99') {
        filteredCourses = filteredCourses.filter(course => course.progress > 0 && course.progress < 100);
      }
    }

    // Sort courses
    if (sortBy === 'Recently Accessed') {
      filteredCourses.sort((a, b) => b.lastAccessed - a.lastAccessed);
    } else if (sortBy === 'Title (A-Z)') {
      filteredCourses.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'Title (Z-A)') {
      filteredCourses.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === 'Progress (High to Low)') {
      filteredCourses.sort((a, b) => b.progress - a.progress);
    } else if (sortBy === 'Progress (Low to High)') {
      filteredCourses.sort((a, b) => a.progress - b.progress);
    }

    setDisplayedCourses(filteredCourses);
    setCurrentPage(1); 
  }, [courses, searchQuery, selectedCategory, selectedProgress, selectedInstructor, sortBy]);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = displayedCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedProgress('');
    setSelectedInstructor('');
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>
      
      {/* Filter and Sort Section */}
      <div className="mb-6 flex  justify-evenlyflex-wrap items-center gap-4">
        <div className="flex  items-center">
          <span className="mr-2 "></span>
          <div className="relative">
            <select
              className="border-2 text-red-700 border-red-700 rounded p-2 pr-8 bg-white cursor-pointer appearance-none hover:border-red-700"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Recently Accessed text-red-700">Recently Accessed</option>
              <option value="Title (A-Z)">Title (A-Z)</option>
              <option value="Title (Z-A)">Title (Z-A)</option>
              <option value="Progress (High to Low)">Accessed (High to Low)</option>
              <option value="Progress (Low to High)">Accessed (Low to High)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
         {/*} <span className="mr-2">Filter by</span>*/}
          
          {/* Categories Dropdown */}
          <div className="relative">
            <select
              className="border-2 text-red-700 border-red-700 rounded p-2 pr-8 bg-white cursor-pointer appearance-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          
          {/* Progress Dropdown */}
          <div className="relative">
            <select
              className="border-2 text-red-700 border-red-700 rounded p-2 pr-8 bg-white cursor-pointer appearance-none"
              value={selectedProgress}
              onChange={(e) => setSelectedProgress(e.target.value)}
            >
              <option value="">Progress</option>
              {progressOptions.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          
          {/* Instructor Dropdown */}
          <div className="relative">
            <select
              className="border-2 text-red-700 border-red-700 rounded p-2 pr-8 bg-white cursor-pointer appearance-none"
              value={selectedInstructor}
              onChange={(e) => setSelectedInstructor(e.target.value)}
            >
              <option value="">Instructor</option>
              {instructors.map((instructor, index) => (
                <option key={index} value={instructor}>{instructor}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          
          {/* Reset Button */}
          <button 
            className="  text-gray-800 font-semibold py-2 px-4 rounded"
            onClick={resetFilters}
          >
            
          </button>
        </div>
        
        {/* Search Input */}
        <div className="relative flex items-stretch flex-grow">
          <input
            type="text"
            placeholder="Search my courses"
            className="border border-gray-300 rounded-l py-2 px-4 w-[]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-gray-100 border border-l-0 border-gray-400 rounded-r px-4 flex items-center">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentCourses.map(course => (
          <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <div className="h-40 bg-yellow-100 flex items-center justify-center">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              </div>
             {/* <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                </svg>
              </button>*/}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg line-clamp-2 mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{course.instructor}</p>
              <div className="mb-1">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div 
                    className="bg-red-500 h-1 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600">{course.progress}% Complete</span>
              </div>
              <button className="w-full mt-4 bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300">
                START COURSE
              </button>
              {course.progress > 0 && course.progress < 100 && (
                <div className="mt-3 text-center">
                  <a href="#" className="text-sm text-red-400 hover:text-blue-700">Continue where you left off</a>
                </div>
              )}
              {course.progress === 0 && (
                <div className="mt-2 text-center">
                  <a href="#" className="text-sm text-blue-500 hover:text-blue-700">Leave a rating</a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {displayedCourses.length > coursesPerPage && (
        <div className="mt-8 flex justify-center">
          <nav>
            <ul className="flex space-x-2">
              <li>
                <button
                  onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                  className={`px-3 py-1 rounded border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-red-500 hover:bg-blue-50'}`}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
              </li>
              {[...Array(Math.ceil(displayedCourses.length / coursesPerPage)).keys()].map(number => (
                <li key={number}>
                  <button
                    onClick={() => paginate(number + 1)}
                    className={`px-3 py-1 rounded border ${currentPage === number + 1 ? 'bg-red-500 text-white' : 'bg-white text-red-500 hover:bg-blue-50'}`}
                  >
                    {number + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => paginate(currentPage < Math.ceil(displayedCourses.length / coursesPerPage) ? currentPage + 1 : Math.ceil(displayedCourses.length / coursesPerPage))}
                  className={`px-3 py-1 rounded border ${currentPage === Math.ceil(displayedCourses.length / coursesPerPage) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-red-500 hover:bg-blue-50'}`}
                  disabled={currentPage === Math.ceil(displayedCourses.length / coursesPerPage)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default UserCoursesPage;