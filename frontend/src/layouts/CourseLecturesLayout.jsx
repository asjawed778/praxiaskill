import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

export default function CourseLecturesLayout() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
