import { MdOutlineNoteAdd } from "react-icons/md";
import Button from "../Button/Button";

import { forwardRef, useState } from "react";

const Video = forwardRef(({ id, required = false, ...rest }, ref) => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoSrc(reader.result);
        // setIsModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVideoSrc(null);
  };

  if (isModalOpen)
    return (
      <div className="fixed w-[15rem] inset-0 bg-black/75 bg-opacity-50 flex justify-center items-center z-50">
        <div className="flex flex-col gap-5 p-4 rounded-lg">
          <video controls className="w-fit h-[40rem]">
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Button onClick={closeModal} variant="red">
            Close Preview
          </Button>
        </div>
      </div>
    );
  else
    return (
      <div className="flex flex-col w-[15rem]">
        <label
          htmlFor={id}
          className="text-gray-500 flex flex-col items-center justify-center w-[15rem] py-2 h-fit border-2 border-dashed border-gray-300 cursor-pointer"
        >
          <MdOutlineNoteAdd size={30} />
          <p>Upload or Drag file</p>
        </label>
        <input
          id={id}
          type="file"
          accept="video/*"
          required={required}
          ref={ref}
          {...rest}
          onChange={handleVideoChange}
          className="hidden p-2 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />

        {videoSrc && (
          <div className="bg-gray-300 flex flex-col justify-center items-center gap-2 p-2 /h-[13rem]">
            <video controls className="w-fit h-[10rem]">
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* <Button onClick={() => setIsModalOpen(true)} className="ml-auto">
              View
            </Button> */}
          </div>
        )}
      </div>
    );
});

export default Video;
