import { lazy } from "react";
import PrivateRoute from "../components/auth/PrivateRoute";
import CourseLecturesLayout from "../layouts/CourseLecturesLayout";
import LazyComponent from "../components/LazyComponent";
import AdminLayout from "../layouts/AdminLayout";
import CategoryManagement from "../pages/Admin/Category/CategoryManagement";
const ViewCategories = lazy(() =>
  import("../pages/Admin/Category/ViewCategories")
);
const CourseEnquiryManagement = lazy(() =>
  import("../pages/Admin/Category/CourseEnquiryManagement")
);
const AddCategory = lazy(() => import("../pages/Admin/Category/AddCategory"));
const AdminPage = lazy(() => import("../pages/Admin/adminpage"));

const AddCourse = lazy(() => import("../pages/Admin/Course/index"));
const MyEnrollment = lazy(() => import("../pages/Admin/My Enrollment"));
const ManageCourse = lazy(() => import("../pages/Admin/Course/ManageCourse"));

const CourseContent = lazy(() =>
  import("../pages/Admin/Course/Add Course/CourseContent")
);
const CourseLectures = lazy(() => import("../pages/Course Lectures"));


export const adminRoutes = [
    {
      path: "dashboard",
      element: (
        <LazyComponent>
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        </LazyComponent>
      ),
      children: [
        {
          index: true,
          element: (
            <LazyComponent>
              <AdminPage />
            </LazyComponent>
          ),
        },
        {
          path: "view-categories",
          element: (
            <LazyComponent>
              <ViewCategories />
            </LazyComponent>
          ),
        },
        {
          path: "manage-category",
          element: (
            <LazyComponent>
              <CategoryManagement />
            </LazyComponent>
          ),
        },
        {
          path: "add-category",
          element: (
            <LazyComponent>
              <AddCategory />
            </LazyComponent>
          ),
        },
        {
          path: "course-enquiry",
          element: (
            <LazyComponent>
              <CourseEnquiryManagement />
            </LazyComponent>
          ),
        },
        {
          path: "add-course",
          element: (
            <LazyComponent>
              <AddCourse />
            </LazyComponent>
          ),
        },
        {
          path: "course/content/:courseId",
          element: (
            <LazyComponent>
              <CourseContent />
            </LazyComponent>
          ),
        },
        {
          path: "manage-course",
          element: (
            <LazyComponent>
              <ManageCourse />
            </LazyComponent>
          ),
        },
      ],
    },
  ];
  
  export const userPrivateRoutes = [
    {
      path: "my-courses",
      element: (
        <LazyComponent>
          <PrivateRoute>
            <MyEnrollment />
          </PrivateRoute>
        </LazyComponent>
      ),
    },
  ];
  
  
  export const courseLectureRoute = [
    {
      path: "course-lecture",
      element: (
        <LazyComponent>
          <PrivateRoute>
            <CourseLecturesLayout />
          </PrivateRoute>
        </LazyComponent>
      ),
      children: [
        {
          path: ":courseId",
          element: (
            <LazyComponent>
              <CourseLectures />
            </LazyComponent>
          ),
        },
      ],
    },
  ];