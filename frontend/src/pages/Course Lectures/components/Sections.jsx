import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { GoVideo } from "react-icons/go";
export default function Sections({ specificCourse }) {
  const [expandedLessons, setExpandedLessons] = useState({});
  const [lessonsData, setLessonsData] = useState([]);

  const toggleLesson = (index, hasSubLessons) => {
    if (!hasSubLessons) return;
    setExpandedLessons((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  function courseData() {
    return specificCourse?.sections?.map((section) => ({
      title: section.title,
      description: section.description,
      totalLessons: section.subSections.length,
      totalDuration: "45 Mins",
      expanded: false,
      subLessons: section.subSections.map((sub) => ({
        title: sub.title,
        duration: "2:25",
        completed: true,
        locked: true,
      })),
    }));
  }

  useEffect(() => {
    const data = courseData;
    setLessonsData(data);
  }, [specificCourse]);

  return (
    <div className="">
      <div className="flex flex-col w-full">
        {lessonsData?.map((lesson, index) => {
          const isExpanded = expandedLessons[index] || false;
          const hasSubLessons = lesson.subLessons.length > 0;

          return (
            <div key={index} className="bg-white rounded-lg">
              <div
                className={`flex flex-col cursor-pointer px-1 border-b hover:bg-neutral-50 border-neutral-200 ${
                  isExpanded && "bg-neutral-50"
                }`}
                onClick={() => toggleLesson(index, hasSubLessons)}
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
                        {lesson.title}
                      </span>
                    </div>
                    {hasSubLessons ? (
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
                    <p>{lesson?.subLessons?.length} Lessions</p>
                    <p>{lesson.totalDuration}</p>
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
                {lesson.subLessons.map((subLesson, index) => (
                  <div
                    key={index}
                    className=" p-2 ml-4 text-sm border-b border-neutral-200"
                  >
                    <div className="flex gap-5 items-start">
                        <input type="checkbox" className="mt-1.5" />
                        <div>
                            <p className="">{subLesson.title}</p>
                            <div className="flex items-center gap-2">
                                <GoVideo />
                                <span className="text-xs text-neutral-500">{subLesson.duration}</span>
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
