import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { LuCheckCheck } from "react-icons/lu";

const CourseEnqueryManagement = () => {
  const [enquiries, setEnquiries] = useState([
    {
      id: 1,
      studentName: "Amit Ranjan",
      contactNo: "8756879078",
      status: "Pending",
      createdAt: new Date("2025-02-28T09:30:00"),
      details: {
        email: "amit.ranjan@example.com",
        course: "Web Development",
        message:
          "I would like to know more about the course curriculum and schedule.",
      },
    },
    {
      id: 2,
      studentName: "Priya Sharma",
      contactNo: "9876543210",
      status: "Pending",
      createdAt: new Date("2025-03-01T14:45:00"),
      details: {
        email: "priya.sharma@example.com",
        course: "Data Science",
        message:
          "Interested in the Data Science bootcamp. Please share the details.",
      },
    },
    {
      id: 3,
      studentName: "Rahul Kumar",
      contactNo: "7865432109",
      status: "Pending",
      createdAt: new Date("2025-03-02T11:20:00"),
      details: {
        email: "rahul.kumar@example.com",
        course: "Mobile App Development",
        message: "I have questions about the prerequisites for this course.",
      },
    },
    {
      id: 4,
      studentName: "Abinav wagh",
      contactNo: "7865409921",
      status: "Pending",
      createdAt: new Date("2025-03-02T11:20:00"),
      details: {
        email: "abi.wag@example.com",
        course: "Mobile App Development",
        message: "I have questions about how to Practice for this course.",
      },
    },
    {
      id: 5,
      studentName: "Awanti Singh",
      contactNo: "9043267532",
      status: "Completed",
      createdAt: new Date("2025-03-02T11:20:00"),
      details: {
        email: "awanti12@example.com",
        course: "Mobile App Development",
        message: "I have questions about the prerequisites for this course.",
      },
    },
    {
      id: 6,
      studentName: "Sanoj  Jaiswal",
      contactNo: "9346893410",
      status: "Completed",
      createdAt: new Date("2025-03-02T11:20:00"),
      details: {
        email: "sanojjs1@example.com",
        course: "Mobile App Development",
        message: "I have questions about the prerequisites for this course.",
      },
    },
    {
      id: 7,
      studentName: "Ajay Prakash",
      contactNo: "8888341144",
      status: "Completed",
      createdAt: new Date("2025-03-02T11:20:00"),
      details: {
        email: "prakash12@example.com",
        course: "Mobile App Development",
        message: "I have questions about the prerequisites for this course.",
      },
    },
    {
      id: 8,
      studentName: "Shersha Devangan",
      contactNo: "7745322145",
      status: "Completed",
      createdAt: new Date("2025-03-02T11:20:00"),
      details: {
        email: "shrdev15@example.com",
        course: "Mobile App Development",
        message: "I have questions about the prerequisites for this course.",
      },
    },
    {
      id: 9,
      studentName: "Sanjay Dungare",
      contactNo: "8967452244",
      status: "Completed",
      createdAt: new Date("2025-03-02T11:20:00"),
      details: {
        email: "sanjaya00@example.com",
        course: "Mobile App Development",
        message: "I have questions about the prerequisites for this course.",
      },
    },
    {
      id: 10,
      studentName: "Atharva Patel",
      contactNo: "9112356346",
      status: "Completed",
      createdAt: new Date("2025-03-02T11:20:00"),
      details: {
        email: "patel111@example.com",
        course: "Mobile App Development",
        message: "I have questions about the prerequisites for this course.",
      },
    },
  ]);

  // Filter and sorting states
  const [statusFilter, setStatusFilter] = useState("");
  const [timeSort, setTimeSort] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalItems = 50;

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

  function handleChangeStatus(enquiryId, newStatus) {
    setEnquiries(
      enquiries.map((enquiry) =>
        enquiry.id === enquiryId ? { ...enquiry, status: newStatus } : enquiry
      )
    );
  }

  function goToNextPage() {
    if (currentPage * itemsPerPage < totalItems) {
      setCurrentPage(currentPage + 1);
    }
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

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4 items-center">
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-100 rounded-md"
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
                  onClick={() => handleStatusSelect("pending")}
                >
                  pending
                </div>
                <div
                  className="px-4 py-2  hover:bg-green-800 hover:text-white cursor-pointer"
                  onClick={() => handleStatusSelect("completed")}
                >
                  completed
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
      <div className="border border-gray-300 rounded-md overflow-hidden">
        <table className="w-full ">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-4 border-r border-b border-gray-300 text-left">
                Serial No
              </th>
              <th className="py-3 px-4 border-r border-b border-gray-300 text-left">
                Student Name
              </th>
              <th className="py-3 px-4 border-r border-b border-gray-300 text-left">
                Contact No
              </th>
              <th className="py-3 px-4 border-r border-b border-gray-300 text-center">
                Action
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEnquiries.map((enquiry, index) => (
              <tr key={enquiry.id} className="border-b border-gray-300">
                <td className="py-3 px-4 border-r border-gray-300">
                  {index + 1}
                </td>
                <td className="py-3 px-4 border-r border-gray-300">
                  {enquiry.studentName}
                </td>
                <td className="py-3 px-4 border-r border-gray-300">
                  {enquiry.contactNo}
                </td>
                <td className="py-3 px-4 border-r border-gray-300 text-center">
                  <button
                    onClick={() => handleViewDetails(enquiry)}
                    className="px-4 py-2 border border-gray-300 rounded-md bg-indigo-200 hover:bg-gray-100"
                  >
                    View Details
                  </button>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="relative inline-block w-40">
                    <button
                      onClick={() => {
                        // Toggle a local state to show/hide dropdown for this specific row
                        setEnquiries(
                          enquiries.map((e) =>
                            e.id === enquiry.id
                              ? {
                                  ...e,
                                  showStatusDropdown: !e.showStatusDropdown,
                                }
                              : { ...e, showStatusDropdown: false }
                          )
                        );
                      }}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-md flex items-center justify-between ${
                        enquiry.status === "pending"
                          ? "text-yellow-600"
                          : "text-black"
                      }`}
                    >
                      {enquiry.status} <ChevronDown size={20} />
                    </button>

                    {/* Status dropdown menu */}
                    {enquiry.showStatusDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                        <div
                          className={`px-4 py-2 hover:bg-gray-100 hover:text-red-700 cursor-pointer ${
                            enquiry.status === "pending"
                              ? "font-bold text-red-600"
                              : ""
                          }`}
                          onClick={() => {
                            handleChangeStatus(enquiry.id, "pending");
                            // Hide dropdown after selection
                            setEnquiries(
                              enquiries.map((e) =>
                                e.id === enquiry.id
                                  ? { ...e, showStatusDropdown: false }
                                  : e
                              )
                            );
                          }}
                        >
                          pending
                        </div>
                        <div
                          className={`px-4 py-2 hover:bg-gray-100 hover:text-green-600 cursor-pointer ${
                            enquiry.status === "completed"
                              ? "font-bold text-green-500"
                              : ""
                          }`}
                          onClick={() => {
                            handleChangeStatus(enquiry.id, "completed");
                            // Hide dropdown after selection
                            setEnquiries(
                              enquiries.map((e) =>
                                e.id === enquiry.id
                                  ? { ...e, showStatusDropdown: false }
                                  : e
                              )
                            );
                          }}
                        >
                          completed
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {/* Empty rows for design */}
            {Array.from({
              length: Math.min(itemsPerPage - filteredEnquiries.length, 9),
            }).map((_, index) => (
              <tr key={`empty-${index}`} className="border-b border-gray-300">
                <td className="py-3 px-4 border-r border-gray-300">&nbsp;</td>
                <td className="py-3 px-4 border-r border-gray-300">&nbsp;</td>
                <td className="py-3 px-4 border-r border-gray-300">&nbsp;</td>
                <td className="py-3 px-4 border-r border-gray-300">&nbsp;</td>
                <td className="py-3 px-4">&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
        </div>
        <div className="flex gap-2">
          <button
            onClick={goToPrevPage}
            className="p-2 border border-gray-300 rounded-md hover:bg-gray-100"
            disabled={currentPage === 1}
          >
            ←
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md bg-gray-100">
            {currentPage}
          </button>
          <button
            onClick={goToNextPage}
            className="p-2 border border-gray-300 rounded-md hover:bg-gray-100"
            disabled={currentPage * itemsPerPage >= totalItems}
          >
            →
          </button>
        </div>
              
      </div>

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
  );
};

export default CourseEnqueryManagement;
