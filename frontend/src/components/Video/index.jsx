import React, { useEffect, useState } from "react";
import {
  useChunkUploadMutation,
  useCompleteUploadMutation,
  useStartUploadMutation,
} from "../../services/course.api";
import { toast } from "react-hot-toast";
import { AiOutlineCloudUpload } from "react-icons/ai";

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

const VideoUploader = ({ courseId, sectionId, subSectionId, courseTitle }) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [uploadParts, setUploadParts] = useState([]);

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

  return (
    <div className="">
      <p>Content Video</p>
      <label
        htmlFor="videoUploader"
        className="text-gray-500 flex flex-col items-center justify-center w-[15rem] py-2 h-fit border-2 border-dashed border-gray-300 cursor-pointer"
      >
        <AiOutlineCloudUpload size={30} />
        <p>Upload Video</p>
      </label>
      <input
        id="videoUploader"
        hidden
        type="file"
        accept="video/*"
        onChange={handleFileChange}
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
    </div>
  );
};

export default VideoUploader;
