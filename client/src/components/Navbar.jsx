import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import useAuth, { AUTH } from "../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../lib/api";
import queryClient from "../config/queryClient";
import { BiCameraMovie } from "react-icons/bi";
import { CgMenuGridO } from "react-icons/cg";
import { IoIosAdd } from "react-icons/io";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { useState } from "react";

export default function Navbar() {
  const { user } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);

  const { mutate: signOut } = useMutation({
    mutationFn: logout,
    onMutate: async () => {
      await queryClient.cancelQueries();
    },
    onSettled: () => {
      window.location.replace("/");
      queryClient.clear();
    },
  });

  if (!user) return <div className="h-[70px]"></div>;

  return (
    <header className="flex justify-between items-center h-[70px] px-3 secondary-color">
      <h1 className="font-primary text-3xl flex items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Movie Alert" className="w-16 h-16 -mt-2" />
          <span className="hidden md:flex">MovieAlert</span>
        </Link>
      </h1>
      <div className="hidden md:flex gap-10 items-center secondary-color">
        {user.role === "admin" && (
          <button className="relative w-fit group">
            <div className="h-[1.5px] bg-secondary-color absolute bottom-0 w-full" />
            <div className="h-[4px] bg-secondary-color absolute bottom-0 w-0 group-hover:w-full transition-all" />
            <Link
              to="/dashboard"
              className="font-secondary capitalize px-1 py-3"
            >
              Dashboard
            </Link>
          </button>
        )}
        <button className="relative w-fit group">
          <div className="h-[1.5px] bg-secondary-color absolute bottom-0 w-full" />
          <div className="h-[4px] bg-secondary-color absolute bottom-0 w-0 group-hover:w-full transition-all" />
          <Link to="/add-movie" className="font-secondary capitalize px-1 py-3">
            add movie..
          </Link>
        </button>
        {user && (
          <div className="flex gap-1 bg-secondary-color primary-color px-2 rounded-md font-primary">
            <BiCameraMovie className="w-5 h-5 mt-[1.5px]" />
            {user?.badge < 4 ? user?.badge * 10 - user?.moviesViewed : "Inf"}
          </div>
        )}
        <button
          className="text-sm font-primary rounded-full border overflow-hidden border-[#14213D] relative group"
          onClick={signOut}
        >
          <div className="absolute bg-secondary-color w-full h-full right-0 rounded-full transition-all -bottom-full group-hover:bottom-0" />
          <span className="w-full h-full block px-6 py-2 rounded-full relative secondary-color transition-all group-hover:text-[#FCA311]">
            Logout
          </span>
        </button>

        <div className="font-primary w-8 h-8 rounded-full overflow-hidden bg-primary-color secondary-color">
          <Link
            to={`/profile`}
            className="w-full h-full flex items-center justify-center"
          >
            {!user.picture && (
              <span>{user.firstName.slice(0, 1).toUpperCase()}</span>
            )}

            {user.picture && (
              <img src={user.picture} alt="" className="rouned-full" />
            )}
          </Link>
        </div>
      </div>

      <div className="relative flex items-center gap-3 md:hidden">
        {user && (
          <div className="flex text-xl items-center justify-center font-secondary bg-secondary-color primary-color px-2 rounded-md">
            <BiCameraMovie className="w-6 h-6" />
            <span className="">{user?.badge * 10 - user?.moviesViewed}</span>
          </div>
        )}
        <CgMenuGridO
          className="w-10 h-10 cursor-pointer"
          onClick={() => setOpenMenu((prev) => !prev)}
        />

        {openMenu && (
          <div className="absolute top-full mt-3 rounded-full border bg-white w-fit h-fit right-0 z-50 shadow-lg flex flex-col items-center justify-center gap-4 p-2">
            <div className="font-secondary rounded-full w-[40px] h-[40px]">
              {" "}
              <Link to={`/profile`}>
                {!user.picture && (
                  <span className="w-full h-full flex justify-center items-center bg-gray-200 rounded-full font-primary text-xl">
                    {user.firstName.slice(0, 1).toUpperCase()}
                  </span>
                )}
                {user.picture && (
                  <img
                    src={user.picture}
                    alt="profile"
                    className="overflow-hidden rounded-full object-cover"
                  />
                )}
              </Link>
            </div>
            <button className="rounded-full w-[40px] h-[40px] p-1 bg-primary-color">
              <Link to="/add-movie" className="">
                <IoIosAdd className="w-full h-full" />
              </Link>
            </button>
            <button
              className="rounded-full w-[40px] h-[40px] p-1 bg-primary-color"
              onClick={signOut}
            >
              <LiaSignOutAltSolid className="w-full h-full" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
