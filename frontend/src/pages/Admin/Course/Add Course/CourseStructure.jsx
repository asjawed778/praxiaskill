import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import required from "/imgs/required.svg";
import InputField from "../../../../components/Input Field";
import Button from "../../../../components/Button/Button";
import SubSectionFields from "./Course Structure/SubSectionFields";

const CourseStructure = ({ handleNext, handlePrev }) => {
  const { control, register, formState: { errors } } = useFormContext();

  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: "sections",
  });

  return (
    <div className="flex flex-col gap-3">
      <h1 className="relative w-fit">
        <span>Section</span>

        <img
          src={required}
          alt="required"
          className="size-2 absolute -right-3 top-1"
        />
      </h1>

      <div className="space-y-6">
        {sectionFields.map((_, sectionIndex) => (
          <div
            key={sectionIndex}
            className="relative flex flex-col gap-3 px-5 py-4 border border-gray-300 rounded-md"
          >
            <p className="absolute right-5 -top-0">{sectionIndex + 1}</p>

            <div>
              {/* Section Title */}
              <InputField
                id="step3-title"
                {...register(`sections.${sectionIndex}.title`)}
                placeholder="Title"
              >
                Title :
              </InputField>

              {Array.isArray(errors?.sections) &&
                errors?.sections[sectionIndex]?.title && (
                  <p className="text-red-600 text-xs ml-1 mt-0.5">
                    {errors?.sections[sectionIndex]?.title?.message}
                  </p>
                )}
            </div>

            {/* Section Description */}
            <div>
              <label htmlFor="step3-description">Description :</label>
              <textarea
                id="step3-description"
                {...register(`sections.${sectionIndex}.description`)}
                placeholder="Description"
                className="bg-white w-full p-2 mt-2 border border-gray-300 rounded outline-none"
              />

              {Array.isArray(errors?.sections) &&
                errors?.sections[sectionIndex]?.description && (
                  <p className="text-red-600 text-xs ml-1 mt-0.5">
                    {errors?.sections[sectionIndex]?.description?.message}
                  </p>
                )}
            </div>

            {/* Subsections */}
            <SubSectionFields
              control={control}
              sectionIndex={sectionIndex}
              errors={errors}
            />

            {/* Remove Section Button */}
            {sectionFields.length > 1 && (
              <button
                type="button"
                onClick={() => removeSection(sectionIndex)}
                className="text-red-500 ml-auto px-5 py-1 border border-red-500 rounded-md cursor-pointer"
              >
                Remove Section
              </button>
            )}

          </div>
        ))}

        {/* Add Section Button */}
        <Button
          type="button"
          onClick={() =>
            appendSection({
              title: "",
              description: "",
              subSections: [{ title: "", description: "" }],
            })
          }
          className="flex items-center gap-2"
        >
          <span>Add Section</span>
          <FaPlus />
        </Button>

        <div className="flex gap-5 justify-between">
          <Button onClick={handlePrev}>Previous</Button>

          {/* Submit Button */}
          <Button
            onClick={handleNext}
            className={`flex items-center justify-center w-40`}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseStructure;