import { Outlet } from "react-router-dom";
import HomeNotAuth from "../pages/HomeNotAuth";
import { useUser } from "../context.js/UserContext";

export default function ProtectedHome() {
  const { user } = useUser();

  return user ? <Outlet /> : <HomeNotAuth />;
}
