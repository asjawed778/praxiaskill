import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BasicLayout from "./layouts/Basic";
import PageNotFound from "./pages/pagenotfound";
import { useSelector } from "react-redux";
import { publicRoutes } from "./routes/publicRoutes";
import { authRoutes } from "./routes/authRoutes";
import { adminRoutes, courseLectureRoute, userPrivateRoutes } from "./routes/privateRoutes";


function App() {
  const { accessToken, user } = useSelector((store) => store.auth);

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

        {/* Private routes for USER  */}
        {accessToken && user?.role === "USER" ? (
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

          {/* private routes for SUPER_ADMIN  */}
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

          {/* private route for both SUPER_ADMIN and USER  */}
        {(accessToken && (user?.role === "SUPER_ADMIN" ||  user?.role === "USER")) ? (
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
