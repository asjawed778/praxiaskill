import { Outlet } from "react-router-dom";
import CourseContents from "./CourseContents";

const CoursePlayer = () => {
  return (
    <div>
      <h1>Course Player</h1>
      <CourseContents />
      <Outlet /> {/* Renders the nested route component */}
    </div>
  );
};

export default CoursePlayer;
