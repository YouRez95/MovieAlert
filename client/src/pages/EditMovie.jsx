import InputMovie from "../components/InputMovie";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import { FcAddImage } from "react-icons/fc";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import {
  ROMANTIC_CONTENT,
  SEXUAL_CONTENT,
  SUBSTANCE_USE,
  VIOLENCE,
} from "../data/contentWarning";
import { useMutation, useQuery } from "@tanstack/react-query";
import { aboutMovie, editMovie } from "../lib/api";
import { LiaSpinnerSolid } from "react-icons/lia";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function EditMovie() {
  const navigate = useNavigate();
  const { id, movieName } = useParams();
  const [contentWarning, setContentWarning] = useState([]);
  const [inputsData, setInputsData] = useState({
    title: "",
    year: "",
    genre: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [movieImage, setMovieImage] = useState(null);
  const [errorForm, setErrorForm] = useState("");

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

  function inputDataHandler(e) {
    setInputsData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function imageChangeHandler(e) {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setMovieImage(e.target.files[0]);
    }
  }

  function contentSelectedHandler(e) {
    const value = e.target.innerText;
    setContentWarning((prevContent) => {
      if (prevContent.includes(value)) {
        return prevContent.filter((content) => content !== value);
      }
      return [...prevContent, value];
    });
  }

  const {
    mutate: handleEditMovie,
    isError: isErrorEdit,
    error: errorEdit,
    isPending: pendingEdit,
    isSuccess: successEdit,
  } = useMutation({
    mutationFn: editMovie,
    onSuccess: () => {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    },
  });

  function submitFormHandler(e) {
    e.preventDefault();
    if (!Object.values(inputsData).every(Boolean) || !image) {
      setErrorForm("title, year, genre, description and image are required");
      return;
    }
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (movieImage && !allowedTypes.includes(movieImage.type)) {
      setErrorForm(
        "Invalid image type. Please upload an image file (jpeg, png, or jpg)."
      );
      return;
    }
    setErrorForm("");
    const formData = new FormData(e.target);
    if (movieImage) {
      formData.append("movieImage", movieImage);
    }
    formData.append("contentWarning", contentWarning);

    handleEditMovie({ formData, id, movieName });
  }

  useEffect(() => {
    if (isSuccess && movieData) {
      setInputsData((prev) => ({
        title: movieData.title,
        year: movieData.year,
        genre: movieData.genre,
        description: movieData.description,
      }));
      setImage(movieData.picture);
      setContentWarning((prev) => [...prev, ...movieData.contentWarning]);
    }
  }, [isSuccess, movieData]);

  return (
    <Layout>
      <Navbar />

      {isError && (
        <h1 className="flex items-center justify-center height-screen font-primary text-3xl">
          {error.message}
        </h1>
      )}

      {isSuccess && (
        <div className="my-20 mx-6">
          <h1 className="font-primary text-2xl">ADD MOVIE...</h1>

          <form
            onSubmit={submitFormHandler}
            className="mt-10 flex flex-col gap-5"
          >
            <div className="md:flex justify-between">
              <div className="flex-1 grid gap-5 h-fit">
                <InputMovie
                  type="text"
                  text="Movie Title"
                  name="title"
                  value={inputsData.title}
                  onChange={inputDataHandler}
                />
                <InputMovie
                  type="number"
                  name="year"
                  text="Release Year"
                  value={inputsData.year}
                  onChange={inputDataHandler}
                />
                <InputMovie
                  type="text"
                  name="genre"
                  text="Genre"
                  value={inputsData.genre}
                  onChange={inputDataHandler}
                />
              </div>

              <div className="flex-1 flex items-center md:justify-center mt-4 md:mt-0">
                <div
                  className={`max-w-[70%] gap-3 h-[400px] md:h-[300px] w-full flex flex-col ${
                    image ? "items-start" : "items-center"
                  } justify-center relative ${!image && "bg-gray-100"}`}
                >
                  {image && (
                    <img
                      src={image}
                      alt="movie image"
                      className="w-[300px] h-[400px] rounded-md"
                    />
                  )}
                  <input
                    type="file"
                    onChange={imageChangeHandler}
                    className="w-full h-full opacity-0 absolute"
                  />
                  {!image && (
                    <>
                      <p className="font-secondary">Add picture of the movie</p>
                      <FcAddImage fontWeight={200} className="w-20 h-20" />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="">
              <h2 className="font-primary text-xl">Content warning</h2>
              <div className="font-secondary grid gap-3">
                <div className="mt-2 ml-4">
                  <h3 className="text-lg">Violence</h3>
                  <div className="flex flex-wrap gap-3 max-w-[900px]">
                    {VIOLENCE.map((violence) => (
                      <Button
                        key={violence.id}
                        description={violence.description}
                        type="button"
                        contentWarning={contentWarning}
                        onClick={(e) => contentSelectedHandler(e)}
                      >
                        {violence.content}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="mt-2 ml-4">
                  <h3 className="text-lg">Sexual Content</h3>
                  <div className="flex flex-wrap gap-3 max-w-[900px]">
                    {SEXUAL_CONTENT.map((violence) => (
                      <Button
                        key={violence.id}
                        description={violence.description}
                        type="button"
                        contentWarning={contentWarning}
                        onClick={(e) => contentSelectedHandler(e)}
                      >
                        {violence.content}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="mt-2 ml-4">
                  <h3 className="text-lg">Romantic Content</h3>
                  <div className="flex flex-wrap gap-3 max-w-[900px]">
                    {ROMANTIC_CONTENT.map((violence) => (
                      <Button
                        key={violence.id}
                        description={violence.description}
                        type="button"
                        contentWarning={contentWarning}
                        onClick={(e) => contentSelectedHandler(e)}
                      >
                        {violence.content}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="mt-2 ml-4">
                  <h3 className="text-lg">Substance Use</h3>
                  <div className="flex flex-wrap gap-3 max-w-[900px]">
                    {SUBSTANCE_USE.map((violence) => (
                      <Button
                        key={violence.id}
                        description={violence.description}
                        type="button"
                        contentWarning={contentWarning}
                        onClick={(e) => contentSelectedHandler(e)}
                      >
                        {violence.content}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <textarea
              name="description"
              value={inputsData.description}
              onChange={inputDataHandler}
              id=""
              cols="20"
              rows="6"
              placeholder="Please provide a brief summary or details about the movie scene"
              className="border p-2 resize-none outline-none"
            ></textarea>

            {(errorForm || isErrorEdit) && (
              <span className="text-red-500 text-center font-secondary">
                {errorForm ||
                  errorEdit?.message ||
                  errorEdit?.errors[0].message ||
                  "Error Occured"}
              </span>
            )}
            {!successEdit && (
              <button
                type="submit"
                className="mr-auto bg-secondary-color ml-5 primary-color py-2 px-7 mt-7 rounded-lg"
                disabled={isPending || successEdit}
              >
                {isPending ? (
                  <LiaSpinnerSolid className="m-auto animate-spin w-6 h-6" />
                ) : (
                  "Edit Movie"
                )}
              </button>
            )}
            {successEdit && (
              <button
                className="mr-auto bg-green-700 text-white font-secondary ml-5 py-2 px-7 mt-7 rounded-lg flex items-center justify-center gap-2"
                disabled
              >
                <FaCheckCircle className="" />
                Movie Edited Succesfully...
              </button>
            )}
          </form>
        </div>
      )}
    </Layout>
  );
}
