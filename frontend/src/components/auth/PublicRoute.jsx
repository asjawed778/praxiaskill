import React from 'react';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
    const { accessToken } = useSelector((store) => store.auth)

    if (accessToken === null) {
        return children
    } else {
        return <Navigate to="/" />
    }
}

export default PublicRoute;