import { Outlet } from "react-router-dom";
import HomeNotAuth from "../pages/HomeNotAuth";
import useAuth from "../hooks/useAuth";

export default function ProtectedHome() {
  const { user, isPending } = useAuth();

  return isPending ? "Loading" : user ? <Outlet /> : <HomeNotAuth />;
}
