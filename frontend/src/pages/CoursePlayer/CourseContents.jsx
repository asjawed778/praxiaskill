
import React, { useRef, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { FaChevronDown, FaChevronUp, FaBars, FaTimes, FaCheck } from "react-icons/fa";
import CourseDetails from "./CourseDetails";
import { LuMonitorPlay } from "react-icons/lu";
import { useGetSubSectionsQuery, useGetVideosQuery, useUpdateCompletionMutation } from "../../services/coursePlayer.api";
import { Outlet } from "react-router-dom";

const CourseContents = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSubSection, setSelectedSubSection] = useState(null);
  const [completedSections, setCompletedSections] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const subSectionRef = useRef(null);

    console.log("Selected video: ", selectedSection);
    console.log("Selected section: ", selectedSubSection);
    
  const { data: sections = [], isLoading: sectionsLoading } = useGetVideosQuery();
  const { data: subSections = [], isLoading: subSectionsLoading } = useGetSubSectionsQuery(selectedSubSection, {
    skip: !selectedSubSection,});
  const [updateCompletion] = useUpdateCompletionMutation();

  const toggleSection = (sectionId) => {
    console.log("Section Id: ", sectionId);
    
    setSelectedSubSection(selectedSubSection === sectionId ? null : sectionId);
  };

  const handleCheckbox = async (sub) => {
    const newCompletedStatus = !sub.completed;
    setCompletedSections((prev) => ({ ...prev, [sub.id]: newCompletedStatus }));

    try {
      await updateCompletion({ subsectionId: sub.id, completed: newCompletedStatus }).unwrap();
    } catch (error) {
      console.error("Update failed", error);
      setCompletedSections((prev) => ({ ...prev, [sub.id]: sub.completed }));
    }
  };

  return (
    <div className="flex flex-col w-full md:flex-row">
      {/* Left Section (Videos + Content) */}
      <div className="flex flex-col w-full md:w-[70%]">
        {/* Toggle Button for Small Screens */}
        <button
          className="md:hidden fixed top-4 right-4 z-20 bg-black text-white p-2 rounded-full"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
  
        {/* Video Section */}
        <div className="flex flex-col w-full p-2 mx-auto rounded bg-black text-white justify-center items-center">
        {selectedSection ? (
          <VideoPlayer subSection={selectedSection} />
        ) : (
          <p className="flex h-[500px] items-center text-gray-300">Select a video to play</p>
        )}
      </div>
  
        {/* Content Section */}
        <div className="w-full">
          <CourseDetails />
        </div>
      </div>

      {/* Right Section (Course Content) */}
      <div
        className={`fixed top-16 right-0  md:w-[30%] h-full bg-white min-h-screen transition-transform duration-300 overflow-auto border-l border-gray-300  ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 z-10`}
        
      >
        <h2 className="text-xl font-bold text-center md:text-left ml-2">Course Contents</h2>
        <hr className="border-gray-300 " />

        {sectionsLoading ? (
          <p className="text-center mt-8">Loading sections...</p>
        ) : (
          <div className="">
            {sections.map((section, index) => (
              <div key={section.id} className=" ">
                {/* Section Title */}
                <div className="bg-gray-100 px-3 py-3">
                <div
                  className=" flex justify-between items-center cursor-pointer rounded-lg"
                  onClick={() => toggleSection(section.id)}
                >
                  <span className="font-bold">
                    Section {index + 1}: {section.title}
                  </span>
                  {selectedSubSection === section.id ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
                </div>
                <p className=" text-sm">
                  {section.completedSubSection}/{section.totalSubSections} | {section.duration}
                </p>
                </div>
                   <hr className="border-gray-300" />
                {/* Subsections */}
                {selectedSubSection === section.id && (
                  <div className="space-y-2 bg-white ">
                    {subSectionsLoading ? (
                      <p>Loading subsections...</p>
                    ) : subSections.length > 0 ? (
                      subSections.map((sub, index) => (                        
                        <div
                          key={sub.id}
                          ref={selectedSection?.id === sub.id ? subSectionRef : null}  // Set ref only for selected video
                          className={`flex flex-col py-2 cursor-pointer hover:bg-gray-300 
                            ${selectedSection?.id === sub.id ? "bg-gray-300" : "bg-white"} `}
                          onClick={() => {
                            setSelectedSection(sub);
                            
                            // Scroll to the selected subsection smoothly
                            setTimeout(() => {
                              subSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                            }, 100);
                          }}
                        >
                        <div className="flex flex-row items-center ml-2 text-sm">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={sub.completed}
                              onChange={() => handleCheckbox(sub)}
                              className="hidden peer"
                            />
                            <div className="w-4 h-4 border-2 flex items-center justify-center peer-checked:bg-red-500 peer-checked:border-red-500">
                              {sub.completed && <FaCheck className="text-white" size={10} />}
                            </div>
                          </label>
                          <span className="ml-4">
                            <span className="text-md">{index + 1}{". "}</span>{sub.title}
                          </span>
                        </div>
                        <div className="flex flex-row space-x-1 mt-1 items-center text-gray-500 ml-11">
                          <LuMonitorPlay className="mt-1" />
                          <span className="text-sm">{sub.duration}</span>
                        </div>
                      </div>
                      ))
                    ) : (
                      <p className="text-gray-500 py-4 px-2">No subsections available</p>
                    )}
                    {selectedSubSection && <hr className="border-gray-300" />}
                    {/* <hr className="border-gray-300"/> */}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default CourseContents;
