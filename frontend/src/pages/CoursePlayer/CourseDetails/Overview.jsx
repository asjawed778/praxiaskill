
import { useGetCourseOverviewQuery } from "../../../services/coursePlayer.api";

const Overview = () => {
    const { data, error, isLoading } = useGetCourseOverviewQuery();
  
    if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error loading data</p>;
  
    return (
      <div className="p-6 w-full md:w-3/5">
        <h1 className="text-xl font-bold mb-2">{data.title}</h1>
        <div className="flex items-center space-x-4">
          <span className="text-yellow-500 font-semibold">{data.rating} ⭐</span>
          <span>{data.students} Students</span>
          <span>{data.total_hours} hours total</span>
        </div>
        <p className="text-gray-500">Last updated: {data.last_updated}</p>
  
        <div className="mt-4 p-4 border rounded-lg bg-gray-100">
          <h2 className="font-semibold">{data.schedule_learning.title}</h2>
          <p className="text-sm">{data.schedule_learning.description}</p>
          <div className="mt-2 flex space-x-4">
            <button className="px-4 py-2 text-red-500 border border-black font-semibold  rounded-md hover:bg-red-600 hover:text-white cursor-pointer">{data.schedule_learning.actions[0]}</button>
            <button className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 cursor-pointer">{data.schedule_learning.actions[1]}</button>
          </div>
        </div>
  
        <div className="mt-4">
          <h3 className="font-semibold">By the numbers</h3>
          <p>Skill level: {data.course_details.skill_level}</p>
          <p>Lectures: {data.course_details.lectures}</p>
          <p>Video: {data.course_details.video_hours} hours</p>
          <p>Captions: {data.course_details.captions ? "Yes" : "No"}</p>
        </div>
      </div>
    );
  };

export default Overview;
