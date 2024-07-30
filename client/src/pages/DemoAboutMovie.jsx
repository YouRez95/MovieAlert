import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { aboutMovieDemo } from "../lib/api";
import Cookies from "js-cookie";
import logo from "../assets/logo.png";
import {
  ROMANTIC_CONTENT,
  SEXUAL_CONTENT,
  SUBSTANCE_USE,
  VIOLENCE,
} from "../data/contentWarning";
import WarningContent from "../components/WarningContent";
import { ImSpinner2 } from "react-icons/im";
import { Helmet } from "react-helmet-async";
import Layout from "../components/Layout";
import { useEffect } from "react";

export default function DemoAboutMovie() {
  const user_id_storage = localStorage.getItem("user_id");
  const { id, title } = useParams();
  const user_id = Cookies.get("user_id");
  const {
    data: movieData,
    isError,
    error,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["demo", id, title],
    queryFn: () => aboutMovieDemo({ id, title, user_id }),
    enabled: !!user_id && !user_id_storage,
  });

  useEffect(() => {
    if (
      isSuccess ||
      error?.message === "Login or create account to see another movies"
    ) {
      localStorage.setItem("user_id", true);
    }
  }, [isSuccess]);

  return (
    <Layout>
      <Helmet>
        <title>{title} Movie Review | Movie Alert</title>
        <meta
          name="description"
          content={` Movie Alert | Find out the content warnings for ${title}.`}
        />
        <link
          rel="canonical"
          href={`${
            import.meta.env.VITE_APP_BASE_URL
          }/import Footer from '../components/Footer';
          movie/${id}/${title.replaceAll(" ", "%20")}`}
        />
      </Helmet>
      <header className="h-[70px] px-3">
        <div className="flex justify-between items-center h-full">
          <Link to="/">
            <h1 className="primary-color flex items-center font-primary font-bold text-2xl sm:text-3xl lg:text-4xl">
              <img src={logo} alt="MovieAllert" className="w-14 h-14" />
              <span className="hidden md:block">MovieAlert</span>
            </h1>
          </Link>
          <Link
            to="/login"
            className="bg-primary-color px-4 sm:px-7 py-2 font-primary secondary-color"
          >
            <span className="hidden md:block">Login/Register</span>
            <span className="block md:hidden">Login</span>
          </Link>
        </div>
      </header>

      {user_id_storage && (
        <div className="height-screen flex items-center justify-center">
          <p className="font-primary text-3xl">
            Login or create account to see another movies
          </p>
        </div>
      )}

      {isPending && !user_id_storage && (
        <div className="height-screen flex items-center justify-center">
          <ImSpinner2 className="animate-spin w-12 h-12" />
        </div>
      )}

      {isError && (
        <div className="height-screen flex items-center justify-center">
          <p className="font-primary text-3xl">{error.message}</p>
        </div>
      )}

      {isSuccess && (
        <article className="mt-20 px-4">
          <div className="flex flex-col md:flex-row items-center gap-2 justify-center md:justify-start">
            <h1 className="text-3xl font-primary capitalize secondary-color">
              {movieData.title}
            </h1>
            <div>
              <span className="bg-primary-color px-1 secondary-color rounded-md font-primary pt-1">
                {movieData.year}
              </span>{" "}
              -{" "}
              <span className="bg-secondary-color px-1 primary-color rounded-md font-secondary">
                {movieData.genre}
              </span>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 ssm:grid-cols-2 md:grid-cols-3 gap-y-10">
            <div className="flex row-span-2 items-center flex-col w-fit h-fit gap-3 col-auto ssm:col-span-2 md:col-auto m-auto md:m-0">
              <img src={movieData.picture} alt="" className="max-w-[300px]" />
              <p className="font-primary">
                Created by: {movieData.userId.firstName}{" "}
                {movieData.userId.lastName}
              </p>
              <p className="font-secondary">{movieData.description}</p>
            </div>
            <WarningContent
              text="Violence"
              typeContent={VIOLENCE}
              contentWarning={movieData.contentWarning}
            />

            <WarningContent
              text="Sexual Content"
              typeContent={SEXUAL_CONTENT}
              contentWarning={movieData.contentWarning}
            />

            <WarningContent
              text="Romantic Content"
              typeContent={ROMANTIC_CONTENT}
              contentWarning={movieData.contentWarning}
            />
            <WarningContent
              text="Substance Use"
              typeContent={SUBSTANCE_USE}
              contentWarning={movieData.contentWarning}
            />
          </div>
        </article>
      )}
    </Layout>
  );
}
// 900461118
