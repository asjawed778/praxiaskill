import { lazy } from "react";
import PublicRoute from "../components/auth/PublicRoute";
import LazyComponent from "../components/LazyComponent";
const AuthPage = lazy(() => import("../pages/authpage"));

export const authRoutes = [
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