import InputField from "../../../../components/Input Field";

import Button from "../../../../components/Button/Button";
import { useParams } from "react-router-dom";
import { useGetFullCourseContentQuery } from "../../../../services/course.api";
import ButtonLoading from "../../../../components/Button/ButtonLoading";
import VideoUploader from "../../../../components/Video";

export default function CourseContent() {
  const { courseId } = useParams();
  const { data: courseContent, isFetching } =
    useGetFullCourseContentQuery(courseId);
  const data = courseContent?.data;
  const courseTitle = courseContent?.data?.title;

  if (isFetching) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Course Content</h1>
        <div className="h-30 flex justify-center items-center">
          <ButtonLoading />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 p-4">
      <h1 className="text-2xl font-bold">Course Content</h1>
      <div className="flex flex-col gap-10">
        {data?.sections?.map((section, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 bg-[#F5F5F5] p-4 rounded-md"
          >
            <div className="text-lg font-semibold">Section {index + 1}</div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <p>Title</p>
                <p className="bg-white py-2 px-4 rounded-md border border-neutral-300">
                  {section?.title}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p>Description</p>
                <p className="bg-white py-2 px-4 rounded-md border border-neutral-300">
                  {section?.description}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <p>Subsections</p>
                {section?.subSections.map((subSection, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col gap-5 border border-neutral-300 p-4 rounded-md"
                  >
                    <p className="bg-white py-2 px-4 mt-2 rounded-md border border-neutral-300">
                      {subSection?.title}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <InputField id="step4-image" type="image">
                          Content Image
                        </InputField>
                      </div>

                      <div>
                        <InputField id="step4-pdf" type="pdf">
                          Content Brochure pdf
                        </InputField>
                      </div>

                      <div className="">
                        <VideoUploader
                          courseId={courseId}
                          sectionId={section?._id}
                          subSectionId={subSection?._id}
                          courseTitle={courseTitle}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button>Submit </Button>
      </div>
    </div>
  );
}
