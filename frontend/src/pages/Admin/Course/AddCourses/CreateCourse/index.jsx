import { useEffect, useMemo, useState } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useGetFullCourseDetailsQuery,
  useUpdateCourseDetailsMutation,
  useUploadCourseMutation,
} from "../../../../../services/course.api";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import CourseDetails from "./CourseDetails";
import AdditionalDetails from "./AdditionalDetails";
import CourseStructure from "./CourseStructure";
import PricingPublish from "./PricingPublish";
import {
  additionalDetailsSchema,
  courseDetailsSchema,
  courseStructureSchema,
  pricingPublishSchema,
} from "../../../../../../yup";
import { cleanData } from "../../../../../utils/helper";

const CreateCourse = () => {
  const [uploadCourse, { isLoading, errors }] = useUploadCourseMutation();
  const [currentStep, setCurrentStep] = useState(0);

  const location = useLocation();
  const course = location.state || null;
  const editMode = Boolean(course);
  const [updateCourse, { isLoading: isCourseUpdate, errors: isUpdateError }] =
    useUpdateCourseDetailsMutation();
  const navigate = useNavigate();

  const {
    data: loadCourse,
    isLoading: isCourseLoading,
    isError,
  } = useGetFullCourseDetailsQuery(course?.course?._id, { skip: !editMode });

  useEffect(() => {
    if (isError) {
      console.error("Error fetching course details:", loadCourse?.data.data);
    }
    if (!isError && loadCourse) {
      console.log("Update course all: ", loadCourse);
      console.log("Need value: ", loadCourse.data?.category?.name);
    }
  }, [loadCourse, isError]);
  const resolver = useMemo(() => {
    switch (currentStep) {
      case 0:
        return yupResolver(courseDetailsSchema);
      case 1:
        return yupResolver(additionalDetailsSchema);
      case 2:
        return yupResolver(courseStructureSchema);
      case 3:
        return yupResolver(pricingPublishSchema);
      default:
        return undefined;
    }
  }, [currentStep]);

  const defaultValues = useMemo(() => {
    if (loadCourse?.data) {
      return {
        ...loadCourse.data,
        category: loadCourse?.data?.category?._id || "",
        tags:
          loadCourse.data.tags?.map((tag) => ({ label: tag, value: tag })) ||
          [],
        keypoints: loadCourse.data.keypoints || [""],
        sections: loadCourse.data.sections?.length
          ? loadCourse.data.sections
          : [
              {
                title: "",
                description: "",
                subSections: [{ title: "", description: "" }],
              },
            ],
        price: {
          actualPrice: loadCourse.data.price?.actualPrice || "",
          discountPercentage: loadCourse.data.price?.discountPercentage || null,
          finalPrice: loadCourse.data.price?.finalPrice || 0,
        },
      };
    }

    return {
      title: "",
      subtitle: "",
      language: "",
      category: "",
      instructor: "",
      courseMode: "",
      thumbnail: "",
      keypoints: [""],
      tags: [],
      description: "",
      duration: "",
      totalLectures: "",
      sections: [
        {
          title: "",
          description: "",
          subSections: [{ title: "", description: "" }],
        },
      ],
      price: {
        actualPrice: "",
        discountPercentage: null,
        finalPrice: 0,
      },
    };
  }, [loadCourse]);
  
  const methods = useForm({
    resolver,
    mode: "onChange",
    defaultValues,
  });
  useEffect(() => {
    if (loadCourse?.data && !isCourseLoading) {
      const courseData = {
        ...loadCourse.data,
        category: loadCourse?.data?.category?._id || "",
        instructor: loadCourse.data.instructor?._id || "",
        tags:
          loadCourse.data.tags?.map((tag) => ({ label: tag, value: tag })) ||
          [],
        keypoints: loadCourse.data.keypoints || [""],
        sections: loadCourse.data.sections?.length
          ? loadCourse.data.sections
          : [
              {
                title: "",
                description: "",
                subSections: [{ title: "", description: "" }],
              },
            ],
        price: {
          actualPrice: loadCourse.data.price?.actualPrice || "",
          discountPercentage: loadCourse.data.price?.discountPercentage || null,
          finalPrice: loadCourse.data.price?.finalPrice || 0,
        },
      };
      methods.reset(courseData);
    }
  }, [loadCourse, isCourseLoading, methods]);

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (!isValid) return;

    if (editMode && currentStep === 1) {
      // Skip Step 2 when in edit mode
      setCurrentStep(3);
    } else if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (formData) => {
    try {
      const { tags } = formData;
      const newTags = tags.map((tag) => tag.value);
      const data = { ...formData, tags: newTags };
      // const result = await uploadCourse(data);
      data?.sections?.forEach((section) => {
        section.assignments = section.assignments?.map(
          (item) => item.assignment
        );
      });
      data?.sections?.forEach((section) => {
        section.projects = section.projects?.map((item) => item.project);
      });
      const payload = cleanData(data);
      console.log("###### payload", payload);

      const result = editMode
        ? await updateCourse({
            courseId: data._id,
            data: payload,
          })
        : await uploadCourse(payload);
      if (result.error) {
        if (result.error.status === 400) {
          console.log("#### result::",  result)
          toast.error("Please fill all steps before submitting!");
        }
        throw new Error(result.error.data.message);
      }
      methods.reset();
      toast.success(
        editMode
          ? "Course updated successfully"
          : "Course published successfully!"
      );
      navigate("/dashboard/manage-course", { replace: true });
    } catch (err) {
      console.log("Error", err);
    }
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="py-4 md:p-4 md:w-full w-[97vw] mx-auto flex flex-col gap-6"
        noValidate
      >
        {/* Step Navigation */}
        <div className="bg-[#D0DAF1] rounded-lg text-xs md:text-sm flex justify-between items-center pr-3">
          <div
            onClick={() => setCurrentStep(0)}
            className={`px-4 py-2 cursor-pointer ${
              currentStep === 0 &&
              "bg-[var(--color-primary)] text-white rounded-lg"
            }`}
          >
            Course Details
          </div>
          <div
            onClick={() => setCurrentStep(1)}
            className={`px-4 py-2 cursor-pointer ${
              currentStep === 1 &&
              "bg-[var(--color-primary)] text-white rounded-lg"
            }`}
          >
            Additional Details
          </div>
          {!editMode && (
            <div
              onClick={() => setCurrentStep(2)}
              className={`px-4 py-2 cursor-pointer ${
                currentStep === 2 &&
                "bg-[var(--color-primary)] text-white rounded-lg"
              }`}
            >
              Course Structure
            </div>
          )}
          <div
            onClick={() => setCurrentStep(3)}
            className={`px-4 py-2 cursor-pointer ${
              currentStep === 3 &&
              "bg-[var(--color-primary)] text-white rounded-lg"
            }`}
          >
            Pricing & Publish
          </div>
        </div>

        {/* Step Content */}
        {/* <div className="bg-[#F5F5F5] rounded-lg p-2 w-full"> */}
        <div className="brounded-lg p-2 w-full">
          {currentStep === 0 && <CourseDetails 
            handleNext={handleNext} 
            editMode={editMode}
            onSubmit={onSubmit}
            isCourseUpdate={isCourseUpdate}
          />}
          {currentStep === 1 && (
            <AdditionalDetails
              handleNext={handleNext}
              handlePrev={handlePrev}
              editMode={editMode}
              onSubmit={onSubmit}
              isCourseUpdate={isCourseUpdate}
            />
          )}
          {currentStep === 2 && (
            <CourseStructure handleNext={handleNext} handlePrev={handlePrev} />
          )}
          {currentStep === 3 && (
            <PricingPublish
              isLoading={isLoading}
              isCourseUpdate={isCourseUpdate}
              editMode={editMode}
              handlePrev={handlePrev}
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateCourse;
