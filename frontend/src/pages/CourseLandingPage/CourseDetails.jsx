import React from 'react'
import { FaStar } from "react-icons/fa6";
import { IoInformationCircleOutline } from "react-icons/io5";

const CourseDetails = () => {
  return (
    <div className="bg-white lg:px-8 px-12 py-4 w-[calc(100%+96px)] -mx-12 lg:w-[calc(100%-96px)] lg:absolute bottom-0 left-0 right-0 transform lg:translate-y-1/2 lg:mx-auto rounded-md shadow-md flex lg:items-center flex-col lg:flex-row">
            <div className="lg:border-r border-neutral-300 lg:w-1/5 h-14">
                <div className="w-full">
                    <span className="text-sm font-semibold underline">12 Course Series</span>
                    <p className="text-xs text-neutral-600">Earn a career credential that demonstrates your expertise</p>
                </div>
            </div>

            <div className="lg:border-r border-neutral-300 lg:w-1/5 h-14 lg:px-4 flex flex-col justify-center">
                <div className="flex items-center gap-2">
                    <span className="font-semibold">4.6 </span>
                    <FaStar className="text-primary" />
                </div>
                <span className="text-xs text-neutral-600">(55 reviews)</span>
            </div>

            <div className="lg:border-r border-neutral-300 lg:w-1/5 h-14 lg:px-4 flex flex-col justify-center">
                <span className="text-sm font-semibold">Beginner level</span>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-600">Recommended experience</span>
                    <IoInformationCircleOutline />
                </div>
            </div>
            
            <div className="lg:border-r border-neutral-300 lg:w-1/5 h-14 lg:px-4 flex flex-col justify-center">
                <span className="text-sm font-semibold">9 months</span>
                <span className="text-xs text-neutral-600">at 10 hours a week</span>
            </div>

            
            <div className="lg:w-1/5 h-14 lg:px-4 flex flex-col justify-center">
                <span className="text-sm font-semibold">Flexible schedule</span>
                <span className="text-xs text-neutral-600">Learn at your own pace</span>
            </div>

        </div>
  )
}

export default CourseDetails
