import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeNotAuth from "./pages/HomeNotAuth";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import { action as registerAction } from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import HomeAuth from "./pages/HomeAuth";
import Profile from "./pages/Profile";
import AddMovie from "./pages/AddMovie";
import AboutMovie from "./pages/AboutMovie";
import ProtectedHome from "./components/ProtectedHome";
import HiddenPages from "./components/HiddenPages";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HiddenPages />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <Register />, action: registerAction },
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
      { path: "/movie/:movieName", element: <AboutMovie /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
