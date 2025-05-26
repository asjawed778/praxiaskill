import Button from "../../../../components/Button/Button";
import { useParams } from "react-router-dom";
import { useGetFullCourseContentQuery } from "../../../../services/course.api";
import ButtonLoading from "../../../../components/Button/ButtonLoading";
import { useState } from "react";
import Section from "./Course Content/Section";

export default function CourseContent() {
  const { courseId } = useParams();
  const { data: courseContent, isFetching } =
    useGetFullCourseContentQuery(courseId);
  const data = courseContent?.data;
  const courseTitle = courseContent?.data?.title;
  const [deletePopUpIds, setDeletePopIds] = useState(null);

  return !isFetching ? (
    <div id="model-root" className="relative flex flex-col gap-5 p-4">
      <h1 className="text-2xl font-bold">Course Content</h1>
      <div className="flex flex-col gap-10">
        {data?.sections?.map((section, index) => (
          <Section
            key={index}
            index={index}
            courseId={courseId}
            section={section}
            courseTitle={courseTitle}
          />
        ))}
      </div>

      <div className="flex justify-end">
        <Button>Submit </Button>
      </div>
    </div>
  ) : (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Course Content</h1>
      <div className="h-30 flex justify-center items-center">
        <ButtonLoading />
      </div>
    </div>
  );
}
