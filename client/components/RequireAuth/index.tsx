import React from "react";
import { useLocation, Navigate } from "react-router-dom";

import Layout from "@/components/Layout";

interface RequireAuthProps {
  children: JSX.Element;
}

const RequireAuth = (props: RequireAuthProps) => {
  const { children } = props;
  const isLoggedIn = true;

  let location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Layout>{children}</Layout>;
};

export default RequireAuth;
