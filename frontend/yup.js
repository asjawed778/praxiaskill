import * as yup from 'yup';

export const assignCourseSchema = yup.object().shape({
  courseId: yup.string().required('Please select a course'),
});

export const addNewUserSchema = yup.object().shape({
    name: yup.string().required("Full name is required").min(3, "Name must be at least 3 characters"),
    email: yup.string().required("Email is required").email("Enter a valid email address"),
    role: yup.string().required("Role is required"),
  });
