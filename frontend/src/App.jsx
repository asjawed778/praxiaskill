import { lazy, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicRoute from "./components/auth/PublicRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import BasicLayout from "./layouts/Basic";
import CourseLecturesLayout from "./layouts/CourseLecturesLayout";
import LazyComponent from "./components/LazyComponent";
import PageNotFound from "./pages/pagenotfound";
import AdminLayout from "./layouts/AdminLayout";
import CategoryManagement from "./pages/Admin/Category/CategoryManagement";
import { useDispatch, useSelector } from "react-redux";
import SplashScreen from "./components/SplashScreen";
import { setSplashShown } from "./store/reducers/splashScreenReducer";
const ViewCategories = lazy(() =>
  import("./pages/Admin/Category/ViewCategories")
);
const CourseEnquiryManagement = lazy(() =>
  import("./pages/Admin/Category/CourseEnquiryManagement")
);
const LearningPage = lazy(() => import("./pages/LearningPage"));
const AddCategory = lazy(() => import("./pages/Admin/Category/AddCategory"));
const AuthPage = lazy(() => import("./pages/authpage"));
const BlogPage = lazy(() => import("./pages/Blog/landingpage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const CourseLandingPage = lazy(() =>
  import("./pages/CourseLandingPage")
);
// const CourseLandingPage = lazy(() => import("./pages/Course/landingpage"));
const SinglePost = lazy(() => import("./pages/Single_Post/landingpage"));
const AddCourse = lazy(() => import("./pages/Admin/Course/index"));
const MyEnrollment = lazy(() => import("./pages/Admin/My Enrollment"));
const ManageCourse = lazy(() => import("./pages/Admin/Course/ManageCourse"));
const EventPage = lazy(() => import("./pages/EventPage"));
const EventForm = lazy(() => import("./pages/EventPage/EventForm"));
const CourseContent = lazy(() =>
  import("./pages/Admin/Course/Add Course/CourseContent")
);
const CoursePayment = lazy(() => import("./pages/CoursePayment"));
const CourseLectures = lazy(() => import("./pages/Course Lectures"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Users = lazy(() => import("./pages/Users"));
const StaticPage = lazy(() => import("./pages/StaticPage"));


const publicRoutes = [
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
    path: "course/:courseTitle",
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
  {
    path: "contact-us",
    element: (
      <LazyComponent>
        <ContactUs />
      </LazyComponent>
    ),
  },
  {
    path: "StaticPage",
    element: (
      <LazyComponent>
        <StaticPage />
      </LazyComponent>
    ),
  },
  // {
  //   path: "full-stack-web-development-pro-level",
  //   element: (
  //     <LazyComponent>
  //       <FullStackDevelopment />
  //     </LazyComponent>
  //   )
  // },
  // {
  //   path: "ai-powered-digital-marketing",
  //   element: (
  //     <LazyComponent>
  //       <DigitalMarketing />
  //     </LazyComponent>
  //   )
  // }
];

const authRoutes = [
  {
    path: "/auth",
    element: (
      <LazyComponent>
        <PublicRoute>
          <AuthPage />
        </PublicRoute>
      </LazyComponent>
    ),
  },
  {
    path: "/reset-password/:token",
    element: (
      <LazyComponent>
        <PublicRoute>
          <AuthPage reset={true} />
        </PublicRoute>
      </LazyComponent>
    ),
  },
];

const adminRoutes = [
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
            <AdminDashboard />
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
      {
        path: "my-enrollment",
        element: (
          <LazyComponent>
            <MyEnrollment />
          </LazyComponent>
        ),
      },
      {
        path: "users",
        element: (
          <LazyComponent>
            <Users />
          </LazyComponent>
        ),
      },
    ],
  },
];

const userPrivateRoutes = [
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

const courseLectureRoute = [
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

function App() {
  const { accessToken, user } = useSelector((store) => store.auth);
  // const dispatch = useDispatch();
  // const hasShown = useSelector((state) => state.splashScreen.hasShown);
  // const [showSplash, setShowSplash] = useState(!hasShown);

  // useEffect(() => {
  //   if (!hasShown) {
  //     const timer = setTimeout(() => {
  //       setShowSplash(false);
  //       dispatch(setSplashShown());
  //     }, 1500);
  //     return () => clearTimeout(timer);
  //   }
  // }, [hasShown, dispatch]);

  // if (showSplash) {
  //   return <SplashScreen />;
  // }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<BasicLayout />}>
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* Auth routes */}
        {authRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}

        {/* if user is not logged in then user will redirected to auth page if they try to access dashboard  */}
        {!accessToken && (
          <Route
            path="/dashboard/*"
            element={<Navigate to="/auth" replace />}
          />
        )}

        {/* Private routes  */}
        {accessToken ? (
          <Route element={<BasicLayout />}>
            {userPrivateRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
        ) : accessToken && user?.role === "SUPER_ADMIN" ? (
          <Route path="/dashboard/*" element={<PageNotFound />} />
        ) : (
          <Route path="/dashboard/*" element={<Navigate to="/" />} replace />
        )}

        {accessToken && user?.role === "SUPER_ADMIN" ? (
          adminRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element}>
              {route.children?.map((child, childIndex) => (
                <Route key={childIndex} {...child} />
              ))}
            </Route>
          ))
        ) : (
          <Route path="/dashboard/*" element={<Navigate to="/" replace />} />
        )}

        {(accessToken && user?.role === "SUPER_ADMIN") || "USER" ? (
          courseLectureRoute.map((route, index) => (
            <Route key={index} path={route.path} element={route.element}>
              {route.children?.map((child, childIndex) => (
                <Route key={childIndex} {...child} />
              ))}
            </Route>
          ))
        ) : (
          <Route
            path="/course-lecture/*"
            element={<Navigate to="/auth" replace />}
          />
        )}

        {/* if route does other than predefined endpoints will be redirected PageNotFound Page  */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
