import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { createPortal } from "react-dom";

const VideoDeletePopUp = ({ videoName, setOpenDeletePopUp }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={() => setOpenDeletePopUp(false)}></div>
      <div className="relative flex flex-col bg-white rounded shadow-lg w-96 h-48 z-50">
        <div className="flex justify-between items-center px-4 py-2 border-b border-neutral-100">
          <p>Delete {videoName} Video</p>
          <div
            className="w-6 h-6 flex justify-center items-center cursor-pointer rounded-full hover:bg-neutral-100 transition duration-300"
            onClick={() => setOpenDeletePopUp(false)}
          >
            <RxCross2 />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-3 items-center justify-center">
          <p className="text-sm">Do you want to delete {videoName}?</p>
          <div className="flex gap-5 justify-center">
            <button
              type="button"
              onClick={() => setOpenDeletePopUp(false)}
              className="px-4 py-1 border border-neutral-300 rounded-md cursor-pointer hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default VideoDeletePopUp;