import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { GoVideo } from "react-icons/go";
export default function Sections({ courseContent, setSectionIds, sectionIds }) {
  const [expandedLessons, setExpandedLessons] = useState({});
  const [sectionData, setSectionData] = useState([]);

  const toggleLesson = (index, hasSubSections) => {
    if (!hasSubSections) return;
    setExpandedLessons((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  function courseData() {
    return courseContent?.sections?.map((section) => ({
      id: section._id,
      title: section.title,
      description: section.description,
      totalSubsections: section.subSections.length,
      totalDuration: "45 Mins",
      subSections: section.subSections.map((sub) => ({
        id: sub._id,
        title: sub.title,
        duration: "2:25",
      })),
    }));
  }

  useEffect(() => {
    const data = courseData;
    setSectionData(data);
  }, [courseContent]);

  const handleSubSectionClick = (sectionId, subSectionId) => {
    setSectionIds((prev) => {
      return {...prev, sectionId, subSectionId}
    })
  }

  return (
    <div className="">
      <div className="flex flex-col w-full">
        {sectionData?.map((section, index) => {
          const isExpanded = expandedLessons[index] || false;
          const hasSubSections = section.subSections?.length > 0;

          return (
            <div key={index} className="bg-white rounded-lg">
              <div
                className={`flex flex-col cursor-pointer px-1 border-b hover:bg-neutral-50 border-neutral-200 ${
                  isExpanded && "bg-neutral-50"
                }`}
                onClick={() => toggleLesson(index, hasSubSections)}
              >
                <div className="w-full py-3 px-4">
                  <div className="flex justify-between ">
                    <div>
                      <span
                        className={`${
                          isExpanded && "text-primary"
                        } font-semibold`}
                      >
                        <span>Section {index + 1}: </span>
                        {section.title}
                      </span>
                    </div>
                    {hasSubSections ? (
                      isExpanded ? (
                        <RiArrowDropUpLine className="text-2xl" />
                      ) : (
                        <RiArrowDropDownLine className="text-2xl" />
                      )
                    ) : (
                      <span className="md:w-6 w-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-neutral-500">
                    <p>{section?.subSections?.length} Lessions</p>
                    <p>{section.totalDuration}</p>
                  </div>
                </div>
              </div>

              <div
                className={`${
                  isExpanded && "mt-2"
                } overflow-hidden transition-all duration-400 ${
                  isExpanded
                    ? "max-h-[1200px] opacity-100"
                    : "max-h-0 opacity-0"
                } `}
              >
                {section.subSections.map((subSection, index) => (
                  <div
                    key={index}
                    className={`p-2 ml-4 text-sm border-b border-neutral-200 hover:bg-blue-50 rounded-md ${sectionIds?.subSectionId === subSection?.id ? "bg-blue-50" : null}`}
                  >
                    <div onClick={() => handleSubSectionClick(section.id, subSection.id)} className="flex gap-5 items-start cursor-pointer">
                        <input disabled type="checkbox" className="mt-1.5" />
                        <div>
                            <p className="">{subSection.title}</p>
                            <div className="flex items-center gap-2">
                                <GoVideo />
                                <span className="text-xs text-neutral-500">{subSection.duration}</span>
                            </div>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
