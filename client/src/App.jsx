import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import HomeAuth from "./pages/HomeAuth";
import Profile from "./pages/Profile";
import AddMovie from "./pages/AddMovie";
import AboutMovie from "./pages/AboutMovie";
import ProtectedHome from "./components/ProtectedHome";
import HiddenPages from "./components/HiddenPages";
import NotFound from "./pages/NotFound";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EditMovie from "./pages/EditMovie";
import DemoAboutMovie from "./pages/DemoAboutMovie";
import DashboardAdmin from "./pages/DashboardAdmin";
import ProtectedAdmin from "./components/ProtectedAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HiddenPages />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <Register /> },
      { path: "/password/forgot", element: <ForgotPassword /> },
      { path: "/password/reset", element: <ResetPassword /> },
      { path: "/demo/:id/:title", element: <DemoAboutMovie /> },
    ],
  },
  {
    path: "/",
    element: <ProtectedHome />,
    children: [{ index: true, element: <HomeAuth /> }],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      { path: "/profile", element: <Profile /> },
      { path: "/add-movie", element: <AddMovie /> },
      { path: "/edit-movie/:id/:movieName", element: <EditMovie /> },
      { path: "/movie/:id/:movieName", element: <AboutMovie /> },
      {
        path: "/dashboard",
        element: <ProtectedAdmin />,
        children: [{ index: true, element: <DashboardAdmin /> }],
      },
    ],
  },
  {
    element: <VerifyEmail />,
    path: "/email/verify/:code",
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
