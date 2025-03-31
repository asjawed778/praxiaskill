
import { NavLink } from "react-router-dom";

const CourseDetails = () => {
        return(
         <div className="p-2">
              {/* Navigation */}
              <nav className="flex space-x-2 sm:space-x-4 text-gray-700 border-b pb-2 ">

                <NavLink to="/coursePlayer/overview" className={({isActive}) => ` hover:text-red-500 ${isActive && "text-red-500 font-bold"}`}>Overview</NavLink>
                <NavLink to="/qna" className={({isActive}) => ` hover:text-red-500 ${isActive && "text-red-500 font-bold "}`}>Q&A</NavLink>
                <NavLink to="/notes" className={({isActive}) => ` hover:text-red-500 ${isActive && "text-red-500 font-bold "}`}>Notes</NavLink>
                <NavLink to="/announcements" className={({isActive}) => ` hover:text-red-500 ${isActive && "text-red-500 font-bold "}`}>Announcement</NavLink>
                <NavLink to="/reviews" className={({isActive}) => ` hover:text-red-500  ${isActive && "text-red-500 font-bold"}`}>Reviews</NavLink>
              </nav>
              
            </div>
    )
}
export default CourseDetails;