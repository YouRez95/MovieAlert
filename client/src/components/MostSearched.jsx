import arrowImg from "../assets/Simple-Left.png";
import { Link } from "react-router-dom";
import Loading from "./Loading";

export default function MostSearched({ text, movies, isPending }) {
  return (
    <div className="">
      <div className="flex items-center justify-start gap-3">
        <img
          src={arrowImg}
          alt="arrow ->"
          className="w-8 md:w-10 h-10 md:h-12 rotate-180"
        />
        <h1 className="text-xl md:text-2xl font-primary secondary-color capitalize">
          {text}
        </h1>
      </div>

      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 place-items-center">
        {movies.length === 0 && (
          <div className="h-[200px] w-full flex items-center justify-center">
            <p className="text-3xl">No Movie Found</p>
          </div>
        )}

        {isPending && (
          <div className="h-[200px] w-full flex items-center justify-center">
            <Loading />
          </div>
        )}

        {movies.map((movie) => (
          <Link
            to={`movie/${movie._id}/${movie.title}`}
            key={movie._id}
            className="w-[90%] h-[80%] cursor-pointer lg:hover:scale-125 transition-all duration-300 relative hover:z-10 group"
          >
            <img
              src={movie.picture}
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
            <h2 className="absolute bottom-0 w-full min-h-[50px] bg-primary-color grid place-items-center font-primary rounded-b-md text-center text-sm md:text-base">
              {movie.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
