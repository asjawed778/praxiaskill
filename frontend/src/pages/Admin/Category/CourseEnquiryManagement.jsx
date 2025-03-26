import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { LuCheckCheck } from "react-icons/lu";
import { createPortal } from "react-dom";
import {
  useGetAllEnquiryQuery,
  useSetEnquiryStatusMutation,
} from "../../../services/course.api";
import { FaCheckSquare } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { toast } from "react-hot-toast";

const CourseEnqueryManagement = () => {
  const [
    setEnquiryStatus,
    { isError: enquiryStatusError, isFetching: enquiryStatusFetching },
  ] = useSetEnquiryStatusMutation();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data,
    isFetching: enquiriesFetching,
    refetch: refetchEnquiries,
  } = useGetAllEnquiryQuery(currentPage);
  const [enquiries, setEnquiries] = useState([]);

  const buttonRefs = useRef([]);
  const pageRef = useRef(null)

  const [openMenu, setOpenMenu] = useState(null);
  const [menuStyles, setMenuStyles] = useState({});

  const [statusFilter, setStatusFilter] = useState("");
  const [timeSort, setTimeSort] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const itemsPerPage = 10;
  const totalItems = data?.data?.totalResults;

  useEffect(() => {
    if (data?.success) {
      const enquiries = data?.data.enquiries.map((enquiry) => {
        return {
          id: enquiry._id,
          studentName: enquiry.name,
          contactNo: enquiry.phone,
          status: enquiry.status,
          createdAt: new Date(enquiry.createdAt),
          details: {
            email: enquiry.email,
            course: enquiry.interestedCourse,
            message:
              "I would like to know more about the course curriculum and schedule.",
          },
        };
      });
      setEnquiries(enquiries);
    }
  }, [data, enquiriesFetching, currentPage]);

  // Filter and sorting states

  const getFilteredAndSortedEnquiries = () => {
    let result = [...enquiries];

    if (statusFilter) {
      result = result.filter((enquiry) => enquiry.status === statusFilter);
    }

    if (timeSort === "newest") {
      result.sort((a, b) => b.createdAt - a.createdAt);
    } else if (timeSort === "oldest") {
      result.sort((a, b) => a.createdAt - b.createdAt);
    }

    return result;
  };

  const filteredEnquiries = getFilteredAndSortedEnquiries();

  function handleViewDetails(enquiry) {
    setSelectedEnquiry(enquiry);
    setShowDetails(true);
  }

  function handleStatusDropdown() {
    setShowStatusDropdown(!showStatusDropdown);
    setShowTimeDropdown(false);
  }

  function handleTimeDropdown() {
    setShowTimeDropdown(!showTimeDropdown);
    setShowStatusDropdown(false);
  }

  function handleStatusSelect(status) {
    setStatusFilter(status);
    setShowStatusDropdown(false);
  }

  function handleTimeSelect(sort) {
    setTimeSort(sort);
    setShowTimeDropdown(false);
  }

  function handleClearFilters() {
    setStatusFilter("");
    setTimeSort("");
  }

  function changeStatus(enquiryId, newStatus) {
    setEnquiries(
      enquiries.map((enquiry) =>
        enquiry.id === enquiryId
          ? {
              ...enquiry,
              status: newStatus
            }
          : enquiry
      )
    );
  }

  function goToNextPage() {
    setEnquiries([]);
    setCurrentPage(currentPage + 1);
  }

  function goToPrevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function closeDetails() {
    setShowDetails(false);
    setSelectedEnquiry(null);
  }

  const handleChangeStatus = async (enquiryId, newStatus) => {
    try {
      const data = { status: newStatus };
      const result = await setEnquiryStatus({ data, enquiryId });
      if (result?.error) {
        throw new Error(result?.error?.data?.message);
      }
      changeStatus(enquiryId, newStatus);
      setOpenMenu(null)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (openMenu !== null) {
      const button = buttonRefs.current[openMenu];
      console.log("rect");

      if (button) {
        const rect = button.getBoundingClientRect();
        const dropdownHeight = 100;
        const spaceBelow = window.innerHeight - rect.bottom;

        setMenuStyles({
          position: "absolute",
          top:
            spaceBelow < dropdownHeight + 100
              ? rect.bottom - dropdownHeight + 20
              : rect.top + dropdownHeight - 60,
          left: rect.left,
          zIndex: 1000,
        });
      }
    }
  }, [openMenu]);

  return (
    <div ref={pageRef}>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4 items-center">
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 text-white bg-primary hover:bg-primary-hover rounded-md"
            >
              Clear
            </button>

            <span className="text-gray-700">Sort by</span>

            {/* Status Dropdown */}
            <div className="relative">
              <button
                onClick={handleStatusDropdown}
                className="px-4 py-2 border border-gray-300 rounded-md flex items-center justify-between min-w-40"
              >
                {statusFilter || "Status"} <ChevronDown size={20} />
              </button>
              {showStatusDropdown && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  <div
                    className="px-4 py-2 hover:bg-red-600  hover:text-white cursor-pointer"
                    onClick={() => handleStatusSelect("PENDING")}
                  >
                    PENDING
                  </div>
                  <div
                    className="px-4 py-2  hover:bg-green-800 hover:text-white cursor-pointer"
                    onClick={() => handleStatusSelect("CLOSED")}
                  >
                    CLOSED
                  </div>
                </div>
              )}
            </div>

            {/* Time Dropdown */}
            <div className="relative">
              <button
                onClick={handleTimeDropdown}
                className="px-4 py-2 border border-gray-300 rounded-md flex items-center justify-between min-w-40"
              >
                {timeSort === "newest"
                  ? "newest first"
                  : timeSort === "oldest"
                  ? "oldest first"
                  : "Time"}{" "}
                <ChevronDown size={20} />
              </button>
              {showTimeDropdown && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  <div
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleTimeSelect("newest")}
                  >
                    newest first
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleTimeSelect("oldest")}
                  >
                    oldest first
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enquiries Table */}
        {!enquiriesFetching ? (
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <table className="w-full ">
              <thead>
                <tr className="bg-gray-50 text-sm text-neutral-500 font-semibold">
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    Serial No
                  </th>
                  <th className="py-2 px-4  border-b border-gray-300 text-left">
                    Student Name
                  </th>
                  <th className="py-2 px-4  border-b border-gray-300 text-left">
                    Contact No
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-center">
                    Action
                  </th>
                  <th className="py-2 px-4 border-gray-300 text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEnquiries.map((enquiry, index) => (
                  <tr
                    key={enquiry.id}
                    className="border-b text-sm border-gray-300"
                  >
                    <td className="py-1 px-4">
                      {(currentPage - 1) * 10 + 1 + index}
                    </td>
                    <td className="py-1 px-4">{enquiry.studentName}</td>
                    <td className="py-1 px-4">{enquiry.contactNo}</td>
                    <td className="py-1 px-4 text-center">
                      <button
                        onClick={() => handleViewDetails(enquiry)}
                        className="px-4 py-1 cursor-pointer text-white border border-gray-300 rounded-md bg-indigo-500 hover:bg-indigo-600"
                      >
                        View Details
                      </button>
                    </td>
                    <td className="py-1 px-4 text-center">
                      <div className="relative inline-block w-40">
                        <button
                          ref={(el) => (buttonRefs.current[index] = el)}
                          onClick={() => {
                            setOpenMenu(openMenu === index ? null : index);
                          }}
                          className={`w-full px-4 py-1.5 border border-gray-300 rounded-md flex items-center justify-between cursor-pointer ${
                            enquiry.status === "PENDING"
                              ? "text-primary"
                              : "text-green-500"
                          } ${index === openMenu? "bg-primary text-white" : ""}`}
                        >
                          {enquiry.status} <ChevronDown size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="h-30 flex justify-center items-center">
            Loading...
          </div>
        )}

        {/* Pagination */}
        {data ? (
          <div className="mt-4 flex justify-between items-center">
            <div>
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
            </div>
            <div className="flex gap-2">
              <button
                onClick={goToPrevPage}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:cursor-not-allowed"
                disabled={currentPage === 1}
              >
                ←
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md bg-gray-100">
                {currentPage}
              </button>
              <button
                onClick={goToNextPage}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:cursor-not-allowed"
                disabled={currentPage * itemsPerPage >= totalItems}
              >
                →
              </button>
            </div>
          </div>
        ) : null}

        {/* Details  */}
        {showDetails && selectedEnquiry && (
          <div className="fixed inset-0 bg-slate-200 bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">Enquiry Details</h3>
              <div className="space-y-3">
                <p>
                  <span className="font-medium">Student:</span>{" "}
                  {selectedEnquiry.studentName}
                </p>
                <p>
                  <span className="font-medium">Contact:</span>{" "}
                  {selectedEnquiry.contactNo}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {selectedEnquiry.details.email}
                </p>
                <p>
                  <span className="font-medium">Course:</span>{" "}
                  {selectedEnquiry.details.course}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  {selectedEnquiry.status}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {selectedEnquiry.createdAt.toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Message:</span>
                </p>
                <p className="border border-gray-200 p-2 rounded bg-gray-50">
                  {selectedEnquiry.details.message}
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeDetails}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {openMenu !== null &&
        createPortal(
          <div
            style={menuStyles}
            className="absolute bg-white border border-gray-300 shadow-lg rounded-lg w-40"
          >
            {enquiries[openMenu].status === "CLOSED" ?<div
              className={`px-4 py-2 flex items-center gap-2 hover:bg-gray-100 rounded-lg text-red-600 cursor-pointer`}
              onClick={() => {
                handleChangeStatus(enquiries[openMenu].id, "PENDING");
              }}
            >
              <MdPendingActions />
              PENDING
            </div>:
            <div
              className={`px-4 py-2 flex items-center gap-2 hover:bg-gray-100 rounded-lg text-green-600 cursor-pointer`}
              onClick={() => {
                handleChangeStatus(enquiries[openMenu].id, "CLOSED");
              }}
            >
              <FaCheckSquare />
              CLOSED
            </div>}
          </div>,
          pageRef.current
        )}
    </ div>
  );
};

export default CourseEnqueryManagement;