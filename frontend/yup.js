import * as yup from 'yup';

export const assignCourseSchema = yup.object().shape({
  courseId: yup.string().required('Please select a course'),
});
