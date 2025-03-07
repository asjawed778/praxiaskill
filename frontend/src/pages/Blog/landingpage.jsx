import { Link } from "react-router-dom";
import img1 from "/imgs/blogs/img1.svg";
import img2 from "/imgs/blogs/img2.svg";
import img3 from "/imgs/blogs/img3.svg";
import BlogHeadline from "./BlogHeadline";
import MorePosts from "./MorePosts";

export default function blogpage() {
  const blogs = [
    {
      id: 982374,
      img: img1,
      techs: ["Technology", "Technology"],
      title:
        "How Jennifer Aniston Struggles With Depression Inspired New Album",
      content:
        "Music expresses feeling and thought, without language. It was below and before speech,…",
    },
    {
      id: 345345,
      img: img2,
      techs: ["Technology", "Technology"],
      title:
        "How Jennifer Aniston Struggles With Depression Inspired New Album",
      content:
        "Music expresses feeling and thought, without language. It was below and before speech,…",
    },
    {
      id: 98798734,
      img: img1,
      techs: ["Technology", "Technology"],
      title:
        "How Jennifer Aniston Struggles With Depression Inspired New Album",
      content:
        "Music expresses feeling and thought, without language. It was below and before speech,…",
    },
    {
      id: 48433,
      img: img2,
      techs: ["Technology", "Technology"],
      title:
        "How Jennifer Aniston Struggles With Depression Inspired New Album",
      content:
        "Music expresses feeling and thought, without language. It was below and before speech,…",
    },
    {
      id: 6879879,
      img: img1,
      techs: ["Technology", "Technology"],
      title:
        "How Jennifer Aniston Struggles With Depression Inspired New Album",
      content:
        "Music expresses feeling and thought, without language. It was below and before speech,…",
    },
    {
      id: 77765,
      img: img2,
      techs: ["Technology", "Technology"],
      title:
        "How Jennifer Aniston Struggles With Depression Inspired New Album",
      content:
        "Music expresses feeling and thought, without language. It was below and before speech,…",
    },
    {
      id: 82374,
      img: img1,
      techs: ["Technology", "Technology"],
      title:
        "How Jennifer Aniston Struggles With Depression Inspired New Album",
      content:
        "Music expresses feeling and thought, without language. It was below and before speech,…",
    },
  ];

  const shortNews = [
    {
      img: img3,
      title: "Self Driving car: Everything you n...",
      techs: "Technology",
    },
    {
      img: img3,
      title: "Self Driving car: Everything you n...",
      techs: "Technology",
    },
    {
      img: img3,
      title: "Self Driving car: Everything you n...",
      techs: "Technology",
    },
    {
      img: img3,
      title: "Self Driving car: Everything you n...",
      techs: "Technology",
    },
  ];

  return (
    <div className="flex flex-col gap-5 xl:px-[200px] lg:px-[150px] md:px-[100px] px-[50px] py-10">
      <BlogHeadline />

      <div className="flex flex-wrap gap-4">
        {/* First Row: Two Blogs + Info Section */}
        {blogs.slice(0, 2).map((blog, index) => (
          <Link
            to={`/blog/${blog.id}`}
            key={index}
            className="bg-white h-auto md:h-[340px] w-auto md:w-[320px] pb-4 shadow-lg rounded-lg mx-auto"
          >
            <img
              src={blog.img}
              alt="blog img"
              className="w-full h-auto rounded-md"
            />

            <div className="px-5">
              <h2 className="font-semibold mt-2">{blog.title}</h2>
              <p className="text-sm text-gray-600">{blog.content}</p>
            </div>
          </Link>
        ))}

        <div className="flex flex-col items-center gap-3 h-auto md:h-[340px] w-[90vw] md:w-[320px] p-10 md:p-4 shadow-lg rounded-lg mx-auto">
          {shortNews.map((news, index) => (
            <div key={index} className="flex gap-4 md:gap-2 justify-between">
              <img src={img3} alt="img 3" className="h-[52px] w-auto" />
              <section className="flex flex-col flex-1">
                <p className="tracking-tight font-bold md:text-sm text-md line-clamp-1">
                  Self Driving car: Everything you need to know
                </p>
                <p className="text-xs bg-[var(--color-primary)] text-white w-fit px-2 py-1 rounded-full">
                  Technology
                </p>
              </section>
            </div>
          ))}
          <button className="font-semibold text-xs text-[var(--color-primary)] ml-auto">
            View More
          </button>
        </div>

        {/* Remaining Rows: 3 Blogs Each */}
        {blogs.slice(2).map((blog, index) => (
          <Link
            to={`/blog/${blog.id}`}
            key={index}
            className={`${index == blogs.length && "mr-auto"} mx-auto`}
          >
            <div className="bg-white h-auto md:h-[340px] w-auto md:w-[320px] pb-4 shadow-lg rounded-lg">
              <img
                src={blog.img}
                alt="blog img"
                className="w-full h-auto rounded-md"
              />
              <div className="px-5">
                <h2 className="font-semibold mt-2">{blog.title}</h2>
                <p className="text-sm text-gray-600">{blog.content}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <MorePosts />
    </div>
  );
}
