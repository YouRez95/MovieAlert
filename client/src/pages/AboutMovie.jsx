import Navbar from "../components/Navbar";
import { FaCheckCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

import {
  ROMANTIC_CONTENT,
  SEXUAL_CONTENT,
  SUBSTANCE_USE,
  VIOLENCE,
} from "../data/contentWarning";
import WarningContent from "../components/WarningContent";
import Footer from "../components/Footer";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { aboutMovie } from "../lib/api";
import { ImSpinner2 } from "react-icons/im";
import { Helmet } from "react-helmet-async";

export default function AboutMovie() {
  const { id, movieName } = useParams();

  const {
    isPending,
    isError,
    isSuccess,
    error,
    data: movieData,
  } = useQuery({
    queryKey: ["about_movie", id, movieName],
    queryFn: () => aboutMovie(id, movieName),
  });

  return (
    <>
      <div className="container m-auto min-h-[90vh]">
        <Navbar />

        <Helmet>
          <title>{movieName} Movie Review | Movie Alert</title>
          <meta
            name="description"
            content={` Movie Alert | Find out the content warnings for ${movieName}.`}
          />
          <link
            rel="canonical"
            href={`${
              import.meta.env.VITE_APP_BASE_URL
            }/import Footer from '../components/Footer';
movie/${id}/${movieName.replaceAll(" ", "%20")}`}
          />
        </Helmet>

        {isPending && (
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
      </div>
      <Footer />
    </>
  );
}
