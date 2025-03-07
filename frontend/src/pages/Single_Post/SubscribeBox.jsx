import React from 'react'
import { HiOutlineEnvelope } from "react-icons/hi2";
import { IoIosArrowRoundForward } from "react-icons/io";

const SubscribeBox = () => {
  return (
    <div className='w-full border-2 border-neutral-200 rounded-2xl'>
      <div className='border-b border-neutral-200 p-2.5 flex gap-2 items-center'>
        <HiOutlineEnvelope />
        <span className='text-sm font-semibold'>Stay up to date</span>
      </div>
      <div className='p-2.5 flex flex-col gap-3'>
        <p className='text-xs text-neutral-700 font-semibold'>Get notified when I publish something new, and unsubscribe at any time.</p>
        <div className='flex justify-between items-center rounded-xl border-2 border-neutral-200 pl-2 pr-1 py-0.5 text-xs'>
            <input className='outline-0' placeholder='Enter your email' type="text" name="" id="" />
            <div className='h-7 w-7 flex justify-center items-center rounded-full p-1 text-white text-2xl hover:bg-neutral-700 bg-black'>
                <IoIosArrowRoundForward />
            </div>
        </div>
      </div>
    </div>
  )
}

export default SubscribeBox
