import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { accessToken } = useSelector((state) => state.auth);

  if (accessToken) {
    return children;
  } else {
    return <Navigate to="/auth" />;
  }
}

export default PrivateRoute;
