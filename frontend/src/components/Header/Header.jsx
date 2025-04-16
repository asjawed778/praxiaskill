import logo from "/logopng.png";
import { CiSearch } from "react-icons/ci";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { logout } from "../../store/reducers/authReducer";
import HamNavbar from "./HamNavbar";
import { useLogoutMutation } from "../../services/auth.api";
import { useEffect, useState } from "react";
import UserIcon from "./UserIcon";

export default function Header() {
  const { accessToken, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutUser, { isLoading, error }] = useLogoutMutation();

  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    try {
      if (!accessToken) {
        localStorage.clear();
      }

      const result = await logoutUser(accessToken);
      if (result?.error) {
        localStorage.clear();
        dispatch(logout());
        navigate("/");
        throw new Error(JSON.stringify(result.error));
      }
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
      const error = JSON.parse(err?.message);
      toast.error(error.data.message);
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={`sticky top-0 z-50 flex w-full items-center gap-10 h-[4.5rem] py-4 px-10 sm:px-20 md:px-10 bg-white transition-shadow duration-300 ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      {/* Logo */}
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className=" lg:w-[200px] md:w-[170px] w-[200px] h-auto sm:ml-0"
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
        <div className="flex items-center justify-between w-full  font-semibold text-[var(--primary-heading-color)] text-md">
          <div className="flex items-center gap-5">
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                `hover:text-red-800 ${
                  isActive ? "text-red-800 underline" : "text-red-600"
                }`
              }
            >
              Learning
            </NavLink>

            {/* <Link to="/blog">Blog</Link> */}

            <NavLink
              to="/contact-us"
              className={({ isActive }) =>
                `hover:text-red-800 ${
                  isActive ? "text-red-800 underline" : "text-red-600"
                }`
              }
            >
              Contact Us
            </NavLink>
          </div>

          <div className="flex items-center gap-5">
            {accessToken ? (
              // <button onClick={handleLogout} className="cursor-pointer">
              //   Logout
              // </button>
              ""
            ) : (
              <Link to="/auth" className="cursor-pointer hover:text-red-800 ">
                Login/Signup
              </Link>
            )}

            <a
              href="tel:+919123735554"
              className="cursor-pointer hover:text-red-800 "
            >
              +91 91237 35554
            </a>

            {accessToken ? (
              <UserIcon
                user={user}
                setShowUserMenu={setShowUserMenu}
                showUserMenu={showUserMenu}
                handleLogout={handleLogout}
              />
            ) : null}
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
