import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const RoleAuthRoute = ({ children, allowedRoles }) => {
  const { accessToken, user } = useSelector((state) => state.auth);

  if (!accessToken) {
    return <Navigate to="/auth" />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default RoleAuthRoute;
