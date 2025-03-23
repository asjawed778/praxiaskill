import React from "react";
import { useFormContext } from "react-hook-form";
import InputField from "../../../../components/Input Field";
import Button from "../../../../components/Button/Button";
import Dropdown from "../../../../components/Dropdown/Dropdown";

const CourseFirstStep = ({ handleNext }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedMode = watch("courseMode", "");
  const thumbnail = watch("thumbnail", "");
  const brouchure = watch("brouchure", "");

  console.log("Thumbnail and brouchure", brouchure, thumbnail)

  return (
    <div className="w-full">
      <div
        className="p-3 flex flex-col gap-6 px-4"
      >
        <div>
          <InputField
            placeholder="Enter the course title"
            className="bg-white"
            {...register("title")}
          >
            Course Title <span className="text-red-600">*</span>
          </InputField>
          {errors?.title && (
            <p className="text-red-600 text-xs ml-1 mt-0.5">
              {errors?.title.message}
            </p>
          )}
        </div>

        <div>
          <InputField
            placeholder="Enter the subtitle"
            {...register("subtitle")}
          >
            Subtitle <span className="text-red-600">*</span>
          </InputField>
          {errors?.subtitle && (
            <p className="text-red-600 text-xs ml-1 mt-0.5">
              {errors?.subtitle.message}
            </p>
          )}
        </div>

        <div className=" flex flex-col md:flex-row gap-4 md:gap-0 md:items-center justify-between">
          <div className="flex flex-col gap-2 md:w-[49%] w-full">
            <div className="flex gap-1">
              <label htmlFor="language" className="cursor-pointer">
                Language
              </label>
              <span className="text-red-600">*</span>
            </div>

            <select
              id="language"
              placeholder="select"
              className="border p-2 rounded-lg border-neutral-300 outline-none cursor-pointer bg-white"
              {...register("language")}
            >
              <option value="">Select Language</option>
              <option value="HINDI">Hindi</option>
              <option value="ENGLISH">English</option>
              <option value="ENGLISH_HINDI">Hindi + English</option>
            </select>
            {errors?.language && (
              <p className="text-red-600 text-xs ml-1 -mt-1.5">
                {errors?.language.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 md:w-[49%] w-full">
            <Dropdown
              required={true}
              className="w-full"
              placeholder="Select a Category"
              label="Category"
              {...register("category")}
              endpoint={"course/category"}
            />
            {errors?.category && (
              <p className="text-red-600 text-xs ml-1 -mt-1.5">
                {errors?.category.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Dropdown
            required={true}
            className="w-full"
            placeholder="Select an Instuctor"
            label="Instructor"
            {...register("instructor")}
            endpoint={"course/instructors"}
          />
          {errors?.instructor && (
            <p className="text-red-600 text-xs ml-1 -mt-1.5">
              {errors?.instructor.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div>
            Mode: <span className="text-red-600">*</span>{" "}
          </div>
          <div className="flex justify-between border border-neutral-300 rounded-md md:w-2/5 w-full bg-white">
            {["OFFLINE", "ONLINE", "HYBRID"].map((mode) => (
              <label
                key={mode}
                htmlFor={mode}
                className={`text-sm cursor-pointer px-4 py-2 w-full text-center capitalize ${
                  (mode === "OFFLINE" &&
                    "rounded-l-md border-r border-neutral-200") ||
                  (mode === "HYBRID" &&
                    "rounded-r-md border-l border-neutral-200")
                } ${selectedMode === mode ? "bg-[#9CA1CD]" : ""}`}
              >
                {mode.toLowerCase()}
                <input
                  hidden
                  id={mode}
                  type="radio"
                  value={mode}
                  {...register("courseMode")}
                />
              </label>
            ))}
          </div>
          {errors?.courseMode && (
            <p className="text-red-600 text-xs ml-1 -mt-1.5">
              {errors?.courseMode.message}
            </p>
          )}
        </div>

        <div className="flex gap-20 flex-col md:flex-row">
          <div>
            <InputField setvalue={setValue} type="image" id="thumbnail">
              Thumbnail Image <span className="text-red-600">*</span>
            </InputField>
            {thumbnail && <div className="h-30 w-full rounded-md mt-2">
              <img className="h-full w-full rounded-md" src={thumbnail} alt="thumnail" />
              <p className="text-sm text-green-500">Uploaded Image Preview</p>
            </div> }
            {errors?.thumbnail && (
              <p className="text-red-600 text-xs ml-1 mt-0.5">
                {errors?.thumbnail.message}
              </p>
            )}
          </div>

          <div>
            <InputField setvalue={setValue} type="pdf" id="pdf">
              Brochure pdf <span className="text-red-600">*</span>
            </InputField>
            {brouchure && <div><a
            href={brouchure}
            target="_blank"
            rel="noopener noreferrer"
            className="z-10 mt-1 flex items-center justify-center text-xl text-white bg-black/55 w-full h-10 rounded-md cursor-pointer"
          >
            Preview
          </a>
          <p className="text-sm">Click to Preview Brouchure</p>
          </div> }
            {errors?.brouchure && (
              <p className="text-red-600 text-xs ml-1 mt-0.5">
                {errors?.brouchure.message}
              </p>
            )}
          </div>
        </div>

        <div className={`flex justify-end items-center text-white`}>
          <Button
            onClick={handleNext}
            className={`flex items-center justify-center w-40 `}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseFirstStep;