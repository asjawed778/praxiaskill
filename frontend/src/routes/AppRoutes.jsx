// define all routes here

import { Route, Routes } from "react-router-dom";
import LazyComponent from "../components/LazyComponent";
import BasicLayout from "../layouts/Basic";
import { lazy } from "react"
import PageNotFound from "../pages/pagenotfound";
import RoleAuthRoute from "../components/auth/RoleAuthRoute";
import CourseLecturesLayout from "../layouts/CourseLecturesLayout";
import AdminLayout from "../layouts/AdminLayout";
import PublicRoute from "../components/auth/PublicRoute";
const HomePage = lazy(() => import("../pages/HomePage"));
const LearningPage = lazy(() => import("../pages/LearningPage"));
const CourseLandingPage = lazy(() => import("../pages/CourseLandingPage"));
const EventPage = lazy(() => import("../pages/EventPage"));
const EventForm = lazy(() => import("../pages/EventPage/EventForm"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const Foundationalskills = lazy(() => import("../pages/HomePage/SkillsCardSection/FoundationSkills"));
const EntrepreneurialSkills = lazy(() => import("../pages/HomePage/SkillsCardSection/EntrepreneurialSkills"));
const EmployabilitySkills = lazy(() => import("../pages/HomePage/SkillsCardSection/EmployabilitySkills"));
const CoursePayment = lazy(() => import("../pages/CoursePayment"));
const MyEnrollment = lazy(() => import("../pages/Admin/My Enrollment"));
const CourseLectures = lazy(() => import("../pages/Course Lectures"));
const AddCategory = lazy(() => import("../pages/Admin/Category/AddCategory"));
const AuthPage = lazy(() => import("../pages/authpage"));
const AdminDashboard = lazy(() => import("../pages/Admin/AdminDashboard"));
const AddCourses = lazy(() => import("../pages/Admin/Course/AddCourses/CreateCourse"));
const ManageCourses = lazy(() => import("../pages/Admin/Course/ManageCourses"));
const AddCourseContent = lazy(() => import("../pages/Admin/Course/AddCourses/AddCourseContent"));
const Users = lazy(() => import("../pages/Users"));
const ViewCategories = lazy(() =>
    import("../pages/Admin/Category/ViewCategories")
);
const CourseEnquiryManagement = lazy(() =>
    import("../pages/Admin/Category/CourseEnquiryManagement")
);
import CategoryManagement from "../pages/Admin/Category/CategoryManagement";
import { UserRole } from "../utils/enum";
import useScrollToTop from "../hooks/useScrollToTop";


const AppRoutes = () => {
    useScrollToTop()
    return (
        <Routes>
            <Route path="/auth" element={
                <LazyComponent>
                    <PublicRoute>
                        <AuthPage />
                    </PublicRoute>
                </LazyComponent>
            } />
            <Route element={<BasicLayout />} >
                <Route
                    path="/"
                    element={
                        <LazyComponent>
                            <HomePage />
                        </LazyComponent>
                    }
                />
                <Route
                    path="/courses"
                    element={
                        <LazyComponent>
                            <LearningPage />
                        </LazyComponent>
                    }
                />
                <Route
                    path="/course/:slug"
                    element={
                        <LazyComponent>
                            <CourseLandingPage />
                        </LazyComponent>
                    }
                />
                <Route
                    path="/ccfs"
                    element={
                        <LazyComponent>
                            <EventPage />
                        </LazyComponent>
                    }
                />
                <Route
                    path="/eventForm"
                    element={
                        <LazyComponent>
                            <EventForm />
                        </LazyComponent>
                    }
                />
                <Route
                    path="/course-payment/:courseId"
                    element={
                        <LazyComponent>
                            <CoursePayment />
                        </LazyComponent>
                    }
                />
                <Route
                    path="/contact-us"
                    element={
                        <LazyComponent>
                            <ContactUs />
                        </LazyComponent>
                    }
                />
                <Route
                    path="/course-payment/:courseId"
                    element={
                        <LazyComponent>
                            <RoleAuthRoute>
                                <CoursePayment />
                            </RoleAuthRoute>
                        </LazyComponent>
                    }
                />
                <Route
                    path="/foundational-skill"
                    element={
                        <LazyComponent>
                            <Foundationalskills />
                        </LazyComponent>
                    }
                />
                <Route
                    path="/entrepreneurial-skill"
                    element={
                        <LazyComponent>
                            <EntrepreneurialSkills />
                        </LazyComponent>
                    }
                />
                <Route
                    path="/employability-skill"
                    element={
                        <LazyComponent>
                            <EmployabilitySkills />
                        </LazyComponent>
                    }
                />
                <Route
                    path="/my-courses"
                    element={
                        <LazyComponent>
                            <RoleAuthRoute>
                                <MyEnrollment />
                            </RoleAuthRoute>
                        </LazyComponent>
                    }
                />

                <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path="/course-lecture" element={
                <RoleAuthRoute>
                    <CourseLecturesLayout />
                </RoleAuthRoute>
            }>
                <Route
                    path=":courseId"
                    element={
                        <LazyComponent>
                            <CourseLectures />
                        </LazyComponent>
                    }
                />
            </Route>
            <Route path="/dashboard" element={
                <RoleAuthRoute allowedRoles={[UserRole.SUPER_ADMIN]} >
                    <AdminLayout />
                </RoleAuthRoute>
            }>
                <Route
                    path=""
                    element={
                        <LazyComponent>
                            <AdminDashboard />
                        </LazyComponent>
                    }
                />
                <Route
                    path="view-categories"
                    element={
                        <LazyComponent>
                            <ViewCategories />
                        </LazyComponent>
                    }
                />
                <Route
                    path="manage-category"
                    element={
                        <LazyComponent>
                            <CategoryManagement />
                        </LazyComponent>
                    }
                />
                <Route
                    path="add-category"
                    element={
                        <LazyComponent>
                            <AddCategory />
                        </LazyComponent>
                    }
                />
                <Route
                    path="course-enquiry"
                    element={
                        <LazyComponent>
                            <CourseEnquiryManagement />
                        </LazyComponent>
                    }
                />
                <Route
                    path="add-course"
                    element={
                        <LazyComponent>
                            <AddCourses />
                        </LazyComponent>
                    }
                />
                <Route
                    path="course/content/:courseId"
                    element={
                        <LazyComponent>
                            <AddCourseContent />
                        </LazyComponent>
                    }
                />
                <Route path="manage-course"
                    element={
                        <LazyComponent>
                            <ManageCourses />
                        </LazyComponent>
                    }
                />
                <Route path="users"
                    element={
                        <LazyComponent>
                            <Users />
                        </LazyComponent>
                    }
                />
            </Route>
        </Routes>
    );
}

export default AppRoutes;