import { lazy } from "react";
import PrivateRoute from "../components/auth/PrivateRoute";
import LazyComponent from "../components/LazyComponent";
const LearningPage = lazy(() => import("../pages/Learning/index"));
const HomePage = lazy(() => import("../pages/Home page/homepage"));
const BlogPage = lazy(() => import("../pages/Blog/landingpage"));
const CourseLandingPage = lazy(() =>
  import("../pages/Course Landing Page/index")
);
const SinglePost = lazy(() => import("../pages/Single_Post/landingpage"));
const EventPage = lazy(() => import("../pages/EventPage"));
const EventForm = lazy(() => import("../pages/EventPage/EventForm"));
const CoursePayment = lazy(() => import("../pages/CoursePayment"));


export const publicRoutes = [
    {
      path: "",
      element: (
        <LazyComponent>
          <HomePage />
        </LazyComponent>
      ),
    },
    {
      path: "blog",
      element: (
        <LazyComponent>
          <BlogPage />
        </LazyComponent>
      ),
    },
    {
      path: "blog/:id",
      element: (
        <LazyComponent>
          <SinglePost />
        </LazyComponent>
      ),
    },
    {
      path: "courses",
      element: (
        <LazyComponent>
          <LearningPage />
        </LazyComponent>
      ),
    },
    {
      path: "course/:courseId",
      element: (
        <LazyComponent>
          <CourseLandingPage />
        </LazyComponent>
      ),
    },
    {
      path: "/ccfs",
      element: (
        <LazyComponent>
          <EventPage />
        </LazyComponent>
      ),
    },
    {
      path: "eventForm",
      element: (
        <LazyComponent>
          <EventForm />
        </LazyComponent>
      ),
    },
    {
      path: "course-payment/:courseId",
      element: (
        <LazyComponent>
          <PrivateRoute>
            <CoursePayment />
          </PrivateRoute>
        </LazyComponent>
      ),
    },
  ];