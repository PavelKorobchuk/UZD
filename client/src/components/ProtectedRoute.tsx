import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export function ProtectedRoute({ children }: { children: any }) {
  const hasToken = useSelector((state) => (state as any).auth?.access_token);
  let location = useLocation();

  if (!hasToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
