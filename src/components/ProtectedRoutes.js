import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token"); // Get token from local storage

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
