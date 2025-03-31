
import React, { useEffect, useState } from "react";
import {
  useChunkUploadMutation,
  useCompleteUploadMutation,
  useStartUploadMutation,
} from "../../../../../../services/course.api";
import { toast } from "react-hot-toast";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete, MdOutlineDelete } from "react-icons/md";
import VideoDeletePopUp from "../VideoDeletePopUp";
import { createPortal } from "react-dom";

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks
const allowedVideoTypes = [
  "video/mp4",
  "video/mov",
  "video/avi",
  "video/mkv",
  "video/webm",
  "video/flv",
  "video/wmv",
];

const VideoUploader = ({
  courseId,
  sectionId,
  subSectionId,
  courseTitle,
  video,
}) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const uniqueInputId = `videoUploader-${sectionId}-${subSectionId}`;

  const [uploadParts, setUploadParts] = useState([]);
  const [ videoName, setVideoName] = useState(null)
  const [openDeletePopUp, setOpenDeletePopUp] = useState(false);

  const [startUpload] = useStartUploadMutation();
  const [chunkUpload] = useChunkUploadMutation();
  const [completeUpload] = useCompleteUploadMutation();

  const handleUpload = async () => {
    if (!file) return;

    try {
      // step 1
      const startResponse = await startUpload({
        courseId,
        sectionId,
        subSectionId,
        fileName: file.name,
        fileType: file.type,
        courseTitle,
      }).unwrap();

      if (startResponse.success === false) {
        toast.error(startResponse?.message);
        return;
      }

      const { uploadId, fileKey } = startResponse.data;

      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
      let parts = [];

      for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(file.size, start + CHUNK_SIZE);
        const chunk = file.slice(start, end);

        // Build formData for the chunk.
        const formData = new FormData();
        formData.append("chunk", chunk);
        formData.append("uploadId", uploadId);
        formData.append("fileKey", fileKey);
        formData.append("partNumber", i + 1);

        // step 2
        const chunkResponse = await chunkUpload({
          courseId,
          sectionId,
          subSectionId,
          formData,
        }).unwrap();

        if (chunkResponse.success === false) {
          toast.error(chunkResponse.message);
          return;
        }

        parts.push({
          ETag: chunkResponse.data.ETag,
          PartNumber: chunkResponse.data.PartNumber,
        });

        setUploadProgress(Math.round(((i + 1) / totalChunks) * 100));
      }

      // Step 3: Complete the upload.
      const completeResponse = await completeUpload({
        courseId,
        sectionId,
        subSectionId,
        uploadId,
        fileKey,
        parts,
      }).unwrap();

      if (completeResponse.success) {
        toast.success("Upload complete!");
        setVideoName(extractVideoName(completeResponse?.data?.data.Key))
      } else {
        toast.error(completeResponse.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed.");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && allowedVideoTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      toast.error(
        "Unsupported video type. Please select a supported video file."
      );
    }
  };

  useEffect(() => {
    if (file) {
      handleUpload();
    }
  }, [file]);

  const extractVideoName  = (link) => {
    if(link){
      const lastSegment = link.split("/").pop()
      return lastSegment.split("-")[0]
    }
    return ""
  }

  return (
    <div className="">
      <p className="mb-2">Content Video</p>
      <label
        htmlFor={uniqueInputId}
        className="text-gray-500 flex flex-col items-center justify-center w-[15rem] py-2 h-fit border-2 border-dashed border-gray-300 cursor-pointer"
      >
        {videoName || video? (
          <div className="flex flex-col gap-3 px-2 w-full">
            <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {videoName || extractVideoName(video.link)}
            </p>
            <div onClick={() => setOpenDeletePopUp(true)} className="flex gap-0.5 text-red-500 items-center justify-end hover:text-red-600">
              <MdDelete />
              <span className="text-sm">Delete</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <AiOutlineCloudUpload size={30} />
            <p>Upload Video</p>
          </div>
        )}
      </label>
      <input
        id={uniqueInputId}
        hidden
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        disabled={(videoName || video) ? true : false}
      />
      {file && <p className="mt-2 text-xs">Selected file: {file.name}</p>}
      {file && (
        <p
          className={`mt-2 text-xs ${
            uploadProgress === 100 ? "text-green-500" : ""
          }`}
        >
          Upload progress: {uploadProgress}%
        </p>
      )}
      {openDeletePopUp && <VideoDeletePopUp setOpenDeletePopUp={setOpenDeletePopUp} videoName={videoName || extractVideoName(video?.link)} />}
    </div>
  );
};

export default VideoUploader;




// import React, { useEffect, useState } from "react";
// import {
//   useChunkUploadMutation,
//   useCompleteUploadMutation,
//   useStartUploadMutation,
//   // Assuming you have a delete video mutatio
// } from "../../../../../../services/course.api";
// import { toast } from "react-hot-toast";
// import { AiOutlineCloudUpload } from "react-icons/ai";
// import { MdDelete } from "react-icons/md";
// import VideoDeletePopUp from "../VideoDeletePopUp";
// import { createPortal } from "react-dom";

// const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks
// const allowedVideoTypes = [
//   "video/mp4",
//   "video/mov",
//   "video/avi",
//   "video/mkv",
//   "video/webm",
//   "video/flv",
//   "video/wmv",
// ];

