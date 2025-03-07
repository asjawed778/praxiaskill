import { PiVideoCameraThin } from "react-icons/pi";
import { CiBookmark } from "react-icons/ci";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useRef } from "react";

export default function MorePosts() {
  const news = [
    {
      name: "BooliiTheme",
      title: "Where the Internet Lives: From Trauma to Triumph Oval",
      categories: ["Books", "Video"],
      date: "October 26, 2024",
      readTime: "2 min read",
    },
    {
      name: "BooliiTheme",
      title: "Jacob Collier x Gen Music | Google Lab Sessions | Full Session",
      categories: ["Travel", "Video"],
      date: "October 26, 2024",
      readTime: "2 min read",
    },
    {
      name: "BooliiTheme",
      title: "The impact of COVID-19 on The Airport Business",
      categories: ["Technology"],
      date: "October 26, 2024",
      readTime: "2 min read",
    },
    {
      name: "BooliiTheme",
      title:
        "How Jennifer Aniston Struggles With Depression Inspired New Album",
      categories: ["Audio"],
      date: "October 26, 2024",
      readTime: "2 min read",
    },
    {
      name: "BooliiTheme",
      title: "Where the Internet Lives: From Trauma to Triumph Oval",
      categories: ["Audio"],
      date: "October 26, 2024",
      readTime: "2 min read",
    },
    {
      name: "BooliiTheme",
      title: "New Tech Innovations for 2025",
      categories: ["Technology"],
      date: "October 27, 2024",
      readTime: "3 min read",
    },
  ];

  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 280; // Adjust for smoother scrolling
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col gap-5 border-t border-neutral-300 pt-10">
      {/* Header */}
      <div className="flex items-center justify-between gap-5">
        <h1 className="font-semibold text-lg space-x-1">
          <span>More posts.</span>
          <span className="text-gray-500">You may also be interested in.</span>
        </h1>
        <div className="flex gap-5">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <FaArrowLeftLong />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <FaArrowRightLong />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={sliderRef}
        className="flex gap-5 overflow-x-hidden scroll-smooth snap-x snap-mandatory scrollbar-hide px-2"
        style={{ scrollBehavior: "smooth" }}
      >
        {news.map((news, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 snap-center bg-cover bg-center flex items-end h-[20rem] p-3 rounded-2xl shadow-lg w-[15rem]"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/736x/f8/77/45/f8774514b8813f8a9af89f13bc4f02a6.jpg')",
            }}
          >
            <PiVideoCameraThin className="absolute top-3 right-5 size-6" />
            <div className="bg-white flex flex-col gap-3 w-full min-h-[10rem] max-h-fit p-3 rounded-2xl">
              <div className="flex items-center gap-3">
                {news.categories.map((category, categoryIndex) => (
                  <p
                    key={categoryIndex}
                    className="font-semibold text-xs bg-gray-100 p-1 rounded-full"
                  >
                    {category}
                  </p>
                ))}
                <CiBookmark className="ml-auto" />
              </div>
              <p className="font-bold text-sm">{news.title}</p>
              <div className="flex gap-2">
                <div className="text-sm flex flex-col gap-1">
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/049/950/109/small_2x/young-woman-smiling-confidently-in-casual-attire-cut-out-transparent-png.png"
                    alt="user"
                    className="h-8 w-fit rounded-full"
                  />
                  <p className="font-semibold">{news.name}</p>
                  <p className="font-semibold text-xs text-gray-500 space-x-1">
                    <span>{news.date}</span>
                    <span>•</span>
                    <span>{news.readTime}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
