import React from "react";
import logo from "/logopng.png";
import { RxCross2 } from "react-icons/rx";
import { GiWaterDrop } from "react-icons/gi";
import { Link } from "react-router-dom";
import { MdLibraryBooks } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";


const UserIcon = ({ user, setShowUserMenu, showUserMenu, handleLogout }) => {
  return (
    <div
      className="h-9 w-9 rounded-full cursor-pointer relative"
      onClick={() => setShowUserMenu(true)}
    >
      <img
        src={user?.profilePic}
        alt={user?.name}
        className="h-full w-full rounded-full"
      />
      <div
        style={{ zIndex: "1000" }}
        className={`${
          showUserMenu ? "" : "hidden"
        } min-w-[270px] bg-white shadow-md cursor-default absolute right-0 top-16 z-50 p-1 rounded-md`}
      >
        <div className="flex justify-end absolute right-2">
          <div className="text-white z-10 relative -top-3 -right-2">
            <GiWaterDrop />
          </div>
          <div
            className=" hover:bg-neutral-100 text-neutral-500 cursor-pointer rounded-full relative"
            onClick={(e) => {
              e.stopPropagation();
              setShowUserMenu(false);
            }}
          >
            <RxCross2 />
          </div>
        </div>

        <div>
          <div className="mt-4 flex items-center gap-3 p-1 pb-3">
            <div className="h-12 w-12 rounded-ful" title={user?.name}>
              <img
                src={user?.profilePic}
                alt={user?.name}
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <h2 className="text-primary font-semibold text-[14px]">
                {user?.name}
              </h2>
              <span className="text-[10px] font-normal text-neutral-600">
                {user?.email}
              </span>
            </div>
          </div>
            <div className="flex flex-col gap-0.5 text-neutral-700 font-normal mb-1 border-t border-neutral-300">
              {user?.role === "USER" && <Link to="/my-courses">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowUserMenu(false);
                  }}
                  className="p-2 hover:bg-neutral-300 hover:text-black cursor-pointer flex gap-3 items-center"
                >
                  <div className="h-8 w-8 flex justify-center items-center bg-neutral-200 rounded-full text-primary">
                    <MdLibraryBooks />
                  </div>
                  <span>
                    My courses
                  </span>
                </div>
              </Link>}
              <div
                onClick={handleLogout}
                className="p-2 hover:bg-neutral-300 hover:text-black cursor-pointer flex gap-3 items-center"
              >
                <div className="h-8 w-8 flex justify-center items-center bg-neutral-200 rounded-full text-primary">
                    <BiLogOut />
                  </div>
                  <span>
                    Sign out
                  </span>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserIcon;
