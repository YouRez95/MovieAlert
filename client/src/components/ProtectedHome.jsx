import { Outlet } from "react-router-dom";
import HomeNotAuth from "../pages/HomeNotAuth";

export default function ProtectedHome() {
  const user = "youness";

  return user ? <Outlet /> : <HomeNotAuth />;
}
