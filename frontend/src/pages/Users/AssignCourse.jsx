import { Stack } from "@mui/material";
import CustomButton from "../../components/CustomButton";
import CustomInputField from "../../components/CustomInputField";
import ModalWrapper from "../../components/ModalWrapper";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAssignCourseMutation } from "../../services/usersApi";
import { assignCourseSchema } from "../../../yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomDropdownField from "../../components/CustomDropdownField";
import { useState } from "react";
import { useGetCoursesQuery } from "../../services/course.api";

const AssignCourse = ({ open, onClose, user }) => {
  const [page, setPage] = useState(1);
  const [assignCourse, { isLoading: assignCourseLoading }] =
    useAssignCourseMutation();
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(assignCourseSchema),
  });
  const {data, isLoading} = useGetCoursesQuery({
    page: page
  });
  const courseData = data?.data?.courses || data?.courses || [];
  const courseOptions = courseData.map((course) => ({
    label: course?.title,
    value: course?._id,
  }));

  const onSubmit = async (formData) => {
    try {
      await assignCourse({
        courseId: formData.courseId,
        userId: user._id,
      }).unwrap();

      toast.success("Course assigned successfully!");
      onClose();
      reset();
    } catch (error) {
      console.error("Failed to assign course:", error);
      toast.error(
        error?.data?.message || "Failed to assign course. Please try again."
      );
    }
  };

  return (
    <ModalWrapper open={open} onClose={onClose} title="Assign Course to User">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <CustomInputField
            disabled={true}
            label="User Name"
            value={user?.name}
            required={false}
          />

          <CustomDropdownField
            name="courseId"
            label="Select Course"
            placeholder="Choose a course"
            options={courseOptions}
            control={control}
            required
            disabled={isLoading || courseOptions.length === 0}
          />

          <CustomButton
            type="submit"
            label="Assign Course"
            loading={assignCourseLoading}
            fullWidth
            disabled={assignCourseLoading || courseOptions.length === 0}
          />
        </Stack>
      </form>
    </ModalWrapper>
  );
};

export default AssignCourse;
