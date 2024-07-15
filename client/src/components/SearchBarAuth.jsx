import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { RiMovie2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { getSearchMovie } from "../lib/api";

export default function SearchBarAuth() {
  const [searchMovie, setSearchMovie] = useState("");
  const [resultSearch, setResultSearch] = useState([]);
  const { mutate: getMovies } = useMutation({
    mutationKey: ["search_movies", searchMovie],
    mutationFn: getSearchMovie,
    onSuccess: (data) => setResultSearch(data),
    onError: () => setResultSearch([]),
  });

  function handleChangeMovieName(e) {
    setSearchMovie(e.target.value);
    if (e.target.value.length > 0) {
      // Get the movie from the cache
      getMovies(e.target.value);
    } else {
      setResultSearch([]);
    }
  }

  return (
    <div className="mt-10 w-full flex flex-col items-center relative z-20">
      <div className="w-[80%] max-w-[500px] relative">
        <CiSearch className="absolute left-2 top-[50%] -translate-y-[50%] w-7 h-7" />
        <input
          name="searchMovie"
          value={searchMovie}
          onChange={handleChangeMovieName}
          type="text"
          className="w-full h-14 outline-none border border-1 text-xl font-secondary pl-14 rounded-full shadow-md"
          placeholder="Search Your Movie..."
        />
        {searchMovie.length > 0 && (
          <MdClear
            className="absolute right-3 top-[50%] -translate-y-[50%] w-7 h-7 text-gray-500 cursor-pointer"
            onClick={() => {
              setSearchMovie("");
              setResultSearch([]);
            }}
          />
        )}
      </div>
      {resultSearch.length > 0 && (
        <div className="w-[80%] max-w-[500px] mt-1 bg-white shadow-md py-2 px-2 rounded-lg max-h-[37vh] overflow-y-auto absolute top-[60px]">
          {resultSearch.map((movie) => (
            <Link
              key={movie.id}
              to={`movie/${movie.id}/${movie.movieName}`}
              className="w-full flex items-center gap-2 text-base sm:text-xl rounded-lg px-4 py-2 cursor-pointer hover:bg-slate-200 border-b"
            >
              <RiMovie2Line className="primary-color" />
              <span>{movie.movieName}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
