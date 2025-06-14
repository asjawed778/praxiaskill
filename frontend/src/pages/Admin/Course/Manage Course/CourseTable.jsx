import React, { useState, useRef, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { createPortal } from "react-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import ButtonLoading from "../../../../components/Button/ButtonLoading";
import { useForm } from "react-hook-form";
import TableActionButtons from "./TableActionButtons";
import TableFilters from "./TableFilters";

const CourseTable = ({
  data: publishedCourse,
  currentPage,
  setCurrentPage,
  isLoading,
  courseManagePageRef,
}) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [courses, setCourses] = useState([]);
  const [menuStyles, setMenuStyles] = useState({});
  const buttonRefs = useRef([]);

  const { register, watch, setValue } = useForm();
  const category = watch("category", "");

  const itemsPerPage = 10;
  const totalItems = courses?.length;

  useEffect(() => {
    if (publishedCourse && !category) {
      setCourses(publishedCourse?.data?.courses);
    } else {
      const categoryWiseCourses = publishedCourse?.data?.courses.filter(
        (course) => course.category._id === category
      );
      setCourses(categoryWiseCourses);
    }
  }, [publishedCourse, category]);

  useEffect(() => {
    if (openMenu !== null) {
      const button = buttonRefs.current[openMenu];

      if (button) {
        const rect = button.getBoundingClientRect();
        const dropdownHeight = 100; // Approximate dropdown height
        const spaceBelow = window.innerHeight - rect.bottom;

        setMenuStyles({
          position: "absolute",
          display: "block",
          top:
            spaceBelow < dropdownHeight + 100
              ? rect.bottom - dropdownHeight - 100
              : rect.top + dropdownHeight - 65,
          left: rect.left - 120, // Adjust for proper alignment
          zIndex: 1000,
        });
      }
    }
  }, [openMenu]);

  return (
    <div className="w-full flex flex-col gap-2 relative">
      <TableFilters register={register} setValue={setValue} />

      {!isLoading ? (
        courses?.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm relative">
            <table className="min-w-full bg-white overflow-hidden">
              <thead className="bg-gray-50 text-sm font-semibold text-left border-b border-neutral-300 text-neutral-500">
                <tr>
                  <th className="px-4 py-2">Serial No</th>
                  <th className="px-4 py-2">Course Title</th>
                  <th className="px-4 py-2">Instructor Name</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses?.map((course, index) => (
                  <tr
                    key={course._id}
                    className="hover:bg-gray-50 text-sm border-b border-neutral-300 relative"
                  >
                    <td className="px-4 py-1">
                      {currentPage * 10 + 1 + index}
                    </td>
                    <td className="px-4 py-1">{course?.title}</td>
                    <td className="px-4 py-1">{course?.instructor?.name}</td>
                    <td className="px-4 py-1">{course?.category?.name}</td>
                    <td className="px-4 py-1 relative">
                      <button
                        ref={(el) => (buttonRefs.current[index] = el)}
                        className={`p-1 text-lg text-gray-600 hover:bg-neutral-200 rounded-full ${
                          openMenu === index &&
                          "bg-primary text-white hover:bg-primary-hover"
                        }`}
                        onClick={() =>
                          setOpenMenu(openMenu === index ? null : index)
                        }
                      >
                        <BsThreeDots />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          courses?.length === 0 && (
            <div className="h-30 text-neutral-500 flex justify-center items-center">
              No courses found.
            </div>
          )
        )
      ) : (
        <div className="h-30 flex justify-center items-center gap-3">
          {" "}
          <ButtonLoading /> Loading...
        </div>
      )}

      {courses?.length > 0 && (
        <div>
          <div className="text-sm">
            <p>
              <span>Showing </span>
              <span className="font-semibold">{currentPage * 10 + 1} </span>
              <span> to </span>
              <span className="font-semibold">
                {Math.min((currentPage + 1) * itemsPerPage, totalItems)}{" "}
              </span>
              <span>of </span>
              <span className="font-semibold">{totalItems}</span>
            </p>
          </div>

          <div className={`flex justify-end mb-10`}>
            <div className="w-fit flex items-center gap-5">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                disabled={currentPage === 0}
                type="button"
                className={`p-2 bg-neutral-100 hover:bg-neutral-200 rounded-full text-xl ${
                  currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FaArrowLeft />
              </button>
              <span className="px-4 py-1 rounded-lg border border-neutral-300">
                {currentPage}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage >= Math.ceil(courses?.length / itemsPerPage) - 1
                }
                type="button"
                className={`p-2 bg-neutral-100 hover:bg-neutral-200 rounded-full text-xl ${
                  currentPage >= Math.ceil(courses?.length / itemsPerPage) - 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}

      {openMenu !== null &&
        createPortal(
          <TableActionButtons menuStyles={menuStyles} setMenuStyles={setMenuStyles} setOpenMenu={setOpenMenu} courses={courses} openMenu={openMenu} />,
          courseManagePageRef?.current // Render outside the table
        )}
    </div>
  );
};

export default CourseTable;
