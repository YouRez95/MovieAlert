import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context.js/UserContext";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoutes() {
  const { user, isPending } = useAuth();

  return isPending ? "Loading" : user ? <Outlet /> : <Navigate to="/login" />;
}
