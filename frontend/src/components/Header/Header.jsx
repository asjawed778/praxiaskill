import logo from "/logopng.png";
import { CiSearch } from "react-icons/ci";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { logout } from "../../store/reducers/authReducer";
import HamNavbar from "./HamNavbar";
import { useLogoutMutation } from "../../services/auth.api";
import { RxCross2 } from "react-icons/rx";
import { GiWaterDrop } from "react-icons/gi";
import { useState } from "react";
import { BiLogOut } from "react-icons/bi";

export default function Header() {
  const { accessToken, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutUser, { isLoading, error }] = useLogoutMutation();

  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = async () => {
    try {
      if (!accessToken) {
        localStorage.clear();
      }

      const result = await logoutUser(accessToken);
      if (result?.error) {
        localStorage.clear();
        dispatch(logout())
        navigate("/")
        throw new Error(JSON.stringify(result.error));
      }
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      console.log(err)
      const error = JSON.parse(err?.message);
      toast.error(error.data.message);
    }
  };

  return (
    <nav className="flex w-full items-center gap-10 h-[4.5rem] py-4 px-10 sm:px-20 md:px-10">
      {/* Logo */}
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className=" lg:w-[200px] md:w-[170px] w-[200px] h-auto"
        />
        {/* <img
          src={logo}
          alt="logo"
          className=" lg:w-[200px] md:w-[170px] min-w-[150px] h-[45px]"
        /> */}
      </Link>

      {/* For Bigger Screen */}
      <div className="hidden w-full  font-bold md:flex space-x-16">
        {/* Second Section */}
        {/* search bar temporarily deactivated */}
        {/* <div className="relative">
          <CiSearch className="absolute left-2 top-3 size-6 text-[var(--color-primary)]" />
          <input
            type="text"
            placeholder="Type to search"
            className="font-normal text-lg pl-10 px-2 py-2 border rounded-md outline-none"
          />
        </div> */}

        {/* Third Section */}
        <div className="flex items-center justify-between w-full  font-semibold text-[var(--primary-heading-color)] text-sm">
          <div className="flex items-center gap-5">
            <Link to="/courses">Learning</Link>

            {/* <Link to="/blog">Blog</Link> */}

            <Link to="">Contact Us</Link>
          </div>

          <div className="flex items-center gap-5">
            {accessToken ? (
              // <button onClick={handleLogout} className="cursor-pointer">
              //   Logout
              // </button>
              ""
            ) : (
              <Link to="/auth" className="cursor-pointer">
                Login/Signup
              </Link>
            )}

            <a href="tel:+919123735554" className="cursor-pointer">
              +91 91237 35554
            </a>

            {accessToken ? <div className="h-9 w-9 rounded-full cursor-pointer relative" onClick={() => setShowUserMenu(true)}>
              <img src={user?.profilePic} alt={user?.name} className="h-full w-full rounded-full" />
              <div className={`${showUserMenu ? "" : "hidden"} w-[90px] bg-primary-hover cursor-default absolute right-0 top-12 z-50 p-1 rounded-md`}>
                <div className="flex justify-end">
                    <div className="text-primary-hover relative -top-3 -right-2">
                      <GiWaterDrop />
                    </div>
                    <div className="text-white hover:bg-primary-active cursor-pointer rounded-full" onClick={(e) =>{e.stopPropagation(); setShowUserMenu(false)}}>
                      <RxCross2 />
                    </div>
                </div>
                <div className="mt-2 text-white cursor-pointer hover:border-b rounded-md">
                  <div onClick={handleLogout} className="flex items-center justify-between pb-1 px-1.5">
                    <BiLogOut size={18} />
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            </div> : null}
          </div>
        </div>
      </div>

      {/* For Small Screen */}
      <div className="font-bold md:hidden ml-auto">
        <HamNavbar handleLogout={handleLogout} />
      </div>
    </nav>
  );
}
