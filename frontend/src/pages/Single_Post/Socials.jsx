import React from "react";
import { LuSatellite } from "react-icons/lu";
import fb from "/imgs/single_post/fb.svg";
import threads from "/imgs/single_post/threads-icon.svg";
import tiktok from "/imgs/single_post/tiktok.svg";
import x from "/imgs/single_post/x.svg";
import { Link } from "react-router-dom";

const Socials = () => {
  return (
    <div className="w-full border-2 border-neutral-200 rounded-2xl">
      <div className="border-b border-neutral-200 p-2.5 flex gap-2 items-center">
        <LuSatellite />
        <span className="text-sm font-semibold">We are on social</span>
      </div>
      <div className="p-2 grid grid-cols-2 gap-y-6 gap-x-2">
        {/* facebook  */}
        <Link to={"#"}>
          <div className="flex items-center gap-2">
            <div
              style={{ backgroundColor: "rgb(244, 246, 252)" }}
              className="h-8 w-8 relative rounded-full p-0.5"
            >
              <img
                className="h-full w-full rounded-full object-cover"
                src={fb}
                alt="Facebook"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold">Facebook</span>
              <span className="text-[10px] text-neutral-500 line-clamp-1">
                Follow us on Facebook
              </span>
            </div>
          </div>
        </Link>

        {/* tweeter */}
        <Link to={"#"}>
          <div className="flex items-center gap-2">
            <div
              style={{ backgroundColor: "rgb(244, 246, 252)" }}
              className="h-8 w-8 relative rounded-full p-1"
            >
              <img
                className="h-full w-full rounded-full object-cover"
                src={x}
                alt="X"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold">X</span>
              <span className="text-[10px] text-neutral-500 line-clamp-1">
                Follow us on X
              </span>
            </div>
          </div>
        </Link>

        {/* threads  */}
        <Link to={"#"}>
          <div className="flex items-center gap-2">
            <div
              style={{ backgroundColor: "rgb(244, 246, 252)" }}
              className="h-8 w-8 relative rounded-full p-1.5"
            >
              <img
                className="h-full w-full rounded-full object-cover"
                src={threads}
                alt="Threads"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold">Threads</span>
              <span className="text-[10px] text-neutral-500 line-clamp-1">
                Follow us on Threads
              </span>
            </div>
          </div>
        </Link>

        {/* tiktok  */}
        <Link to={"#"}>
          <div className="flex items-center gap-2">
            <div
              style={{ backgroundColor: "rgb(244, 246, 252)" }}
              className="h-8 w-8 relative rounded-full p-1"
            >
              <img
                className="h-full w-full rounded-full object-cover"
                src={tiktok}
                alt="Tik Tok"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold">Tiktok</span>
              <span className="text-[10px] text-neutral-500 line-clamp-1">
                Follow us on Tiktok
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Socials;
