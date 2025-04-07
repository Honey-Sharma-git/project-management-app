import { Outlet } from "react-router";
import { Navigate } from "react-router-dom";
export const ProtectedRoute = () => {
  const userToken = localStorage.getItem("token");
  return userToken ? <Outlet /> : <Navigate to="/" replace />;
};
