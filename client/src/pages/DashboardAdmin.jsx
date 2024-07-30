import { useRef, useState } from "react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import MoviesAdmin from "../components/MoviesAdmin";
import UsersAdmin from "../components/UsersAdmin";
import { BiSolidCameraMovie } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";

export default function DashboardAdmin() {
  const moviesRef = useRef();
  const usersRef = useRef();
  const [activeAdmin, setActiveAdmin] = useState(
    localStorage.getItem("active-A") || "Movies"
  );
  const [order, setOrder] = useState(localStorage.getItem("order-A") || "desc");
  const [max, setMax] = useState(localStorage.getItem("max-A") || "100");
  const [page, setPage] = useState(localStorage.getItem("page-A") || 1);

  const handleActiveSessionAsAdmin = (e) => {
    const value =
      e.target.getAttribute("data-value") ||
      e.target.parentNode.getAttribute("data-value");
    setActiveAdmin(value);
    localStorage.setItem("active-A", value);
  };

  const refreshMovies = () => {
    if (moviesRef.current) {
      moviesRef.current.refreshMovies();
    }
  };

  const refreshUsers = () => {
    if (usersRef.current) {
      usersRef.current.refreshUsers();
    }
  };

  return (
    <>
      <Layout>
        <Navbar />

        <div className="height-screen flex">
          <aside className="min-w-[70px] md:min-w-[200px] pr-1 border-r-2 h-full">
            <ul className="flex flex-col items-center my-7 gap-3 text-xl">
              <li
                data-value="Movies"
                className={`${
                  activeAdmin === "Movies" && "bg-[#14213D] primary-color"
                } font-primary cursor-pointer py-2 rounded-md w-full text-center flex justify-center items-center gap-2`}
                onClick={handleActiveSessionAsAdmin}
              >
                <BiSolidCameraMovie data-value="Movies" />
                <span className="hidden md:block" data-value="Movies">
                  Movies
                </span>
              </li>
              <li
                data-value="Users"
                className={`${
                  activeAdmin === "Users" && "bg-[#14213D] primary-color"
                } font-primary cursor-pointer py-2 rounded-md w-full text-center flex justify-center items-center gap-2`}
                onClick={handleActiveSessionAsAdmin}
              >
                <FaUser data-value="Users" />
                <span className="hidden md:block" data-value="Users">
                  Users
                </span>
              </li>
            </ul>
          </aside>
          <div className="flex-grow mt-20 relative">
            <div className="flex justify-center items-center gap-20">
              <select
                value={max}
                className="min-w-40 border-2 text-center text-xl py-2 px-1"
                onChange={(e) => {
                  setMax(e.target.value);
                  localStorage.setItem("max-A", e.target.value);
                  setPage(1);
                  localStorage.setItem("page-A", 1);
                }}
              >
                <option value="50">
                  50 {activeAdmin === "Movies" ? "movies" : "users"}
                </option>
                <option value="100">
                  100 {activeAdmin === "Movies" ? "movies" : "users"}
                </option>
                <option value="150">
                  150 {activeAdmin === "Movies" ? "movies" : "users"}
                </option>
                <option value="200">
                  200 {activeAdmin === "Movies" ? "movies" : "users"}
                </option>
              </select>

              <select
                className="min-w-40 border-2 text-center text-xl py-2 px-1"
                value={order}
                onChange={(e) => {
                  setOrder(e.target.value);
                  localStorage.setItem("order-A", e.target.value);
                }}
              >
                <option value="desc">Desc Order</option>
                <option value="asc">Asc Order</option>
              </select>

              <button
                onClick={
                  activeAdmin === "Movies" ? refreshMovies : refreshUsers
                }
                className="border-2 p-2"
                title="refresh"
              >
                <LuRefreshCw />
              </button>
            </div>
            {activeAdmin === "Movies" && (
              <MoviesAdmin
                ref={moviesRef}
                max={max}
                order={order}
                page={page}
                setPage={setPage}
              />
            )}
            {activeAdmin === "Users" && (
              <UsersAdmin
                ref={usersRef}
                max={max}
                order={order}
                page={page}
                setPage={setPage}
              />
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
