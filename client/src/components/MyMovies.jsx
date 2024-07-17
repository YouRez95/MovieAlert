import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteMovie, getMyMovies } from "../lib/api";
import Loading from "./Loading";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { TfiTrash } from "react-icons/tfi";
import queryClient from "../config/queryClient";

const MAX_ITEMS_PER_PAGE = 10;

export default function MyMovies() {
  const [page, setPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);

  const {
    data: movies,
    isSuccess,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["my-movies", page],
    queryFn: () => getMyMovies(page),
  });

  const {
    mutate: handleDeleteMovie,
    isError: isErrorInDelete,
    error,
  } = useMutation({
    mutationFn: deleteMovie,
    onSuccess: () => {
      queryClient.invalidateQueries(["my-movies", page]);
    },
  });

  return (
    <div>
      <div
        className={`fixed w-[100vw] h-[100vh] top-0 left-0 z-50 grid place-items-center ${
          confirmDelete ? "visible" : "invisible"
        }`}
      >
        <div
          className="w-full h-full bg-[#14213ddf] absolute"
          onClick={() => {
            setMovieToDelete(null);
            setConfirmDelete(false);
          }}
        />
        <div className="relative max-w-[900px] min-h-[200px] bg-primary-color p-2 flex flex-col gap-4 items-center justify-center m-3 rounded-lg">
          <p className="font-primary">
            Are you sure you want to delete this movie? This action cannot be
            undone.
          </p>
          <div className="flex gap-8">
            <button
              className="bg-secondary-color font-secondary-bold p-2 rounded-md primary-color"
              onClick={() => {
                setMovieToDelete(null);
                setConfirmDelete(false);
              }}
            >
              Cancel
            </button>
            <button
              className="bg-secondary-color font-secondary-bold p-2 rounded-md primary-color"
              onClick={() => {
                handleDeleteMovie({
                  id: movieToDelete.id,
                  title: movieToDelete.title,
                });
                setMovieToDelete(null);
                setConfirmDelete(false);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
      {isPending && <Loading />}
      {isSuccess && movies.countMovies > 0 && (
        <div className="">
          {/* Movies */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 px-10 mt-9">
            {movies.movies.map((movie) => (
              <div key={movie._id} className="cursor-pointer relative group">
                <div className="absolute w-full gap-4 flex items-center justify-center rounded-md h-full bg-[#14213d8f] opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Link
                    to={`/edit-movie/${movie._id}/${movie.title}`}
                    className="bg-secondary-color rounded-full"
                  >
                    <FaPencil className="w-10 h-10 border rounded-full p-2 primary-color" />
                  </Link>
                  <Link
                    to={`/movie/${movie._id}/${movie.title}`}
                    className="bg-secondary-color rounded-full"
                  >
                    <IoEyeOutline className="w-10 h-10 border rounded-full p-2 primary-color" />
                  </Link>
                </div>
                <img
                  src={movie.picture}
                  alt=""
                  className="w-full h-full object-cover rounded-md "
                />
                <button
                  className="bg-primary-color absolute top-1 right-1 p-1 rounded-md"
                  onClick={() => {
                    setMovieToDelete({ id: movie._id, title: movie.title });
                    setConfirmDelete(true);
                  }}
                >
                  <TfiTrash className="w-7 h-7 secondary-color" />
                </button>
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
