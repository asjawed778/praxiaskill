import React, { useRef, useState } from "react";
import CourseTable from "./Manage Course/CourseTable";
import { useGetAllPublishedCourseQuery } from "../../../services/course.api";


const ManageCourse = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { data: publishedCourses, isFetching: isLoading } = useGetAllPublishedCourseQuery(currentPage + 1);
  const courseManagePageRef = useRef(null);

  const [filter, setFilter] = useState(2)
  return (
    <div ref={courseManagePageRef} className="w-full px-4">
      <div className="w-[95%] border border-neutral-300 rounded-lg text-sm md:text-md flex justify-between items-center mx-auto mb-2">
        <div
          onClick={() => setFilter(1)}
          className={`${
            filter == 1 &&
            "bg-[var(--color-primary)] text-white rounded-lg"
          } px-4 py-2 cursor-pointer`}
        >
          All Courses
        </div>
        <div
          onClick={() => setFilter(2)}
          className={`${
            filter == 2 &&
            "bg-[var(--color-primary)] text-white rounded-lg"
          } px-4 py-2 cursor-pointer`}
        >
          Published course
        </div>
        <div
        onClick={() => setFilter(3)}
          className={`${
            filter == 3 &&
            "bg-[var(--color-primary)] text-white rounded-lg"
          } px-4 py-2 cursor-pointer`}
        >
          Draft Course
        </div>
        <div
        onClick={() => setFilter(4)}
          className={`${
            filter == 4 &&
            "bg-[var(--color-primary)] text-white rounded-lg"
          } px-4 py-2 cursor-pointer`}
        >
          Terminated Course
        </div>
      </div>
      <div className="w-[95%] mx-auto">
        <CourseTable data={publishedCourses} currentPage={currentPage} setCurrentPage={setCurrentPage} isLoading={isLoading} courseManagePageRef={courseManagePageRef} />
      </div>
    </div>
  );
};

export default ManageCourse;
