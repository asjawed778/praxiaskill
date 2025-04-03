import React from 'react'

const Overview = ({courseContent}) => {
    const courseTitle = courseContent?.title
  return (
    <div className='mt-5'>
        <h2 className='text-xl font-semibold'>
            {courseTitle}
        </h2>
        <div className='h-96 text-neutral-500 flex justify-center items-center'>
            Overview
        </div>
    </div>
  )
}

export default Overview
