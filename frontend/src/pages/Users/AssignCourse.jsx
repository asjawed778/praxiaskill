import { Stack } from "@mui/material";
import CustomButton from "../../components/CustomButton";
import CustomInputField from "../../components/CustomInputField";
import ModalWrapper from "../../components/ModalWrapper";
import { useGetAllPublishedCourseQuery } from "../../services/course.api";
import CustomDropdown from "../../components/CustomDropdown";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAssignCourseMutation } from "../../services/usersApi";
import { assignCourseSchema } from "../../../yup";
import { yupResolver } from "@hookform/resolvers/yup";

const AssignCourse = ({ open, onClose, user }) => {
  const { data, isLoading } = useGetAllPublishedCourseQuery();
  const [assignCourse, { isLoading: assignCourseLoading }] =
    useAssignCourseMutation();
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(assignCourseSchema),
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} mt={2}>
          <CustomInputField
            disabled={true}
            label="User Name"
            value={user?.name}
            required={false}
          />

          <CustomDropdown
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
