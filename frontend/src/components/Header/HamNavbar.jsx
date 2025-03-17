import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HamNavbar({ handleLogout }) {
  const location = useLocation(); // Hook to access the current location
  const { accessToken } = useSelector((store) => store.auth);

  // useState
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // useEffect
  useEffect(() => {
    const handleResize = () => {
      // Check if the window width exceeds 768px (or your desired breakpoint)
      if (window.innerWidth > 768) {
        setIsMenuOpen(false); // Close the menu when the width is greater than 768px
      }
    };

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }

    // Cleanup function to reset the overflow style when the component unmounts or the menu closes
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleHamLogout = async () => {
    try {
      await handleLogout();

      setIsMenuOpen(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  if (!isMenuOpen)
    return (
      <button onClick={() => setIsMenuOpen(true)}>
        <GiHamburgerMenu className="size-8" />
      </button>
    );
  else
    return (
      <div className="z-999999 fixed top-0 left-0 bg-white flex flex-col gap-10 h-lvh w-lvw /px-1 py-5">
        <button onClick={() => setIsMenuOpen(false)} className="ml-auto px-5">
          <RxCross1 className="size-8" />
        </button>

        <div className="text-xl flex flex-col items-center justify-between gap-3">
          <div className="relative flex flex-col w-full">
            <CiSearch className="absolute left-12 top-3 size-6 text-[var(--color-primary)]" />
            <input
              type="text"
              placeholder="Type to search"
              className="font-normal text-lg pl-10 px-2 py-2 mx-10 border rounded-md outline-none"
            />
          </div>

          <Link
            to="/courses"
            className="text-center text-[var(--color-primary)] active:text-white active:bg-[var(--color-primary)] w-full px-5 py-3 duration-200"
          >
            Learning
          </Link>

          {/* <Link
            to="/blog"
            className="text-center text-[var(--color-primary)] active:text-white active:bg-[var(--color-primary)] w-full px-5 py-3 duration-200"
          >
            Blog
          </Link> */}

          <Link
            to="/contact-us"
            className="text-center text-[var(--color-primary)] active:text-white active:bg-[var(--color-primary)] w-full px-5 py-3 duration-200"
          >
            Contact Us
          </Link>

          {accessToken ? (
            <button
              onClick={handleHamLogout}
              className="text-center text-[var(--color-primary)] active:text-white active:bg-[var(--color-primary)] w-full px-5 py-3 duration-200"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              className="text-center text-[var(--color-primary)] active:text-white active:bg-[var(--color-primary)] w-full px-5 py-3 duration-200"
            >
              Login/Signup
            </Link>
          )}

          <a
            href="tel:+919123735554"
            className="cursor-pointer text-center text-[var(--color-primary)] active:text-white active:bg-[var(--color-primary)] w-full px-5 py-3 duration-200"
          >
            +91 91237 35554
          </a>
        </div>
      </div>
    );
}
