import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { VscBookmark } from "react-icons/vsc";


const sections = [
  {
    name: "courses",
    accessRole: "SUPER_ADMIN",
    redirectTO: null,
    icon: <HiOutlineDesktopComputer />,
    links: [
      { url: "/dashboard/add-course", label: "Add Course", icon: <FiUpload /> },
      { url: "/dashboard/manage-course", label: "Courses", icon: <FaEye /> },
      { url: "/dashboard/manage-category", label: "Category", icon: <BsFillPersonCheckFill /> },
      { url: "/dashboard/course-enquiry", label: "Enquiry", icon: <FaQuestion /> },
    ],
  },
  {
    name: "My Enrollment",
    accessRole: "USER",
    redirectTO: "/dashboard/my-enrollment",
    icon: <VscBookmark />,
    links: [],
  },
];



export default function Sidebar({ isOpen, setIsOpen, location }) {
  const [drawer, setDrawer] = useState({});
  const navigate = useNavigate()

  const { user: {role: userRole} } = useSelector((state) => state.auth);

  const toggleDropdown = (section) => {
    setDrawer((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    // On refreshing the page it will open the drawer
    sections.forEach((section) => {
      const isActive = section.links.some((link) => link.url === location.pathname);
      if (isActive) {
        setDrawer((prev) => ({ ...prev, [section.name]: true }));
      }
    });
  }, [location.pathname]);

  const handleSectionOnClick = (name, redirectTO) => {
    toggleDropdown(name);
    if(redirectTO)
    {
      navigate(redirectTO);
    }
  }

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
        className={`fixed z-50 inset-y-0 left-0 w-64 border-r overflow-y-auto bg-white border-neutral-300 max-h-full p-4 transition-transform duration-300 ease-in-out 
      ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static  lg:h-screen`}
      >
        {/* Close Button this will be only visible on small screen */}
        <p
          className="lg:hidden flex justify-end ml-auto text-2xl font-thin text-black"
          onClick={() => setIsOpen(false)}
        >
          <RxCross2 className="hover:bg-neutral-200 rounded-full cursor-pointer" />
        </p>

        <Link to="/dashboard">
          <div className={`flex gap-4 items-center mt-4 text-sm p-2 text-neutral-700 hover:bg-neutral-200 mb-0.5 rounded-md ${location.pathname === "/dashboard" && "bg-neutral-200 text-primary"}`}>
            <FiHome />
            <h2>Dashboard</h2>
          </div>
        </Link>

        {sections.map(({ icon, name, links, accessRole, redirectTO }, index) => (
          (userRole === accessRole || accessRole === "BOTH") ? <div key={index}>
            <div
              onClick={() =>{handleSectionOnClick(name, redirectTO)}}
              className={`flex items-center justify-between py-2 rounded-md cursor-pointer hover:bg-neutral-200 ${location.pathname === redirectTO ? "bg-neutral-200 text-primary" : "text-neutral-700"}`}
            >
              <div className="flex items-center gap-4 text-sm px-2">
                {icon}
                <span className="capitalize text-sm">{name}</span>
              </div>
              {links.length > 0 && <svg
                className={`w-4 h-4 mr-2 transform transition-transform ${
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
              </svg>}
            </div>

            {drawer[name] && (
              <div className="mt-2 rounded-md space-y-0.5">
                {links.map(({ url, label, icon }, index) => (
                  <Link
                    key={index}
                    to={url}
                    className={`block px-8 py-1.5 text-sm hover:bg-neutral-200 rounded-md ${location.pathname === url && "bg-neutral-200"}`}
                  >
                    <div className={`flex items-center text-xs gap-2 text-neutral-700 ${location.pathname === url && "text-primary"}`}>
                      {location.pathname === url ? (
                        <IoMdArrowForward className="mr-2" />
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
          </div> : null
        ))}
      </div>
    </>
  );
}
