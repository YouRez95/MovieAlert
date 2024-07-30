import { useMutation } from "@tanstack/react-query";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { deleteMovie, getmoviesAdmin } from "../lib/api";
import { formatDate } from "../utils/date";
import { FaRegEye } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const MoviesAdmin = forwardRef((props, ref) => {
  const { max, order, page, setPage } = props;

  const {
    mutate: getMovies,
    data: movies,
    isError,
    error,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ["movies", max, order, page],
    mutationFn: () => getmoviesAdmin({ page, max, order }),
  });

  const {
    mutate: handleDeleteMovie,
    isError: isErrorInDelete,
    error: errorInDelete,
  } = useMutation({
    mutationFn: deleteMovie,
    onSuccess: () => {
      getMovies();
    },
  });

  useEffect(() => {
    getMovies();
  }, [page, order, max]);

  const handleDeleteMovieByAdmin = (movie) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this movie? This action cannot be undone."
    );
    if (confirmed) {
      handleDeleteMovie({
        id: movie._id,
        title: movie.title,
      });
    }
  };

  useImperativeHandle(ref, () => ({
    refreshMovies: getMovies,
  }));

  return (
    <div className="">
      <div>
        <table className="w-full mx-9 my-3">
          <thead>
            <tr className="flex justify-between border-b-4 items-start p-1 bg-[#14213d10] font-primary text-lg">
              <th className="flex-1 flex">Movie</th>
              <th className="flex-1">Created on</th>
              <th className="flex-1">Viewed</th>
              <th className="flex-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isSuccess &&
              movies.allMovies.map(({ movie, views }) => (
                <tr
                  className="flex justify-between items-center p-1 border-2 cursor-pointer font-secondary-bold hover:scale-105 transition-all relative"
                  key={movie._id}
                >
                  <td className="flex items-center gap-2 flex-1">
                    <img
                      src={movie.picture}
                      alt={movie.title}
                      className="w-16 h-16 object-cover"
                    />
                    {movie.title}
                  </td>
                  <td className="flex-1 text-center">
                    {formatDate(movie.createdAt)}
                  </td>
                  <td className="flex-1 text-center">{views}</td>
                  <td className="flex-1 gap-3 flex justify-center ">
                    <Link
                      to={`/movie/${movie._id}/${movie.title}`}
                      className="border-2 p-2 rounded-full cursor-pointer group hover:bg-[#14213D]"
                    >
                      <FaRegEye className="group-hover:text-[#FCA311]" />
                    </Link>
                    <Link
                      to={`/edit-movie/${movie._id}/${movie.title}`}
                      className="border-2 p-2 rounded-full cursor-pointer group hover:bg-[#14213D]"
                    >
                      <FaPencil className="group-hover:text-[#FCA311]" />
                    </Link>
                    <span
                      className="border-2 p-2 rounded-full cursor-pointer group hover:bg-[#14213D]"
                      onClick={() => handleDeleteMovieByAdmin(movie)}
                    >
                      <AiFillDelete className="group-hover:text-[#FCA311]" />
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {isSuccess && (
        <div className="flex gap-2 py-10 items-center justify-center w-full font-primary">
          <span>Page</span>
          <select
            className="border-2 py-4 px-3"
            value={page}
            onChange={(e) => {
              setPage(e.target.value);
              localStorage.setItem("page-A", e.target.value);
            }}
          >
            {Array.from(
              { length: Math.ceil(movies.countMovies / max) },
              (_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              )
            )}
          </select>
          <span>Of {Math.ceil(movies.countMovies / max)}</span>
        </div>
      )}
    </div>
  );
});

export default MoviesAdmin;
