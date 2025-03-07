import { CiSquarePlus } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import required from "../../../public/imgs/required.svg";

import { useFieldArray, useForm, Controller } from "react-hook-form";

import JoditEditor from "jodit-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import InputField from "../Input Field";
import Button from "../Button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import secondStepValidationSchema from "./Schema/secondStepValidationSchema";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
import { useUploadAdditionalDetailsMutation } from "../../services/course.api";
import ButtonLoading from "../Button/ButtonLoading";


export default function AdditionalDetails({
  currentStep,
  handleNext,
  handlePrev,
  courseId
}) {
  const license_key = import.meta.env.VITE_CK_LICENSE_KEY;

  const [uploadAdditionalDetails, { isLoading, isError, error: uploadError }] =
    useUploadAdditionalDetailsMutation();

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: { keypoints: [], description: "", tags: [] },
    resolver: yupResolver(secondStepValidationSchema),
  });

  const {
    fields: keypoints,
    append: appendKeypoint,
    remove: removeKeypoint,
  } = useFieldArray({
    control,
    name: "keypoints",
  });

  const {
    fields: tags,
    append: tagAppend,
    remove: tagRemove,
  } = useFieldArray({
    control,
    name: "tags",
  });


  const addKeypoint = () => {
    clearErrors("keypoints");
    appendKeypoint("");
  };

  const onSubmit = async (formData) => {
    try {
      const { tags } = formData
      const newTags = tags.map((tag) => tag.value)

      const data = { ...formData, tags: newTags };
      console.log("submitted data", data)
      const id = `${courseId}`;
      const result = await uploadAdditionalDetails({ data, id });
      console.log("Result after submitting Second Step:", result);
      if (result?.error) {
        throw new Error(result.error.data.message);
      }
      handleNext();
    } catch (err) {
      console.log("Second Step form Error:", err);
    }
  };

  return (
    <form
      onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
    >
      <div className="flex flex-col gap-5">
        {/* KEYPOINT  */}
        <div className="flex flex-col gap-3">
          <div className="relative flex gap-1 w-fit">
            <span>Key Points</span>
            <img
              src={required}
              alt="required"
              className="absolute -right-3 top-2 w-[7px]"
            />
          </div>
          <div>
            {keypoints.length === 0 && appendKeypoint("")}
            {keypoints.map((field, index) => (
              <div key={field.id}>
                <div className="flex items-center gap-1 mt-2">
                  <input
                    id={index}
                    {...register(`keypoints.${index}`)}
                    className={`border p-2 w-full rounded-lg bg-white border-neutral-300 outline-0`}
                    placeholder={`Keypoint ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeKeypoint(index)}
                    className="text-neutral-400 text-3xl cursor-pointer hover:text-neutral-500"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
                {errors?.keypoints && (
                  <p className="text-red-500 text-xs ml-2">
                    {errors?.keypoints[index]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addKeypoint}
            className="text-primary hover:text-primary-hover w-fit px-4 py-2 rounded flex gap-1 items-center cursor-pointer"
          >
            <FaPlus />
            <span className="font-bold">Add more keypoint</span>
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-3">
          <InputField
            id="tags"
            type="text"
            placeholder={"Enter Tags"}
            onClick={() => {
              const newTag = document.getElementById("tags");
              if (newTag && newTag.value.trim()) {
                tagAppend({ value: newTag.value });
                newTag.value = ""; // Clear input after adding
              }
            }}
            // {...register(`newTag`)}
            labelClassName="relative flex"
            parentClassName="w-full"
          >
            <p>Tags</p>
            <img
              src={required}
              alt="required"
              className="size-2 absolute top-1 -right-3"
            />
          </InputField>

          {/* Show Tags */}
          {tags?.length > 0 && (
            <div className="min-h-[5rem] flex flex-wrap gap-3 w-full px-3 py-1 border border-gray-300 rounded-md">
              {tags.length > 0 &&
                tags.map((field, index) => (
                  <div
                    key={index}
                    className="bg-[#D0D7EFB2] h-fit w-fit py-1 px-4 rounded-full flex items-center justify-around gap-2"
                  >
                    <span>{field.value}</span>
                    <div
                      onClick={() => tagRemove(index)}
                      className="cursor-pointer text-neutral-500 hover:bg-[#d2d2d4eb] hover:rounded-full"
                    >
                      <RxCross2 />
                    </div>
                  </div>
                ))}
            </div>
          )}
          {errors?.tags && (
            <p className="text-red-500 text-xs -mt-2 ml-2">
              {errors.tags.message}
            </p>
          )}
        </div>

        {/* Discription */}
        <div className="flex flex-col gap-3">
          <div className="relative flex gap-1 w-fit">
            <span>Description</span>
            <img
              src={required}
              alt="required"
              className="absolute -right-3 top-1 w-[7px]"
            />
          </div>
          <div className="flex flex-col gap-5 overflow-y-hidden">
            <Controller
              name="description"
              control={control}
              render={({ field }) => {
                const editor = useRef(null);
                return (
                  <JoditEditor
                    ref={editor}
                    value={field.value}
                    onBlur={(newContent) => field.onChange(newContent)}
                    onChange={() => { }}
                    config={{
                      minHeight: 350,
                      width: "100%",
                      placeholder: "Start typing here...",
                    }}
                  />
                );
              }}
            />
          </div>
          {errors?.description && (
            <p className="text-red-500 text-xs ml-2 -mt-2">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* 2-Column Section */}
        <div className="flex flex-wrap sm:flex-nowrap justify-center gap-5">
          {/* First Column */}
          <div className="flex-1 flex flex-col gap-5 w-full">
            <div>
              <InputField
                {...register("duration")}
                id="duraion"
                // required={true}
                placeholder="30 hours plus videos"
                labelClassName="relative flex"
              >
                <p>Duration</p>
                <img
                  src={required}
                  alt="required"
                  className="size-2 absolute top-1 -right-3"
                />
              </InputField>
              {errors?.duration && (
                <p className="text-red-500 text-xs ml-2">
                  {errors.duration.message}
                </p>
              )}
            </div>

            <div>
              <InputField
                {...register("lecture")}
                id="total-lecture"
                placeholder="50 plus classes"
                labelClassName="relative flex"
              >
                <p>Total Lecture</p>
                <img
                  src={required}
                  alt="required"
                  className="size-2 absolute top-1 -right-3"
                />
              </InputField>
              {errors?.lecture && (
                <p className="text-red-500 text-xs ml-2">
                  {errors.lecture.message}
                </p>
              )}
            </div>
          </div>

          {/* Second Column */}
          {/* <InputField
            type="video"
            id="trailer-video"
            required={true}
            parentClassName="flex-1"
            labelClassName="relative flex"
          >
            <p>Trailer Video</p>
            <img
              src={required}
              alt="required"
              className="size-2 absolute top-1 -right-3"
            />
          </InputField> */}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <Button onClick={handlePrev}>Previous</Button>
        {/* <Button type="submit">Save and Next</Button> */}
        <Button
          type="submit"
          className={`flex items-center justify-center disabled:bg-gray-400 w-40 ${isLoading && "cursor-not-allowed"
            }`}
        >
          {isLoading ? <ButtonLoading /> : <p>Save and Next</p>}
        </Button>
      </div>
    </form>
  );
}