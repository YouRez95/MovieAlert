import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";

export default function ProtectedRoutes() {
  const { user, isPending } = useAuth();

  return isPending ? <Loading /> : user ? <Outlet /> : <Navigate to="/login" />;
}
