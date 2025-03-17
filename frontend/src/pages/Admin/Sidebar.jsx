import { Link } from "react-router-dom";
import { useState } from "react";
import { FiHome } from "react-icons/fi";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdArrowForward } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { FaQuestion } from "react-icons/fa";

const sections = [
  {
    name: "courses",
    icon: <HiOutlineDesktopComputer />,
    links: [
      { url: "/admin/add-course", label: "Add Course", icon: <FiUpload /> },
      { url: "/admin/manage-course", label: "Courses", icon: <FaEye /> },
      { url: "/admin/add-category", label: "Category", icon: <BsFillPersonCheckFill /> },
      { url: "/admin/course-enquiry", label: "Enquiry", icon: <FaQuestion /> },
    ],
  },
  // {
  //   name: "category",
  //   icon: <MdOutlineDashboard />,
  //   links: [
  //     { url: "/admin/add-category", label: "Add Category", icon: <FiUpload /> },
  //     { url: "/admin/manage-categories", label: "Manage Categories", icon: <BsFillPersonCheckFill /> },
  //     { url: "/admin/view-categories", label: "View Categories", icon: <FaEye /> },
  //   ],
  // },
];



export default function Sidebar({ isOpen, setIsOpen, location }) {
  const [drawer, setDrawer] = useState({});

  const toggleDropdown = (section) => {
    setDrawer((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <>
      {/* Hamburger Menu Button (Only Visible on Small Screens) */}
      {!isOpen && (
        <button
          className="lg:hidden fixed top-14 left-0 z-20 rounded bg-white text-black"
          onClick={() => setIsOpen(true)}
        >
          <div className="w-7 h-6 bg-blue-500 hover:bg-[var(--color-primary)] rounded-r-md text-white flex justify-center items-center cursor-pointer">
            <GiHamburgerMenu />
          </div>
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-50 inset-y-0 left-0 w-64 border-r bg-white border-neutral-300 max-h-full p-4 transition-transform duration-300 ease-in-out 
      ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static  lg:h-screen`}
      >
        {/* Close Button this will be only visible on small screen */}
        <p
          className="lg:hidden flex justify-end ml-auto text-2xl font-thin text-black"
          onClick={() => setIsOpen(false)}
        >
          <RxCross2 className="hover:bg-hover-sidebar-background cursor-pointer" />
        </p>

        <Link to="/admin">
          <div className="flex gap-4 items-center text-sm p-2 text-neutral-700 hover:bg-neutral-200 ">
            <FiHome />
            <h2>Dashboard</h2>
          </div>
        </Link>

        {sections.map(({ icon, name, links }, index) => (
          <div key={index}>
            <div
              onClick={() => toggleDropdown(name)}
              className="flex items-center justify-between py-2 rounded-md cursor-pointer hover:bg-neutral-200"
            >
              <div className="flex items-center gap-4 text-sm px-2 text-neutral-700  ">
                {icon}
                <span className="capitalize text-sm">{name}</span>
              </div>
              <svg
                className={`w-4 h-4 mr-2 text-gray-400 transform transition-transform ${
                  drawer[name] ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {drawer[name] && (
              <div className="mt-2 rounded-md">
                {links.map(({ url, label, icon }, index) => (
                  <Link
                    key={index}
                    to={url}
                    className={`block px-8 py-2 text-sm hover:bg-neutral-200 ${
                      index === 0
                        ? "rounded-t-md"
                        : index === links.length - 1
                        ? "rounded-b-md"
                        : ""
                    }`}
                  >
                    <div className={`flex items-center text-xs gap-2 text-neutral-700 hover:bg-neutral-200 ${location.pathname === url && "text-primary"}`}>
                      {location.pathname === url ? (
                        <IoMdArrowForward className="mr-2 text-xl" />
                      ) : (
                        <IoIosArrowForward className="mr-2" />
                      )}
                      {icon}
                      <span className={`capitalize text-xs`}>{label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
