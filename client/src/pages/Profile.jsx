import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import { HiMiniXMark } from "react-icons/hi2";
import { CiCircleCheck } from "react-icons/ci";
import ProfileItems from "../components/ProfileMe";
import { useState } from "react";
import ProfileMe from "../components/ProfileMe";
import ProfileMovies from "../components/ProfileMovies";
import ProfileSessions from "../components/ProfileSessions";

export default function Profile() {
  const { user } = useAuth();
  const [active, setActive] = useState(
    localStorage.getItem("active-profile") || "profile"
  );

  function handleChangeActive(value) {
    setActive(value);
    localStorage.setItem("active-profile", value);
  }

  return (
    <div className="container m-auto">
      <Navbar />

      <div className="mt-10 gap-20 flex flex-col items-center">
        <div className="flex flex-col items-center">
          <img
            className="w-[100px] rounded-full"
            src={
              user.picture ||
              "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2113030492.1720396800&semt=sph"
            }
            alt=""
          />
          <div className="grid gap-2 text-center">
            <p className="font-primary">{user.firstName}</p>
            <p className="font-secondary">
              {user.email}
              {!user.verified && (
                <span className="flex bg-red-400 items-center gap-2 justify-center px-2 rounded-full">
                  <HiMiniXMark />
                  Not verified
                </span>
              )}

              {user.verified && (
                <span className="flex bg-green-400 items-center gap-2 justify-center px-2 rounded-full">
                  <CiCircleCheck />
                  Verified
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="flex gap-14 items-center max-w-[70vw] w-full justify-center border-b-[1px] font-secondary border-[#14213d36]">
          <span
            className={`${
              active === "profile"
                ? "border-b-4 border-[#14213D] text-[#14213D]"
                : "text-[#14213d7a]"
            }  text-xl px-4 cursor-pointer`}
            onClick={() => handleChangeActive("profile")}
          >
            Profile
          </span>
          <span
            className={`${
              active === "movies"
                ? "border-b-4 border-[#14213D] text-[#14213D]"
                : "text-[#14213d7a]"
            } text-xl px-4 cursor-pointer`}
            onClick={() => handleChangeActive("movies")}
          >
            Movies
          </span>
          <span
            className={`${
              active === "sessions"
                ? "border-b-4 border-[#14213D] text-[#14213D]"
                : "text-[#14213d7a]"
            } text-xl px-4 cursor-pointer`}
            onClick={() => handleChangeActive("sessions")}
          >
            Sessions
          </span>
        </div>
        {active === "profile" && <ProfileMe />}
        {active === "movies" && <ProfileMovies />}
        {active === "sessions" && <ProfileSessions />}
      </div>
    </div>
  );
}
