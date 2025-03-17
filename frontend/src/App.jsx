import { lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicRoute from "./components/auth/PublicRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import BasicLayout from "./layouts/Basic";
import LazyComponent from "./components/LazyComponent";
import PageNotFound from "./pages/pagenotfound";
import AdminLayout from "./layouts/AdminLayout";
import CategoryManagement from "./pages/Admin/Category/CategoryManagement"
import { useSelector } from "react-redux";
const ViewCategories = lazy(() =>
  import("./pages/Admin/Category/ViewCategories")
);
const CourseEnquiryManagement = lazy(() => import("./pages/Admin/Category/CourseEnquiryManagement"))
const LearningPage = lazy(() => import("./pages/Learning/index"))
const AddCategory = lazy(() => import("./pages/Admin/Category/AddCategory"));
const AuthPage = lazy(() => import("./pages/authpage"));
const HomePage = lazy(() => import("./pages/Home page/homepage"));
const BlogPage = lazy(() => import("./pages/Blog/landingpage"));
const AdminPage = lazy(() => import("./pages/Admin/adminpage"));
const CourseLandingPage = lazy(() => import("./pages/Course Landing Page/index"));
// const CourseLandingPage = lazy(() => import("./pages/Course/landingpage"));
const SinglePost = lazy(() => import("./pages/Single_Post/landingpage"));
const AddCourse = lazy(() => import("./pages/Admin/Course/index"));
const ManageCourse = lazy(() => import("./pages/Admin/Course/ManageCourse"));


const publicRoutes = [
  {
    path: "",
    element: (
      <LazyComponent>
        <HomePage />
      </LazyComponent>
    )
  },
  {
    path: "blog",
    element: (
      <LazyComponent>
        <BlogPage />
      </LazyComponent>
    )
  },
  {
    path: "blog/:id",
    element: (
      <LazyComponent>
        <SinglePost />
      </LazyComponent>
    )
  },
  {
    path: "courses",
    element: (
      <LazyComponent>
        <LearningPage />
      </LazyComponent>
    )
  },
  {
    path: "course/:id",
    element: (
      <LazyComponent>
        <CourseLandingPage />
      </LazyComponent>
    )
  }
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
    )
  },
  {
    path: "/reset-password/:token",
    element: (
      <LazyComponent>
        <PublicRoute>
          <AuthPage reset={true} />
        </PublicRoute>
      </LazyComponent>
    )
  }
];


const privateRoutes = [
  {
    path: "admin",
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
        )
      },
      {
        path: "view-categories",
        element: (
          <LazyComponent>
            <ViewCategories />
          </LazyComponent>
        )
      },
      {
        path: "add-category",
        element: (
          <LazyComponent>
            <CategoryManagement />
          </LazyComponent>
        )
      },
      {
        path: "course-enquiry",
        element: (
          <LazyComponent>
            <CourseEnquiryManagement />
          </LazyComponent>
        )
      },
      {
        path: "add-course",
        element: (
          <LazyComponent>
            <AddCourse />
          </LazyComponent>
        )
      },
      {
        path: "manage-course",
        element: (
          <LazyComponent>
            <ManageCourse />
          </LazyComponent>
        )
      }
    ]
  }
];

function App() {
  const { accessToken } = useSelector((store) => store.auth);

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

        {/* Private routes  */}
          {accessToken ? (
            privateRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element}>
              {route.children?.map((child, childIndex) => (
                <Route key={childIndex} {...child} />
                ))}
            </Route>
          ))
          ) : (
            <Route path="/admin/*" element={<Navigate to="/auth" replace />} />
            )}
        
        {/* if route does other than predefined endpoints will be redirected PageNotFound Page  */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;