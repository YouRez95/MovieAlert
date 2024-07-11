import arrowImg from "../assets/Simple-Left.png";
import { Link } from "react-router-dom";

export default function MostSearched({ text, movies }) {
  return (
    <div className="">
      <div className="flex items-center justify-start gap-3">
        <img src={arrowImg} alt="arrow ->" className="w-10 h-12 rotate-180" />
        <h1 className="text-2xl font-primary secondary-color capitalize">
          {text}
        </h1>
      </div>

      <div className="flex overflow-x-auto justify-start items-center gap-4 h-[370px] px-10 -mt-9">
        {movies.map((movie) => (
          <Link
            to={`movie/${movie._id}/${movie.title}`}
            key={movie._id}
            className="h-[70%] cursor-pointer hover:scale-125 transition-all duration-300 relative hover:z-10 group"
          >
            <img
              src={movie.picture}
              alt=""
              className="w-full h-full min-w-[200px] object-cover rounded-md"
            />
            <h2 className="absolute bottom-0 bg-primary-color text-center font-primary rounded-b-md ">
              {movie.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
