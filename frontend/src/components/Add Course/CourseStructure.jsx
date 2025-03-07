import { FaPlus } from "react-icons/fa";
import required from "../../../public/imgs/required.svg";

import { useFieldArray, useForm } from "react-hook-form";
import InputField from "../Input Field";
import { yupResolver } from "@hookform/resolvers/yup";

import { thirdStepValidationSchema } from "./Schema/thirdStepValidationSchema";
import SubSectionFields from "./Course Structure/SubSectionFields";
import Button from "../Button/Button";
import { useUploadCourseStructureMutation } from "../../services/course.api";
import ButtonLoading from "../Button/ButtonLoading";

export default function CourseStructure({
  currentStep,
  handleNext,
  handlePrev,
  courseId
}) {
  const [uploadCourseStructure, { isLoading, isError, error: uploadError }] =
    useUploadCourseStructureMutation();
  // React Hook Form
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(thirdStepValidationSchema),
    defaultValues: {
      sections: [
        {
          title: "",
          description: "",
          subSections: [{ title: "" }],
        },
      ],
    },
  });

  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: "sections",
  });

  const onSubmit = async(data) => {
    try {
      console.log("submitted data", data) 
      const id = `${courseId}`;
      const result = await uploadCourseStructure({data, id});
      console.log("Result after submitting Third Step:", result);
      if (result?.error) {   
        throw new Error(result.error.data.message);
      }
      handleNext();
    } catch (err) {
      console.log("Third Step form Error:", err);
    }
  };

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            type="submit"
            className={`flex items-center justify-center disabled:bg-gray-400 w-40 ${
              isLoading && "cursor-not-allowed"
            }`}
          >
            {isLoading ? <ButtonLoading /> : <p>Save and Next</p>}
          </Button>
        </div>
      </form>
    </div>
  );
}
