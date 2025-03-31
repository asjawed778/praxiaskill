import React, { useState } from "react";
import { FaSearch, FaStar } from "react-icons/fa";
import { useAddReviewMutation, useGetCourseInfoQuery, useGetReviewsQuery } from "../../../services/coursePlayer.api";

const ReviewSection = () => {
  // Fetch reviews & course rating info
  const { data: reviewsData, error: reviewsError, isLoading: reviewsLoading, refetch } = useGetReviewsQuery();
  const { data: courseInfo, error: courseError, isLoading: courseLoading } = useGetCourseInfoQuery();
  const [addReview] = useAddReviewMutation();

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  // Handle review submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText) return;

    try {
      const response = await addReview({
        rating,
        comment: reviewText,
        author: {
          name: "Anonymous",  // Example: Set dynamic user in the future
          profile_image: "/default-profile.png"
        },
        timestamp: new Date().toLocaleDateString(),
      });

      if ("error" in response) {
        console.error("Error submitting review:", response.error);
        return;
      }

      setReviewText("");
      setRating(5);
      // refetch(); // ✅ Re-fetch reviews after submission
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };
  const handleFilter = () => {

  }

  if (reviewsLoading || courseLoading) return <p>Loading reviews...</p>;
  if (reviewsError || courseError) return <p>Error loading reviews</p>;

  return (
    <div className="m-2 w-full p-4 md:w-4/5">
      <h2 className="text-xl font-bold mb-3">Student Feedback</h2>

      {/* Course Rating Summary */}
      <div className="flex flex-row items-center space-x-4">
        <div className="flex flex-col items-center">
          <p className="text-4xl font-bold">{courseInfo?.course_rating || "N/A"} ⭐</p>
          <p>Course Rating</p>
        </div>
        

        {/* Rating Breakdown */}
        <div className="mt-2 flex flex-col space-y-2">
          {courseInfo?.rating_distribution &&
            Object.entries(courseInfo.rating_distribution).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <span className="whitespace-nowrap">{key.replace("_star", " Stars")}</span>
                <div className="w-40 bg-gray-200 h-2 rounded">
                  <div className="bg-yellow-500 h-2 rounded" style={{ width: `${value.percentage}%` }}></div>
                </div>
                <span>{value.percentage}%</span>
              </div>
            ))}
        </div>
      </div>

      
        <div className="flex flex-col md:flex-row md:items-center  md:w-full flex-wrap"> 
          {/* Search Bar */}
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

          {/* Filter Dropdown */}
          <div className="mt-4 md:mt-0 w-full md:max-w-xs"> 
            <h3 className="font-bold">Filter by Rating:</h3>
            <select
              className="mt-2 p-2 border rounded w-full md:max-w-sm bg-white"
              onChange={handleFilter}
            >
              <option value="">All Ratings</option>
              {[5, 4, 3, 2, 1].map((star) => (
                <option key={star} value={star}>
                  {star} ⭐
                </option>
              ))}
            </select>
          </div>
        </div>

      {/* Add Review Form */}
      <h2 className="mt-4 text-xl font-bold">Leave a Review</h2>
      <form onSubmit={handleSubmit} className="mt-4 w-full block">
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer ${rating >= star ? "text-yellow-500" : "text-gray-400"}`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <div className=" flex flex-col">
        <textarea
          className="md:w-4/5 p-2 py-4 border rounded mt-2"
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
        <button type="submit" className="mt-2 px-4 py-2 w-auto self-start bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer">
          Submit
        </button>
        </div>
      </form>

      {/* Review List */}
      <h2 className="text-xl font-bold mt-6">Reviews</h2>
      <div className="space-y-4">
        {reviewsData?.map((review) => (
          <div key={review.id} className="p-4">
            <div className="flex items-center space-x-3">
              <img src={review.author.profile_image || "/default-profile.png"} alt="Profile" className="w-8 h-8 rounded-full border border-gray-300" />
              <span className="font-bold">{review.author.name}</span>
              <span className="text-gray-500 text-sm">{review.timestamp}</span>
            </div>
            <p className="mt-2">{review.comment}</p>
            <div className="flex">
              {Array(review.rating)
                .fill()
                .map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
