import React from 'react'
import { GoHome } from 'react-icons/go'
import { RiArrowRightWideLine } from 'react-icons/ri'

const Heading = () => {
  return (
    <div className="flex gap-3 items-center">
        <GoHome size={20} />
        <RiArrowRightWideLine color="grey" size={20}  />
        <h1 className="text-gray-600 font-semibold">Course</h1>
        <RiArrowRightWideLine color="grey" size={20}  />
        <h1 className="text-neutral-500 font-semibold text-xs">
          Full Stack development
        </h1>
      </div>
  )
}

export default Heading
