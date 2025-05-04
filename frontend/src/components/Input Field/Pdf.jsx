// Importing React Icons
import { forwardRef, useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useUploadBrouchureMutation } from "../../services/course.api";
import { useSelector } from "react-redux";

const Pdf = forwardRef(
  ({ id, onChange = () => {}, setvalue, ...rest }, ref) => {
    const [file, setFile] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [error, setError] = useState("");

    const { accessToken } = useSelector((store) => store.auth);

    const [uploadBrouchure, { isLoading, isError, error: uploadError }] =
      useUploadBrouchureMutation();

    const uploadPdf = async (file) => {
      try {
        const formData = new FormData();
        formData.append("brouchure", file);
        const result = await uploadBrouchure({
          formData,
          accessToken,
        }).unwrap();
        const brouchureUrl = result?.data?.url;
        setvalue("brouchure", brouchureUrl);
      } catch (err) {
        console.error("Upload failed", err);
      }
    };

    const handleFileChange = async (event) => {
      const uploadedFile = event.target.files[0];
      if (uploadedFile && uploadedFile.type === "application/pdf") {
        const maxSize = 5 * 1024 * 1024; // maximum 5MB
        const allowedTypes = ["application/pdf"];

        if (!allowedTypes.includes(uploadedFile.type)) {
          setError("Only pdf file is allowed.");
          event.target.value = "";
          return;
        }

        if (uploadedFile.size > maxSize) {
          setError("File size should not exceed 5MB.");
          event.target.value = "";
          return;
        }
        setError("");
        setFile(uploadedFile);
        await uploadPdf(uploadedFile);
      } else {
        setError("Please upload a valid PDF file.");
      }
    };

    const removePdf = () => {
      setFile(null);
      setPdfUrl(null);
      if (ref?.current) {
        ref.current.value = ""; // Reset the input field
      }
    };

    useEffect(() => {
      if (file) {
        const url = URL.createObjectURL(file);
        setPdfUrl(url);
        return () => URL.revokeObjectURL(url); // Clean up when component unmounts
      }
    }, [file]);

    return (
      <div>
        <label
          htmlFor={id}
          className="text-gray-500 flex flex-col items-center justify-center w-[15rem] py-2 h-fit border-2 border-dashed border-gray-300 cursor-pointer"
        >
          <AiOutlineCloudUpload size={30} />
          <p>Upload pdf</p>
        </label>
        <input
          hidden
          id={id}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          ref={ref}
          {...rest}
        />
        {error && <p className="text-red-600 text-xs mt-1 ml-1">{error}</p>}
        {(!isLoading && file) && <p className="text-green-600">Uploaded: {file?.name}</p>}
        {isLoading && <div className="text-green-500">Uploading...</div>}
      </div>
    );
  }
);

export default Pdf;
