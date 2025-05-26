import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import required from "/imgs/required.svg";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
import InputField from "../../../../../components/Input Field";
import Button from "../../../../../components/Button/Button";
import { useEffect, useRef } from "react";

import JoditEditor from "jodit-react";
import FAQSections from "./FAQSections";
import ToolsGrid from "./ToolsGrid";

const AdditionalDetails = ({ handleNext, handlePrev }) => {
  const { control, register, setValue, clearErrors, formState: { errors } } = useFormContext();

  const {
    fields: keypoints,
    append: appendKeypoint,
    remove: removeKeypoint,
  } = useFieldArray({
    control,
    name: "keypoints",
  });


  const {
    fields: whatWillYouLearn,
    append: appendWhatWillYouLearn,
    remove: removeWhatWillYouLearn,
  } = useFieldArray({
    control,
    name: "whatWillYouLearn",
  });

  const {
    fields: tags,
    append: tagAppend,
    remove: tagRemove,
  } = useFieldArray({
    control,
    name: "tags",
  });

   useEffect(() => {
    if (keypoints.length === 0) {
      appendKeypoint(""); // Add an initial empty keypoint when component mounts
    }
  }, [keypoints, appendKeypoint]);

   useEffect(() => {
    if (whatWillYouLearn.length === 0) {
      appendWhatWillYouLearn(""); // Add an initial empty keypoint when component mounts
    }
  }, [whatWillYouLearn, appendWhatWillYouLearn]);

  const addWhatWillYouLearn = () => {
    clearErrors("whatWillYouLearn");
    appendWhatWillYouLearn("");
  };

  const addKeypoint = () => {
    clearErrors("keypoints");
    appendKeypoint("");
  };

  return (
    <div
      onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      className="flex flex-col gap-3"
    >
      <div className="flex flex-col gap-3">
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
            {/* {keypoints.length === 0 && appendKeypoint("")} */}
            {keypoints.map((field, index) => (
              <div key={field.id}>
                <div className="flex items-center gap-1">
                  <input
                    id={index}
                    {...register(`keypoints.${index}`)}
                    className={`border p-2 w-full rounded-lg bg-white border-neutral-300 outline-0 mt-1 `}
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


        {/* WHat You will Learn  */}
        <div className="flex flex-col gap-3">
          <div className="relative flex gap-1 w-fit">
            <span>What You Will Learn?</span>
            <img
              src={required}
              alt="required"
              className="absolute -right-3 top-2 w-[7px]"
            />
          </div>
          <div>
            {/* {keypoints.length === 0 && appendKeypoint("")} */}
            {whatWillYouLearn.map((field, index) => (
              <div key={field.id}>
                <div className="flex items-center gap-1">
                  <input
                    id={index}
                    {...register(`whatWillYouLearn.${index}`)}
                    className={`border p-2 w-full rounded-lg bg-white border-neutral-300 outline-0 mt-1`}
                    placeholder={`whatWillYouLearn ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeWhatWillYouLearn(index)}
                    className="text-neutral-400 text-3xl cursor-pointer hover:text-neutral-500"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
                {errors?.whatWillYouLearn && (
                  <p className="text-red-500 text-xs ml-2">
                    {errors?.whatWillYouLearn[index]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addWhatWillYouLearn}
            className="text-primary hover:text-primary-hover w-fit px-4 py-2 rounded flex gap-1 items-center cursor-pointer"
          >
            <FaPlus />
            <span className="font-bold">Add more points</span>
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
                {...register("totalLectures")}
                id="total-lecture"
                type="number"
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
              {errors?.totalLectures && (
                <p className="text-red-500 text-xs ml-2">
                  {errors.totalLectures.message}
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
        <ToolsGrid />
        <FAQSections />
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <Button onClick={handlePrev}>Previous</Button>
        <Button onClick={handleNext}
          className={`flex items-center justify-center w-40`}
        >
         Next
        </Button>
      </div>
    </div>
  );
};

export default AdditionalDetails;