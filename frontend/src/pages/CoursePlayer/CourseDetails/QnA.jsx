import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaComment, FaSearch, FaThumbsUp } from "react-icons/fa";
import { useGetCourseQnAQuery } from "../../../services/coursePlayer.api";

const QnA = () => {
  const { data, error, isLoading } = useGetCourseQnAQuery();
  const [openQuestion, setOpenQuestion] = useState(null);

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error loading Q&A</p>;

  // Debugging: Check the API response
  console.log("API Response: ", data.featured_questions);

  // Extract QnA data correctly from 'data.courseQnA'
//   const qnaData = data?.courseQnA;
//   console.log("data: ", qnaData);
  
//   if (!qnaData) {
//     return <p className="text-center text-gray-500">No Q&A data available</p>;
//   }

  return (
    <div className="m-2 p-2 w-full md:w-3/5">
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-col mb-4">
        <div className="mt-4 flex flex-row space-x-2 w-full md:max-w-md"> 
                    <input
                      type="text"
                      placeholder="Search review"
                      className="border p-2 border-gray-300 rounded w-full md:max-w-xs"
                    />
                    <button className="bg-red-500 px-3 py-2 rounded text-white cursor-pointer hover:bg-red-600">
                      <FaSearch />
                    </button>
                  </div>
        <div className="mt-4 w-auto flex flex-col md:flex-row space-x-4">
          <div className="flex space-x-4">
          <select className="border px-4 py-2 rounded-md">
            <option>{data.filters?.lecture_filter || "All Lectures"}</option>
          </select>
          <select className="border px-4 py-2 rounded-md">
            <option>{data.filters?.sort_by || "Sort by recommended"}</option>
          </select>
          </div>
          <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md">
            {data.filters?.filter_button || "Filter Questions"}
          </button>
        </div>
      </div>

      {/* Featured Questions Section */}
      <h2 className="text-xl font-bold mb-3">
        Featured questions in this course ({data.featured_questions?.length || 0})
      </h2>

      {/* Debugging: Check if 'featured_questions' exists */}
      {console.log("Featured Questions: ", data.featured_questions)}

      <div className="space-y-4">
        {Array.isArray(data.featured_questions) && data.featured_questions.length > 0 ? (
          data.featured_questions.map((qna, index) => (
            <div key={qna.id} className="p-4 rounded-lg shadow">
              {/* Question Header */}
              <div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
              >
                <div className="flex items-center space-x-3">
                  {qna.author?.profile_image ? (
                    <img src={qna.author.profile_image} alt={qna.author.name} className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold">
                      {qna.author?.profile_initials || "?"}
                    </div>
                  )}
                  <span className="font-bold">{qna.author?.name}</span>
                  <span className="text-gray-500 text-sm">{qna.lecture} · {qna.timestamp}</span>
                </div>
                {/* Expand/Collapse Icon */}
                {openQuestion === index ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {/* Question Content - Collapsible */}
              {openQuestion === index && (
                <div className="mt-2">
                  <p className="font-semibold">{qna.question}</p>
                  {qna.details && <p className="text-gray-600 text-sm">{qna.details}</p>}

                  {/* Votes & Comments */}
                  <div className="flex space-x-4 mt-2 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <FaThumbsUp />
                      <span>{qna.votes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaComment />
                      <span>{qna.comments}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No featured questions available</p>
        )}
      </div>
    </div>
  );
};

export default QnA;