// const VideoUploader = ({
//   courseId,
//   sectionId,
//   subSectionId,
//   courseTitle,
//   video,
// }) => {
//   const [file, setFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const uniqueInputId = `videoUploader-${sectionId}-${subSectionId}`;

//   const [uploadParts, setUploadParts] = useState([]);
//   const [videoName, setVideoName] = useState(null);
//   const [openDeletePopUp, setOpenDeletePopUp] = useState(false);

//   const [startUpload] = useStartUploadMutation();
//   const [chunkUpload] = useChunkUploadMutation();
//   const [completeUpload] = useCompleteUploadMutation();
//   // Delete mutation (if available)
//   // const [deleteVideo] = useDeleteVideoMutation();

//   const handleUpload = async () => {
//     if (!file) return;

//     try {
//       // Step 1: Start upload
//       const startResponse = await startUpload({
//         courseId,
//         sectionId,
//         subSectionId,
//         fileName: file.name,
//         fileType: file.type,
//         courseTitle,
//       }).unwrap();

//       if (!startResponse.success) {
//         toast.error(startResponse?.message);
//         return;
//       }

//       const { uploadId, fileKey } = startResponse.data;
//       const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
//       let parts = [];

//       for (let i = 0; i < totalChunks; i++) {
//         const start = i * CHUNK_SIZE;
//         const end = Math.min(file.size, start + CHUNK_SIZE);
//         const chunk = file.slice(start, end);

//         const formData = new FormData();
//         formData.append("chunk", chunk);
//         formData.append("uploadId", uploadId);
//         formData.append("fileKey", fileKey);
//         formData.append("partNumber", i + 1);

//         // Step 2: Upload chunk
//         const chunkResponse = await chunkUpload({
//           courseId,
//           sectionId,
//           subSectionId,
//           formData,
//         }).unwrap();

//         if (!chunkResponse.success) {
//           toast.error(chunkResponse.message);
//           return;
//         }

//         parts.push({
//           ETag: chunkResponse.data.ETag,
//           PartNumber: chunkResponse.data.PartNumber,
//         });

//         setUploadProgress(Math.round(((i + 1) / totalChunks) * 100));
//       }

//       // Step 3: Complete the upload.
//       const completeResponse = await completeUpload({
//         courseId,
//         sectionId,
//         subSectionId,
//         uploadId,
//         fileKey,
//         parts,
//       }).unwrap();

//       if (completeResponse.success) {
//         toast.success("Upload complete!");
//         setVideoName(extractVideoName(completeResponse?.data?.data.Key));
//       } else {
//         toast.error(completeResponse.message);
//       }
//     } catch (error) {
//       console.error("Upload error:", error);
//       toast.error("Upload failed.");
//     }
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile && allowedVideoTypes.includes(selectedFile.type)) {
//       setFile(selectedFile);
//     } else {
//       toast.error("Unsupported video type. Please select a supported video file.");
//     }
//   };

//   useEffect(() => {
//     if (file) {
//       handleUpload();
//     }
//   }, [file]);

//   const extractVideoName = (link) => {
//     if (link) {
//       const lastSegment = link.split("/").pop();
//       return lastSegment.split("-")[0];
//     }
//     return "";
//   };

//   // Handler for deleting the video via API call.
//   const handleDeleteVideo = async () => {
//     // try {
//     //   const response = await deleteVideo({
//     //     courseId,
//     //     sectionId,
//     //     subSectionId,
//     //   }).unwrap();
//     //   if (response.success) {
//     //     toast.success("Video deleted successfully");
//     //   } else {
//     //     toast.error(response.message);
//     //   }
//     // } catch (error) {
//     //   toast.error("Error deleting video");
//     // }
//     // setOpenDeletePopUp(false);
//   };

//   return (
//     <div>
//       <p className="mb-2">Content Video</p>
//       <label
//         htmlFor={uniqueInputId}
//         className="text-gray-500 flex flex-col items-center justify-center w-[15rem] py-2 h-fit border-2 border-dashed border-gray-300 cursor-pointer"
//       >
//         {videoName || video ? (
//           <div className="flex flex-col gap-3 px-2 w-full">
//             <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
//               {videoName || extractVideoName(video.link)}
//             </p>
//             <div
//               className="flex gap-0.5 text-red-500 items-center justify-end hover:text-red-600 cursor-pointer"
//               onClick={() => setOpenDeletePopUp(true)}
//             >
//               <MdDelete />
//               <span className="text-sm">Delete</span>
//             </div>
//           </div>
//         ) : (
//           <div className="flex flex-col items-center">
//             <AiOutlineCloudUpload size={30} />
//             <p>Upload Video</p>
//           </div>
//         )}
//       </label>
//       <input
//         id={uniqueInputId}
//         hidden
//         type="file"
//         accept="video/*"
//         onChange={handleFileChange}
//         disabled={videoName || video ? true : false}
//       />
//       {file && <p className="mt-2 text-xs">Selected file: {file.name}</p>}
//       {file && (
//         <p className={`mt-2 text-xs ${uploadProgress === 100 ? "text-green-500" : ""}`}>
//           Upload progress: {uploadProgress}%
//         </p>
//       )}
//       {/* Conditionally render the delete popup */}
//       {openDeletePopUp && (
//         <VideoDeletePopUp
//           onClose={() => setOpenDeletePopUp(false)}
//           onDelete={handleDeleteVideo}
//           videoName={videoName || extractVideoName(video.link)}
//         />
//       )}
//     </div>
//   );
// };

// export default VideoUploader;



