import React from 'react'
import { GoHome } from 'react-icons/go'
import { RiArrowRightWideLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

const Heading = ({specificCourse}) => {
  const navigate = useNavigate()
  return (
    <div className="flex gap-3 items-center mt-2">
        <GoHome className='cursor-pointer' onClick={() => navigate("/")} size={20} />
        <RiArrowRightWideLine color="grey" size={20}  />
        <h1 onClick={() => navigate("/courses")} className="text-gray-600 font-semibold cursor-pointer">Courses</h1>
        <RiArrowRightWideLine color="grey" size={20}  />
        <h1 className="text-neutral-500 font-semibold text-xs cursor-pointer">
         {specificCourse?.title}
        </h1>
      </div>
  )
}

export default Heading
