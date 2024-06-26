import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const user = "youness";

  return user ? <Outlet /> : <Navigate to="/login" />;
}
