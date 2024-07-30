import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";

export default function ProtectedAdmin() {
  const { user, isPending } = useAuth();

  return isPending ? (
    <Loading />
  ) : user.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}
