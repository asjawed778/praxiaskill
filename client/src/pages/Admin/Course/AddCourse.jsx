import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../../store/reducers/adminCategoryReducer";

// import {
//   addCourse,
//   getAllCategory,
// } from "../../../services/operations/addCourses";

import {
  useAddCourseMutation,
  useGetAllCategoryQuery,
} from "../../../services/course.api";
import { toast } from "react-hot-toast";

function AddCourse() {
  const {
    data: allCotegories,
    isLoading: allCategoriesLoader,
    error: allCategoriesError,
  } = useGetAllCategoryQuery();
  const [addCourse, { isLoading: addCourseLoader, error: addCourseError }] =
    useAddCourseMutation();

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  // States
  const [courseTitle, setCourseTitle] = useState("");
  const [courseSubTitle, setCourseSubTitle] = useState("");
  const [keyPoints, setKeyPoints] = useState([]);
  const [tags, setTags] = useState([]);
  //course description
  const [value, setValue] = useState("");
  const [courseMode, setCourseMode] = useState("");
  const [courseLanguage, setCourseLanguage] = useState("");
  const [brochure, setBrochure] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  //category string
  const [selectedCategories, setSelectedCategory] = useState("");
  const [coursecontent, setCourseContent] = useState([]);
  const [savedContent, setSavedContent] = useState([]);

  // Fetch categories on component mount
  useEffect(() => {
    if (allCotegories.success) {
      dispatch(setCategories(allCotegories.categories));
    }
  }, [allCotegories]);
  // // Fetch categories on component mount
  // useEffect(() => {
  //   dispatch(getAllCategory());
  // }, [dispatch]);

  // Handle selecting a category
  const handleSelectCategory = (e) => {
    const selectedCategoryId = e.target.value; // Get selected category ID
    setSelectedCategory(selectedCategoryId); // Save it directly as a string
  };

  // Remove a selected category
  const removeCategory = (category) => {
    setSelectedCategory(selectedCategories.filter((cat) => cat !== category));
  };

  // Handle onChange for ReactQuill editor
  const handleOnChange = (content) => {
    setValue(content);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage(file);
  };

  // Handle brochure upload
  const handleBrochureUpload = (e) => {
    const file = e.target.files[0];
    if (file) setBrochure(file);
  };

  //course content

  // Handle adding a new topic
  const addTopic = () => {
    setCourseContent([
      ...coursecontent,
      { topicName: "", subtopics: [{ title: "", description: "" }] },
    ]);
  };

  // Handle topic name change
  const handleTopicChange = (index, value) => {
    const updatedContent = [...coursecontent];
    updatedContent[index].topicName = value;
    setCourseContent(updatedContent);
  };

  // Handle adding a new subtopic
  const addSubtopic = (topicIndex) => {
    const updatedContent = [...coursecontent];
    updatedContent[topicIndex].subtopics.push({ title: "", description: "" });
    setCourseContent(updatedContent);
  };

  // Handle subtopic title and description change
  const handleSubtopicChange = (topicIndex, subtopicIndex, field, value) => {
    const updatedContent = [...coursecontent];
    updatedContent[topicIndex].subtopics[subtopicIndex][field] = value;
    setCourseContent(updatedContent);
  };

  // Handle removing a subtopic
  const removeSubtopic = (topicIndex, subtopicIndex) => {
    const updatedContent = [...coursecontent];
    updatedContent[topicIndex].subtopics.splice(subtopicIndex, 1);
    setCourseContent(updatedContent);
  };

  // Handle removing a topic
  const removeTopic = (index) => {
    const updatedContent = [...coursecontent];
    updatedContent.splice(index, 1);
    setCourseContent(updatedContent);
  };

  // Save course content
  const saveContent = () => {
    setSavedContent([...savedContent, ...coursecontent]);
    setCourseContent([]); // Clear current content after saving
  };

  // form submit

  const handleSubmit = async () => {
    // Create a FormData object
    const formData = new FormData();

    // Append regular fields
    formData.append("courseTitle", courseTitle);
    formData.append("courseSubTitle", courseSubTitle);
    formData.append("courseDescription", value);
    formData.append("courseMode", courseMode);
    formData.append("courseLanguage", courseLanguage);
    formData.append("category", selectedCategories); // Assuming this is a single category ID

    // Append array fields
    const keyPoints = ["Point 1", "Point 2"];
    const tags = ["React", "Node"];

    keyPoints.forEach((keyPoint) => formData.append("keyPoints", keyPoint));
    tags.forEach((tag) => formData.append("tags", tag));

    // Append file fields
    if (brochure) {
      formData.append("brochure", brochure);
    }
    if (selectedImage) {
      formData.append("thumbnail", selectedImage);
    }

    // Append the courseContent object
    // 1. Change courseContent to string  2. Send as key value pair  3.Parse it on server
    formData.append("courseContent", JSON.stringify(coursecontent));

    // Dispatch or send the FormData
    try {
      await addCourse(formData);
      toast.success("course Added Successfully");
    } catch (error) {
      toast.error(addCourseError);
    } finally {
      resetForm();
    }
    // dispatch(addCourse(formData, resetForm));
  };

  // Reset form fields
  const resetForm = () => {
    setCourseTitle("");
    setCourseSubTitle("");
    setKeyPoints([]);
    setTags([]);
    setValue("");
    setCourseMode("");
    setCourseLanguage("");
    setBrochure(null);
    setSelectedImage(null);
    setSelectedCategory("");
    setCourseContent([]);
    setSavedContent([]);
  };

  const handleTagChange = (e) => {
    const newTag = e.target.value;
    if (newTag.trim()) {
      setTags((prevTags) => [...prevTags, newTag]); // Add new tag to the array
    }
  };

  const handleKeyChange = (e) => {
    const newTag = e.target.value;
    if (newTag.trim()) {
      setKeyPoints((prevTags) => [...prevTags, newTag]); // Add new tag to the array
    }
  };

  return (
    <div className="p-5 space-y-5 w-full">
      {/* Upper Section */}

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Left Section */}
        <div className="space-y-4 bg-white p-5 shadow-md rounded-md w-full">
          {/* Title, Subtitle, Tag , Key Points and Brochure Upload */}
          <div>
            <label className="block text-black font-sans text-xl">Title</label>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="w-full border-b border-gray-300 p-1 focus:outline-none focus:border-blue-500 text-gray-700 font-medium text-sm"
            />
          </div>

          <div>
            <label className="block text-black font-sans text-xl">
              Subtitle
            </label>
            <input
              type="text"
              value={courseSubTitle}
              onChange={(e) => setCourseSubTitle(e.target.value)}
              className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500  text-gray-700"
            />
          </div>

          <div className="flex flex-row justify-between">
            <div>
              <label className="block text-black font-sans text-xl">Tag</label>
              <input
                type="text"
                onBlur={handleTagChange}
                className="w-full border-b border-gray-300 p-1 focus:outline-none focus:border-blue-500 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-black font-sans text-xl">
                Key Points
              </label>
              <input
                type="text"
                onBlur={handleKeyChange}
                className="w-full border-b border-gray-300 p-1 focus:outline-none focus:border-blue-500 text-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-black font-sans ">Add Brochure</label>
            <input
              type="file"
              className="w-full"
              onChange={handleBrochureUpload}
            />
            {brochure && (
              <p className="text-sm text-green-600 mt-1">
                Uploaded: {brochure.name}
              </p>
            )}
          </div>
        </div>

        {/* Right Section  [ Mode, Lang, Category, (Image Upload) ]*/}
        <div className="flex flex-col  bg-white p-5 shadow-md rounded-md">
          {/* Course Mode */}
          <div className="flex flex-row justify-between mb-4">
            <div className="w-[25%] shadow-md">
              <select
                className="w-full border-gray-300 p-2 focus:outline-none rounded"
                value={courseMode}
                onChange={(e) => setCourseMode(e.target.value)}
              >
                <option value="">Mode</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            {/* Course Language */}
            <div className="shadow-md">
              <select
                className="w-full  border-gray-300 p-2 focus:outline-none rounded, "
                value={courseLanguage}
                onChange={(e) => setCourseLanguage(e.target.value)}
              >
                <option value="">Language</option>
                <option value="hindi">Hindi</option>
                <option value="english">English</option>
                <option value="hindi+english">Hindi + English</option>
              </select>
            </div>
          </div>

          {/* Course Category */}
          <div className="shadow-md mb-4">
            <select
              className="w-full border-gray-300 p-2 focus:outline-none rounded mb-2"
              onChange={handleSelectCategory}
              value={selectedCategories} // Bind to the state
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload   */}
          <label
            htmlFor="image-upload"
            className="w-full h-48 border-dashed border-2 border-gray-300 flex justify-center items-center cursor-pointer hover:bg-gray-50"
          >
            {/* to show the selected image  */}
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400">Click to upload image</span>
            )}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>
      </div>

      {/* Lower Section [ Course Content, React Editor ]*/}

      <div className="bg-white p-5 shadow-md rounded-md space-y-4">
        <h3 className="text-xl font-sans text-black">Course Content</h3>
        {coursecontent.map((topic, topicIndex) => (
          <div key={topicIndex} className="space-y-3 border-b pb-4">
            {/* Topic Name */}
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Topic Name"
                value={topic.topicName}
                onChange={(e) => handleTopicChange(topicIndex, e.target.value)}
                className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500  text-gray-400"
              />
              <button
                className="text-red-500"
                onClick={() => removeTopic(topicIndex)}
              >
                ✕
              </button>
            </div>

            {/* Subtopics */}
            {topic.subtopics.map((subtopic, subtopicIndex) => (
              <div key={subtopicIndex} className="pl-4 space-y-2">
                <input
                  type="text"
                  placeholder="Subtopic Title"
                  value={subtopic.title}
                  onChange={(e) =>
                    handleSubtopicChange(
                      topicIndex,
                      subtopicIndex,
                      "title",
                      e.target.value
                    )
                  }
                  className="w-full border-b border-gray-300 p-1 focus:outline-none focus:border-blue-500  text-gray-400"
                />
                <textarea
                  placeholder="Subtopic Description"
                  value={subtopic.description}
                  onChange={(e) =>
                    handleSubtopicChange(
                      topicIndex,
                      subtopicIndex,
                      "description",
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                />
                <button
                  className="text-red-500 text-sm"
                  onClick={() => removeSubtopic(topicIndex, subtopicIndex)}
                >
                  Remove Subtopic
                </button>
              </div>
            ))}

            {/* Add Subtopic Button */}
            <button
              className="text-blue-500 text-sm mt-2"
              onClick={() => addSubtopic(topicIndex)}
            >
              + Add Subtopic
            </button>
          </div>
        ))}

        {/* Add Topic Button */}
        <button className="text-blue-500 text-sm" onClick={addTopic}>
          + Add Topic
        </button>

        {/* Save Content Button */}
        {coursecontent.length > 0 && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={saveContent}
          >
            Save Course Content
          </button>
        )}
      </div>

      {/* Saved Course Content */}
      {savedContent.length > 0 && (
        <div className="bg-gray-50 p-5 shadow-md rounded-md space-y-4">
          <h3 className="text-lg font-medium text-gray-700">
            Saved Course Content
          </h3>
          {savedContent.map((topic, topicIndex) => (
            <div key={topicIndex} className="space-y-2 border-b pb-4">
              <h4 className="font-medium text-gray-600">{topic.topicName}</h4>
              {topic.subtopics.map((subtopic, subtopicIndex) => (
                <div key={subtopicIndex} className="pl-4">
                  <p className="font-medium text-gray-500">
                    - {subtopic.title}
                  </p>
                  <p className="text-gray-500">{subtopic.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Rich Text Editor */}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleOnChange}
        className="lg:h-[30vh] mb-10"
      />

      {/* Submit Button */}
      <div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-10"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddCourse;
