import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../pages/Admin/Sidebar";
import { useState, useEffect } from "react";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024); // sidebat will be always open for large screens
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true); // Ensure it's always open on large screens
      } else {
        setIsOpen(false); // Ensure it's closed on small screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial state

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full custom-scrollbar">
      <Header />
        <main className="flex-grow flex">
          {/* Left Component Admin Sidebar */}
          <div className={`h-[calc(100vh-5rem)]`}>
            <Sidebar
              location={location}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </div>

          {/* Right Component Admin Panel */}
          <div className="h-[calc(100vh-5rem)] overflow-y-auto w-full">
            <Outlet />
          </div>
        </main>
    </div>
  );
}
