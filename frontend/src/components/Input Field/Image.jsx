// Importing React Icons
import { RxCross2 } from "react-icons/rx";
import { forwardRef, useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useUploadThumbnailMutation } from "../../services/course.api";
import { useSelector } from "react-redux";

const Image = forwardRef(
  ({ id, onChange = () => {}, setvalue, ...rest }, ref) => {
    const [image, setImage] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState("");
    const { accessToken } = useSelector((store) => store.auth);

    const [uploadThumbnail, { isLoading, isError, error: uploadError }] =
      useUploadThumbnailMutation();

    useEffect(() => {
      return () => {
        if (image) {
          URL.revokeObjectURL(image); // Cleanup when component unmounts
        }
      };
    }, [image]);

    const uploadImage = async (file) => {
      try {
        const formData = new FormData();
        formData.append("thumbnail", file);
        const result = await uploadThumbnail({
          formData,
          accessToken,
        }).unwrap();
        const thumbnailUrl = result?.data?.url;
        setvalue("thumbnail", thumbnailUrl);
      } catch (err) {
        console.error("Upload failed", err);
      }
    };

    const handleImageChange = async (event) => {
      const file = event.target.files?.[0];
      if (file) {
        const maxSize = 5 * 1024 * 1024; // maximum 5MB
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

        if (!allowedTypes.includes(file.type)) {
          setError("Only JPG, JPEG, and PNG files are allowed.");
          event.target.value = "";
          return;
        }

        if (file.size > maxSize) {
          setError("File size should not exceed 5MB.");
          event.target.value = "";
          return;
        }

        setError(""); //if the file is valid then clear
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
        onChange(event); // Call the external onChange if needed

        await uploadImage(file);
      }
    };

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const removeImage = () => {
      if (image) {
        URL.revokeObjectURL(image); //Clean up the blog URL
      }
      setImage(null);
      if (ref && ref.current) {
        ref.current.value = ""; //reset file input
      }
    };

    return (
      <>
          <div>
            <label
              htmlFor={id}
              className="text-gray-500 flex flex-col items-center justify-center w-[15rem] py-2 h-fit border-2 border-dashed border-gray-300 cursor-pointer"
            >
              <AiOutlineCloudUpload size={30} />
              <p>Upload image</p>
            </label>
            <input
              hidden
              id={id}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={ref}
              {...rest}
            />
            {error && <p className="text-red-600 text-xs mt-1 ml-1">{error}</p>}
          </div>
        {isLoading && <div className="text-green-500">Uploading...</div>}
        {!isLoading && image && <div className="text-green-500">Uploaded</div>}
      </>
    );
  }
);

export default Image;
