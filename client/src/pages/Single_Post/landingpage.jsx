import React from "react";
import { useParams } from "react-router-dom";
import Headline from "./Headline";
import MorePosts from "../Blog/MorePosts";
import img1 from "../../../public/imgs/blogs/img1.svg";
import SubscribeBox from "./SubscribeBox";
import Socials from "./Socials";

const landingpage = () => {

  const blogData = {
    id: 1,
    title: "How Jennifer Aniston 'Struggles With Depresssion' Inspired New Album",
    para1: "Immerse yourself in the world of literature with our curated collection of books. From bestsellers to hidden gems, our assortment caters to a variety of interests and genres.",
    para2: "The Real Test is not whether you avoid this failure, because you won’t. It’s whether you let it harden or shame you into inaction, or whether you learn from it; whether you choose to persevere.<br/> Quisque eleifend dolor ac dui rutrum lacinia. Aenean fringilla gravida risus eu posuere. Integer et facilisis magna, ac pulvinar neque. Suspendisse potenti. Etiam quis tellus scelerisque purus tincidunt dignissim. Curabitur fermentum a nisl eu porta.<br/> Mauris nec lectus eu nulla dignissim aliquam eu vel risus. Suspendisse eget rhoncus urna, vitae tempor eros. Proin in laoreet diam, eget placerat eros. Aliquam consequat, massa eget pulvinar.",
    para3: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus aliquam optio, aspernatur maxime, explicabo quae porro at totam pariatur placeat excepturi eum ad voluptas autem molestiae facere voluptatum dignissimos eveniet, quam velit possimus. Expedita voluptatem odit dolore dolor reiciendis ullam!",
  }

  const user = {
    id: 123,
    name: "Arisha K Khan",
    time: "43 Min Ago",
    imgURL:
      "https://plus.unsplash.com/premium_photo-1673758905770-a62f4309c43c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };
  const { id } = useParams();
  return (
    <div className="flex flex-col gap-5 px-[50px] md:px-[90px] lg:px-[200px] py-10">
      <Headline title={blogData.title} />
      <div className="flex gap-13 flex-col md:flex-row">
        <div className="flex-1 flex flex-col gap-4">
          <h4 className="text-3xl font-bold mb-1">
            {blogData.title}
          </h4>

          <p className="text-neutral-500">
            {blogData.para1}
          </p>

          <div
            style={{ backgroundColor: "rgb(244, 246, 252)" }}
            className=" rounded-xl flex py-2"
          >
            <div className="flex px-3 gap-2 items-center border-r-2 border-neutral-300">
              <div className="h-9 w-9 relative rounded-full">
                <img
                  className="h-full w-full absolute rounded-full object-cover"
                  src={user.imgURL}
                  alt={user.name}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{user.name}</span>
                <span className="text-xs text-neutral-500">{user.time}</span>
              </div>
            </div>
          </div>

          <div className="h-[45vh] w-full relative rounded-lg">
            <img
              className="h-full w-full absolute object-cover rounded-lg"
              src={img1}
              alt="blog img"
            />
          </div>

          <p className="text-neutral-500 text-sm">
            {blogData.para2}
          </p>

          <h2 className="text-2xl font-semibold p-2 border-l leading-tight">If You Are Still Looking For That One Person Who Will Hnage Your Life, Take A Look In The Mirror.Roman Price</h2>
        
          <p className="text-sm">{blogData.para3}</p>
        </div>
        <div className="lg:w-[35%] md:w-[38%] sm:w-[50%] mx-auto flex flex-col gap-7">
            <SubscribeBox />
            <Socials />
        </div>
      </div>
      <MorePosts />
    </div>
  );
};

export default landingpage;
