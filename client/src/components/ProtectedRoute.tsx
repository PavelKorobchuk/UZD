import { Navigate, useLocation } from "react-router-dom";

export function ProtectedRoute({ children }: { children: any }) {
  const userAuthData = localStorage.getItem("userAuthData");
  const user = JSON.parse(userAuthData || "");
  let location = useLocation();

  if (!user?.access_token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return children;
}
