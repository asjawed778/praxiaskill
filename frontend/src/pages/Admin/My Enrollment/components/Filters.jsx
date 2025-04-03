import React from 'react'
import { IoSearch} from "react-icons/io5";
import Dropdown from '../../../../components/Dropdown/Dropdown';


const Filters = ({register, setValue}) => {
  return (
    <div className="w-full flex gap-4 text-sm flex-wrap">
        <div className="flex items-center gap-2 border border-neutral-300 px-1 rounded-lg text-neutral-500 flex-1">
          <IoSearch />
          <input
            type="text"
            className="outline-0 flex-1 px-2 py-2"
            placeholder="Search Courses..."
          />
        </div>
        <button
          type="button"
          onClick={() => setValue("category", "")}
          className="px-4 rounded-lg border border-neutral-300 w-fit cursor-pointer hover:bg-primary hover:text-white active:bg-primary-hover"
        >
          Clear
        </button>
        <Dropdown
          className="w-60 text-center cursor-pointer"
          placeholder="All Category"
          endpoint={"course/category"}
          showLabel={false}
          {...register("category")}
        />
      </div>
  )
}

export default Filters
