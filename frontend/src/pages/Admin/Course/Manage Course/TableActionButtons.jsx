import React from 'react'
import { MdEdit } from "react-icons/md";
import { RiIndeterminateCircleFill } from "react-icons/ri";
import { MdOutlineAddCircle } from "react-icons/md";
import { FaPhotoVideo } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IoClose } from "react-icons/io5";


const TableActionButtons = ({menuStyles, setOpenMenu, setMenuStyles, courses, openMenu}) => {
    const navigate = useNavigate()

    const handleCloseOnClick = () => {
        setOpenMenu(null);
        setMenuStyles({...menuStyles, display:"none"}); //to avoid flickering Action menu
    }
  return (
    <div
            style={menuStyles}
            className="absolute hidden bg-white border border-gray-200 shadow-lg rounded-lg w-40 p-2"
          >
            <div className="flex justify-between items-center pb-2">
              <span className="text-sm font-semibold text-gray-500">
                Actions
              </span>
              <button
                onClick={handleCloseOnClick}
                className="text-gray-500 text-lg p-1 hover:bg-neutral-100 rounded-full hover:text-gray-700"
              >
                <IoClose />
              </button>
            </div>
            <button
              onClick={() =>
                navigate(`/dashboard/course/content/${courses[openMenu]._id}`)
              }
              className="flex items-center w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <MdOutlineAddCircle className="mr-2" /> Add Content
            </button>
            <button
              onClick={() =>
                navigate(`/course-lecture/${courses[openMenu]._id}`)
              }
              className="flex items-center w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <FaPhotoVideo className="mr-2" /> Lectures
            </button>
            <button className="flex items-center w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 rounded-md">
              <MdEdit className="mr-2" /> Edit
            </button>
            <button className="flex items-center w-full px-3 py-2 text-sm text-left text-red-600 hover:bg-gray-100 rounded-md">
              <RiIndeterminateCircleFill className="mr-2" /> Terminate
            </button>
          </div>
  )
}

export default TableActionButtons
