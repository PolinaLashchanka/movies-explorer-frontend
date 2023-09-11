import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component, ...props }) {
    console.log(2, props.loggedIn);
  return props.loggedIn ? <Component {...props} /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;
