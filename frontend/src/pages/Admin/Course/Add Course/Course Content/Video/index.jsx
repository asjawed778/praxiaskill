// import React, { useEffect, useState } from "react";
// import {
//   useChunkUploadMutation,
//   useCompleteUploadMutation,
//   useStartUploadMutation,
// } from "../../../../../../services/course.api";
// import { toast } from "react-hot-toast";
// import { AiOutlineCloudUpload } from "react-icons/ai";
// import { MdDelete } from "react-icons/md";
// import VideoDeletePopUp from "../VideoDeletePopUp";

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
//   const [ videoName, setVideoName] = useState(null)
//   const [openDeletePopUp, setOpenDeletePopUp] = useState(false);

//   const [startUpload] = useStartUploadMutation();
//   const [chunkUpload] = useChunkUploadMutation();
//   const [completeUpload] = useCompleteUploadMutation();

//   const handleUpload = async () => {
//     if (!file) return;

//     try {
//       // step 1
//       const startResponse = await startUpload({
//         courseId,
//         sectionId,
//         subSectionId,
//         fileName: file.name,
//         fileType: file.type,
//         courseTitle,
//       }).unwrap();

//       if (startResponse.success === false) {
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

//         // Build formData for the chunk.
//         const formData = new FormData();
//         formData.append("chunk", chunk);
//         formData.append("uploadId", uploadId);
//         formData.append("fileKey", fileKey);
//         formData.append("partNumber", i + 1);

//         // step 2
//         const chunkResponse = await chunkUpload({
//           courseId,
//           sectionId,
//           subSectionId,
//           formData,
//         }).unwrap();

//         if (chunkResponse.success === false) {
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
//         setVideoName(extractVideoName(completeResponse?.data?.data.Key))
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
//       toast.error(
//         "Unsupported video type. Please select a supported video file."
//       );
//     }
//   };

//   useEffect(() => {
//     if (file) {
//       handleUpload();
//     }
//   }, [file]);

//   const extractVideoName  = (link) => {
//     if(link){
//       const lastSegment = link.split("/").pop()
//       return lastSegment.split("-")[0]
//     }
//     return ""
//   }

//   return (
//     <div className="">
//       <p className="mb-2">Content Video</p>
//       <label
//         htmlFor={uniqueInputId}
//         className="text-gray-500 flex flex-col items-center justify-center w-[15rem] py-2 h-fit border-2 border-dashed border-gray-300 cursor-pointer"
//       >
//         {videoName || video? (
//           <div className="flex flex-col gap-3 px-2 w-full">
//             <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
//               {videoName || extractVideoName(video.link)}
//             </p>
//             <div onClick={() => setOpenDeletePopUp(true)} className="flex gap-0.5 text-red-500 items-center justify-end hover:text-red-600">
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
//         disabled={(videoName || video) ? true : false}
//       />
//       {file && <p className="mt-2 text-xs">Selected file: {file.name}</p>}
//       {file && (
//         <p
//           className={`mt-2 text-xs ${
//             uploadProgress === 100 ? "text-green-500" : ""
//           }`}
//         >
//           Upload progress: {uploadProgress}%
//         </p>
//       )}
//       {openDeletePopUp && <VideoDeletePopUp setOpenDeletePopUp={setOpenDeletePopUp} videoName={videoName || extractVideoName(video?.link)} />}
//     </div>
//   );
// };

// export default VideoUploader;





import React, { useEffect, useState } from "react";
import {
  useChunkUploadMutation,
  useCompleteUploadMutation,
  useStartUploadMutation,
} from "../../../../../../services/course.api";
import { toast } from "react-hot-toast";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import VideoDeletePopUp from "../VideoDeletePopUp";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import { CheckCircle, Videocam } from "@mui/icons-material";

const CHUNK_SIZE = 5 * 1024 * 1024;
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
  const [videoName, setVideoName] = useState(null);
  const [openDeletePopUp, setOpenDeletePopUp] = useState(false);

  const uniqueInputId = `videoUploader-${sectionId}-${subSectionId}`;

  const [startUpload] = useStartUploadMutation();
  const [chunkUpload] = useChunkUploadMutation();
  const [completeUpload] = useCompleteUploadMutation();

  const handleUpload = async () => {
    if (!file) return;

    try {
      const startResponse = await startUpload({
        courseId,
        sectionId,
        subSectionId,
        fileName: file.name,
        fileType: file.type,
        courseTitle,
      }).unwrap();

      if (!startResponse.success) {
        toast.error(startResponse.message);
        return;
      }

      const { uploadId, fileKey } = startResponse.data;
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
      let parts = [];
      for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(file.size, start + CHUNK_SIZE);
        const chunk = file.slice(start, end);

        const formData = new FormData();
        formData.append("chunk", chunk);
        formData.append("uploadId", uploadId);
        formData.append("fileKey", fileKey);
        formData.append("partNumber", i + 1);

        const chunkResponse = await chunkUpload({
          courseId,
          sectionId,
          subSectionId,
          formData,
        }).unwrap();

        if (!chunkResponse.success) {
          toast.error(chunkResponse.message);
          return;
        }

        parts.push({
          ETag: chunkResponse.data.ETag,
          PartNumber: chunkResponse.data.PartNumber,
        });

        setUploadProgress(Math.round(((i + 1) / totalChunks) * 100));
      }

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
        setVideoName(extractVideoName(completeResponse.data.data.Key));
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
    if (file) handleUpload();
  }, [file]);

  const extractVideoName = (link) => {
    if (link) {
      const lastSegment = link.split("/").pop();
      return lastSegment.split("-")[0];
    }
    return "";
  };

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        Content Video
      </Typography>

      <input
        id={uniqueInputId}
        hidden
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        disabled={videoName || video}
      />

      {videoName || video ? (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={1}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <CheckCircle sx={{ color: "success.main", fontSize: 18 }} />
            <Typography noWrap variant="body2">
              {videoName || extractVideoName(video?.link)}
            </Typography>
          </Box>
          <IconButton
            color="error"
            size="small"
            onClick={() => setOpenDeletePopUp(true)}
          >
            <MdDelete />
          </IconButton>
        </Box>
      ) : (
        <Tooltip title="Upload Video">
          <IconButton
            color="primary"
            component="label"
            sx={{
              border: "1px dashed #ccc",
              width: 48,
              height: 48,
            }}
            htmlFor={uniqueInputId}
          >
            <Videocam />
          </IconButton>
        </Tooltip>
      )}

      {file && (
        <>
          <Typography
            variant="caption"
            sx={{
              mt: 1,
              display: "block",
              color: "text.secondary",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "150px",
            }}
          >
            {file ? `${file.name}` : ""}
          </Typography>

          <Box sx={{ mt: 1 }}>
            <LinearProgress
              variant="determinate"
              value={uploadProgress}
              sx={{ height: 6, borderRadius: 1 }}
            />
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: "block",
                color: uploadProgress === 100 ? "green" : "text.secondary",
              }}
            >
              Upload progress: {uploadProgress}%
            </Typography>
          </Box>
        </>
      )}

      {openDeletePopUp && (
        <VideoDeletePopUp
          setOpenDeletePopUp={setOpenDeletePopUp}
          videoName={videoName || extractVideoName(video?.link)}
        />
      )}
    </Box>
  );
};

export default VideoUploader;
