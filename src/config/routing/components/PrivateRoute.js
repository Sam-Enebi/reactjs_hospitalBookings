import React from "react";
import { Navigate } from "react-router-dom";
import useAuthenticate from "../../../hooks/useAuthenticate";

const PrivateRoute = ({ children }) => {
  const { authenticate } = useAuthenticate();
  const admin = authenticate();
  if (admin) {
    return children;
  }
  return <Navigate to='/signin' />;
};

export default PrivateRoute;
