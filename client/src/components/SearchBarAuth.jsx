import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { RiMovie2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { getSearchMovie } from "../lib/api";

const movies = [
  "The Shawshank Redemption",
  "The Godfather",
  "The Dark Knight",
  "Pulp Fiction",
  "Forrest Gump",
  "Inception",
  "The Matrix",
  "Fight Club",
  "The Lord of the Rings: The Return of the King",
  "The Empire Strikes Back",
  "The Godfather Part II",
  "The Lord of the Rings: The Fellowship of the Ring",
  "Interstellar",
  "Se7en",
  "Gladiator",
  "Jurassic Park",
  "The Lion King",
  "Star Wars",
  "The Silence of the Lambs",
  "Saving Private Ryan",
  "The Green Mile",
  "Braveheart",
  "Terminator 2: Judgment Day",
  "Schindler's List",
  "The Usual Suspects",
  "The Departed",
  "Back to the Future",
  "Alien",
  "Aliens",
  "Avatar",
  "The Avengers",
  "Titanic",
  "Die Hard",
  "The Prestige",
  "The Dark Knight Rises",
  "Mad Max: Fury Road",
  "Whiplash",
  "Django Unchained",
  "The Wolf of Wall Street",
  "The Social Network",
  "Harry Potter and the Sorcerer's Stone",
  "Harry Potter and the Deathly Hallows: Part 2",
  "Spider-Man: Into the Spider-Verse",
  "Coco",
  "WALL-E",
  "Finding Nemo",
  "Toy Story",
  "Toy Story 3",
  "Inside Out",
  "Up",
];
const moviesLowercase = movies.map((movie) => movie.toLowerCase());

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
      <div className="w-[50%] relative">
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
        <div className="w-[49%] mt-1 bg-white shadow-md py-2 px-2 rounded-lg max-h-[37vh] overflow-y-auto absolute top-[60px]">
          {resultSearch.map((movie) => (
            <Link
              key={movie.id}
              to={`movie/${movie.id}/${movie.movieName}`}
              className="w-full flex items-center gap-2 text-xl rounded-lg px-4 py-2 cursor-pointer hover:bg-slate-200 border-b"
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
