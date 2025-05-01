import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sections from "./Sections";
import Overview from "./Video Information/Overview";
import QnASection from "./Video Information/QnASection";
import NotesSection from "./Video Information/NotesSection";

const SECTIONS = [
  "Overview",
  "Q&A",
  "Notes",
  "Announcements",
  "Reviews",
  "Learning tools",
];

const VideoInformation = ({
  isSidebarOpen,
  sectionIds,
  courseContent,
  setSectionIds,
  setExpandedLessons,
  expandedLessons,
}) => {
  const [activeSection, setActiveSection] = useState("Overview");

  useEffect(() => {
    if (isSidebarOpen && window.innerWidth >= 1024) {
      setActiveSection("Overview");
    }
  }, [isSidebarOpen]);
  return (
    <div className="w-[90%] mx-auto mt-3">
      <div className="flex items-center border-b border-neutral-300 justify-between font-semibold overflow-x-scroll scroll-smooth scrollbar-hide whitespace-nowrap custom-scrollbar">
        <span
          onClick={() => setActiveSection("content")}
          className={`px-4 py-2 ${
            isSidebarOpen ? "hidden" : null
          } hover:text-neutral-700 text-neutral-600 cursor-pointer ${
            activeSection === "content"
              ? "border-b-2 border-primary text-neutral-800 bg-neutral-100 rounded-t-lg"
              : "hover:bg-neutral-50"
          }`}
        >
          Content
        </span>
        {SECTIONS.map((section, index) => (
          <span
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2  hover:text-neutral-700 text-neutral-600 cursor-pointer ${
              activeSection === section
                ? "border-b-2 border-primary text-neutral-800 bg-neutral-100 rounded-t-lg"
                : "hover:bg-neutral-50"
            }`}
            key={index}
          >
            {section}
          </span>
        ))}
      </div>
      <div className="w-full">

        {/* i have made this just to show a div  */}
        {SECTIONS.map(
          (section, index) =>
            activeSection === section && activeSection !== "Overview" &&activeSection !== "Q&A" && activeSection !== "Notes" && (
              <div
                key={index}
                className="h-96 flex justify-center items-center text-neutral-500"
              >
                {section}
              </div>
            )
        )}
        {activeSection === "content" && (
            <Sections
              sectionIds={sectionIds}
              courseContent={courseContent}
              setSectionIds={setSectionIds}
              setExpandedLessons={setExpandedLessons}
              expandedLessons={expandedLessons}
            />
        )}
        
        {activeSection === "Overview" && (
            <Overview
              courseContent={courseContent}
            />
        )}

        {activeSection === "Q&A" && (
          <QnASection />
        )}
        {activeSection === "Notes" && (
          <NotesSection />
        )}
      </div>
    </div>
  );
};

export default VideoInformation;
