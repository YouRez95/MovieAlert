import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context.js/UserContext";

export default function HiddenPages() {
  const { user } = useUser();
  return !user ? <Outlet /> : <Navigate to="/" />;
}
