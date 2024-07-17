import { useQuery } from "@tanstack/react-query";
import { getMoviesHistory } from "../lib/api";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";

const MAX_ITEMS_PER_PAGE = 10;

export default function MoviesViewed() {
  const [page, setPage] = useState(1);

  const {
    data: movies,
    isSuccess,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["my-views", page],
    queryFn: () => getMoviesHistory(page),
  });

  return (
    <div>
      {isPending && <Loading />}
      {isSuccess && movies.countMovies > 0 && (
        <div className="">
          {/* Movies */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 px-10 mt-9">
            {movies.movies.map((movie) => (
              <div
                key={movie._id}
                className="cursor-pointer transition-all duration-300 relative group"
              >
                <div className="absolute w-full gap-4 flex items-center justify-center rounded-md h-full bg-[#14213d8f] opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Link
                    to={`/movie/${movie.movieId._id}/${movie.movieId.title}`}
                    className="bg-secondary-color rounded-full"
                  >
                    <IoEyeOutline className="w-10 h-10 border rounded-full p-2 primary-color" />
                  </Link>
                </div>
                <img
                  src={movie.movieId.picture}
                  alt={movie.movieId.title}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ))}
          </div>
          {/* Pages */}
          {isSuccess && movies.countMovies / MAX_ITEMS_PER_PAGE > 1 && (
            <div className="my-10 flex justify-center items-center gap-10">
              {Array.from(
                { length: Math.ceil(movies.countMovies / MAX_ITEMS_PER_PAGE) },
                (_, index) => (
                  <div
                    key={index}
                    onClick={() => setPage(index + 1)}
                    className={`w-9 h-9 font-secondary cursor-pointer flex items-center justify-center rounded-full border ${
                      page === index + 1
                        ? "bg-secondary-color primary-color"
                        : "bg-gray-100"
                    }`}
                  >
                    {index + 1}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
