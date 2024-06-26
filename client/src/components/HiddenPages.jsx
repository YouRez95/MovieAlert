import { Navigate, Outlet } from "react-router-dom";

export default function HiddenPages() {
  const user = "youness";
  return !user ? <Outlet /> : <Navigate to="/" />;
}
