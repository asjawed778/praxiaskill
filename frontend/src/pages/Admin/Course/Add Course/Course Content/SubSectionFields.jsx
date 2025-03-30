import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { useFieldArray } from "react-hook-form";
import InputField from "../../../../../components/Input Field/index";

export default function SubSectionFields({ control, sectionIndex, errors, isReadOnly = true }) {
  const {
    fields: subSectionFields,
    append: appendSubsection,
    remove: removeSubsection,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.subsections`,
  });

  return (
    <div className="flex flex-col">
      <h1>Subsections</h1>

      {subSectionFields.map((_, subIndex) => (
        <div key={subIndex} className="flex flex-col gap-5">
          <div className="flex gap-3">
            <div className="flex flex-col gap-5 w-full p-2 border border-gray-300 rounded mt-2">
              <div>
                <InputField
                  id="step4-subsection-title"
                  {...control.register(
                    `sections.${sectionIndex}.subsections.${subIndex}.title`
                  )}
                  disabled
                  placeholder="Subsection Title"
                />
                

                {Array.isArray(errors?.sections) &&
                  errors?.sections[sectionIndex]?.subsections[subIndex]
                    .title && (
                    <p className="text-red-600 text-xs">
                      {
                        errors?.sections[sectionIndex]?.subsections[subIndex]
                          .title?.message
                      }
                    </p>
                  )}
              </div>

              <div className="flex gap-3 flex-col md:flex-row md:justify-between">
                <div>
                  <InputField id="step4-image" type="image">
                    Content Image
                  </InputField>

                  {Array.isArray(errors?.sections) &&
                    errors?.sections[sectionIndex]?.subsections[subIndex]
                      .image && (
                      <p className="text-red-600 text-xs">
                        {
                          errors?.sections[sectionIndex]?.subsections[subIndex]
                            .image?.message
                        }
                      </p>
                    )}
                </div>

                <div>
                  <InputField id="step4-pdf" type="pdf">
                    Content Brochure pdf
                  </InputField>

                  {Array.isArray(errors?.sections) &&
                    errors?.sections[sectionIndex]?.subsections[subIndex]
                      .pdf && (
                      <p className="text-red-600 text-xs">
                        {
                          errors?.sections[sectionIndex]?.subsections[subIndex]
                            .pdf?.message
                        }
                      </p>
                    )}
                </div>

                <div>
                  <InputField id="step4-video" type="video">
                    Content Video
                  </InputField>

                  {Array.isArray(errors?.sections) &&
                    errors?.sections[sectionIndex]?.subsections[subIndex]
                      .video && (
                      <p className="text-red-600 text-xs">
                        {
                          errors?.sections[sectionIndex]?.subsections[subIndex]
                            .video?.message
                        }
                      </p>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
