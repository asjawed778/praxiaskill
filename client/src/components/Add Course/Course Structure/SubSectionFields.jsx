import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

import { useFieldArray } from "react-hook-form";
import InputField from "../../Input Field";

export default function SubSectionFields({ control, sectionIndex, errors }) {
  const {
    fields: subSectionFields,
    append: appendSubsection,
    remove: removeSubsection,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.subSections`,
  });

  return (
    <div className="flex flex-col gap-3 mt-4">
      <h1 className="font-medium">Subsections</h1>

      {subSectionFields.map((_, subIndex) => (
        <div key={subIndex} className="flex flex-col gap-5">
          <div className="flex gap-5 items-center">
            <div className="flex-1">
              <InputField
                id="step3-subsection-title"
                {...control.register(
                  `sections.${sectionIndex}.subSections.${subIndex}.title`
                )}
                placeholder="Subsection Title"
                // parentClassName="w-full"
              />

              {Array.isArray(errors?.sections) &&
                errors?.sections[sectionIndex]?.subSections[subIndex]
                  ?.title && (
                  <p className="text-red-600 text-xs ml-1 mt-0.5">
                    {
                      errors?.sections[sectionIndex]?.subSections[subIndex]
                        .title?.message
                    }
                  </p>
                )}
            </div>

            {subSectionFields.length > 1 && (
              <button
                type="button"
                onClick={() => removeSubsection(subIndex)}
                className="text-gray-500 mt-1"
              >
                <MdDelete size={30} />
              </button>
            )}
          </div>

          {subIndex === subSectionFields?.length - 1 && (
            <button
              type="button"
              onClick={() => appendSubsection({ title: "" })}
              className="text-[var(--color-primary)] cursor-pointer flex items-center gap-1 w-fit"
            >
              <FaPlus size={30} />
              <span>Add More Subsection</span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
