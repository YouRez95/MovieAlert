import { useState } from "react";
import MyMovies from "./MyMovies";
import MoviesViewed from "./MoviesViewed";

export default function ProfileMovies() {
  const [active, setActive] = useState(
    localStorage.getItem("type-movie") || "Your Movies"
  );

  function handleChangeActive(value) {
    setActive(value);
    localStorage.setItem("type-movie", value);
  }

  return (
    <div className="-mt-10">
      <div className="bg-primary-color w-fit m-auto flex rounded-full font-primary relative">
        <div
          className={`px-6 py-2 flex items-center justify-center flex-2 rounded-full cursor-pointer z-10 ${
            active === "Your Movies" ? "primary-color" : "secondary-color"
          }`}
          onClick={() => handleChangeActive("Your Movies")}
        >
          Your Movies
        </div>
        <div
          className={`px-6 flex items-center justify-center flex-2 rounded-full cursor-pointer z-10 ${
            active === "Movies Viewed" ? "primary-color" : "secondary-color"
          }`}
          onClick={() => handleChangeActive("Movies Viewed")}
        >
          Movies Viewed
        </div>
        <div
          className={`absolute w-[50%] bg-secondary-color h-full rounded-full transition-all ${
            active === "Your Movies" ? "left-0" : "left-[50%]"
          }`}
        />
      </div>

      {active === "Your Movies" && <MyMovies />}

      {active === "Movies Viewed" && <MoviesViewed />}
    </div>
  );
}
