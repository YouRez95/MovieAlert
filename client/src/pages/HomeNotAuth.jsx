import { Link } from "react-router-dom";
import { RiMovie2Line } from "react-icons/ri";
import Layout from "../components/Layout";
import { IoSearch } from "react-icons/io5";
import { Helmet } from "react-helmet-async";
import { FaUserCheck } from "react-icons/fa6";
import CardProcess from "../components/CardProcess";
import { BiSolidCameraMovie } from "react-icons/bi";
import { useMutation } from "@tanstack/react-query";
import badge1 from "../assets/Badge_01.png";
import badge2 from "../assets/Badge_02.png";
import badge3 from "../assets/Badge_03.png";
import badge4 from "../assets/Badge_04.png";
import Footer from "../components/Footer";
import logo from "../assets/logo.png";
import frame from "../assets/Frame.png";
import { getSearchMovieDemo } from "../lib/api";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

export default function HomeNotAuth() {
  const [moviesSearchResult, setMoviesSearchResult] = useState([]);

  const { mutate: mutateSearch } = useMutation({
    mutationFn: getSearchMovieDemo,
    onSuccess: (data) => {
      setMoviesSearchResult(data);
    },
  });

  useEffect(() => {
    function addCokies() {
      const user_id = Cookies.get("user_id");
      if (!user_id) {
        Cookies.set("user_id", uuidv4());
      }
    }

    addCokies();
  }, []);

  function searchMovie(event) {
    const value = event.target.value;
    if (value.length > 0) {
      mutateSearch(value);
    } else {
      setMoviesSearchResult([]);
    }
  }

  return (
    <main className="min-h-[100vh] flex flex-col justify-between">
      <Helmet>
        <title>MovieAlert - Know the Content Warnings before you watch</title>
        <meta
          name="description"
          content="Discover content warnings for movies to make informed viewing choices."
        />
        <link rel="canonical" href={import.meta.env.VITE_APP_BASE_URL} />
      </Helmet>

      <div className="w-full h-[350px] md:h-[480px] relative overflow-hidden">
        <img
          src={frame}
          alt=""
          className="object-cover absolute w-full h-full"
        />

        <div className="bg-gradient-to-b from-[#14213d] via-[#14213d9c] from-10% to-[#3558a353] w-full h-full absolute" />
        <Layout>
          <div className="flex relative flex-col h-full">
            <header className="h-[70px] px-3">
              <div className="flex justify-between items-center h-full">
                <h1 className="primary-color flex items-center font-primary font-bold text-2xl sm:text-3xl lg:text-4xl">
                  <img src={logo} alt="MovieAllert" className="w-14 h-14" />
                  <span className="hidden md:block">MovieAlert</span>
                </h1>
                <Link
                  to="/login"
                  className="bg-primary-color px-4 sm:px-7 py-2 font-primary secondary-color"
                >
                  <span className="hidden md:block">Login/Register</span>
                  <span className="block md:hidden">Login</span>
                </Link>
              </div>
            </header>

            <div className="relative flex justify-center items-center flex-1 text-white max-w-[90%] m-auto font-primary text-[25px] sm:text-[30px] md:text-[40px] text-center mb-14">
              <h1>
                Check <span className="primary-color">movies</span> for content{" "}
                <span className="text-red-500">warnings</span> <br /> before you
                watch
              </h1>
            </div>
          </div>
        </Layout>
      </div>
      <div className="relative flex w-[80%] sm:w-[500px] md:w-[600px] h-[50px] sm:h-[55px] md:h-[66px] m-auto -mt-6 md:-mt-9">
        <button className="w-[20%] bg-secondary-color flex items-center justify-center">
          <IoSearch fontSize={40} color="#FCA311" />
        </button>
        <input
          placeholder="Search your movie"
          className="placeholder:text-[#14213d5a] capitalize placeholder:font-thin bg-primary-color w-[80%] h-full p-2 font-secondary outline-none text-2xl"
          type="text"
          onChange={searchMovie}
        />
        {moviesSearchResult.length > 0 && (
          <div className="w-full z-10 mt-1 bg-white shadow-md py-2 px-2 rounded-lg max-h-[37vh] overflow-y-auto absolute top-full">
            {moviesSearchResult.map((movie) => (
              <Link
                key={movie.id}
                to={`/demo/${movie.id}/${movie.movieName}`}
                className="w-full flex items-center gap-2 text-base sm:text-xl rounded-lg px-4 py-2 cursor-pointer hover:bg-slate-200 border-b"
              >
                <RiMovie2Line className="primary-color" />
                <span>{movie.movieName}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Layout>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-20 gap-20 px-3">
          <CardProcess
            bg="bg-primary-color"
            heading="Create your accont"
            icon={FaUserCheck}
            step="1"
            textColor="secondary-color"
            text="By creating your account you have the ability to see your free
                10 movies content warning."
            badge={badge1}
          />

          <CardProcess
            bg="bg-secondary-color"
            heading="Submit your first movie"
            icon={BiSolidCameraMovie}
            step="2"
            textColor="primary-color"
            text="By submiting your first movie you can watch another 10 movies, and earn your bronze badge."
            badge={badge2}
          />

          <CardProcess
            bg="bg-secondary-color"
            heading="Submit 3 additional movies"
            icon={BiSolidCameraMovie}
            step="3"
            textColor="primary-color"
            text="By submiting your 3 additional movie you can watch another 10 movies, and earn your silver badge."
            badge={badge3}
          />

          <CardProcess
            bg="bg-primary-color"
            heading="Submit 5 additional movies"
            icon={BiSolidCameraMovie}
            step="4"
            textColor="secondary-color"
            text="By submiting your 5 additional movie you can watch unlimited movies, and earn your Gold badge, and become one of the family."
            badge={badge4}
          />
        </div>
      </Layout>
      <Footer />
    </main>
  );
}
