import React from "react";
import { useGetAnnouncementsQuery } from "../../../services/coursePlayer.api";
// import { useGetAnnouncementsQuery } from "../../store/videoApi";

const Announcements = () => {
  const { data: announcements, error, isLoading } = useGetAnnouncementsQuery();

  if (isLoading) return <p>Loading announcements...</p>;
  if (error) return <p>Error loading announcements</p>;

  return (
    <div className="m-4 p-4 w-full md:w-3/5">
      <h2 className="text-2xl font-bold">Announcements</h2>
      {announcements.map((announcement) => (
        <div key={announcement.id} className=" pb-4 mt-4">
          {/* Author Info */}
          <div className="flex items-center gap-3 mb-2">
            <img
              src={announcement.author.image}
              alt={announcement.author.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{announcement.author.name}</p>
              <p className="text-gray-500 text-sm">Posted {announcement.postedYear} years ago</p>
            </div>
          </div>

          {/* Announcement Content */}
          <h3 className="text-xl font-semibold">{announcement.title}</h3>
          <p className="text-gray-600">{announcement.message}</p>

          {/* Link (If available) */}
          {announcement.link && (
            <a
              href={announcement.link}
              className="text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Details
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default Announcements;
