import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FcGoogle } from "react-icons/fc";
import { LiaSpinnerSolid } from "react-icons/lia";
import leftArrow from "../assets/Simple-Left.png";
import MoviesAnimation from "../components/MoviesAnimation";
import { login } from "../lib/api";
import { isEmail } from "../utils/isEmail";
import getGoogleOAuthURL from "../utils/getGoogleUrl";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    mutate: signIn,
    isPending,
    isError,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });

  return (
    <div className="flex justify-start items-start h-[100vh]">
      <div className="w-[60%] sm:px-[10vw] lg:px-[15vw]  h-full gap-10 flex flex-col justify-center">
        <div className="">
          <Link
            to="/"
            className="bg-primary-color font-primary px-3 mb-10 flex justify-center items-center w-fit gap-2"
          >
            <img src={leftArrow} alt="" width={30} />
            <span>Back</span>
          </Link>
          <h2 className="text-3xl font-primary">Welcome Back</h2>
          <p className="font-secondary text-[#384154]">
            Movie alert provides check for content warning in movie before
            watching, that help us to decide if a good t watch a movie by me
            self or with my family or not
          </p>
        </div>

        <form className="flex flex-col gap-5">
          <span
            className={`text-red-500 text-center font-secondary -mt-5 ${
              isError ? "visible" : "invisible"
            }`}
          >
            Invalid email or password
          </span>
          <input
            value={email}
            autoFocus
            type="email"
            required
            placeholder="johnDoe@gmail.com"
            className="outline-none border-[1.5px] border-[#14213D] py-2 px-2 font-secondary"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            value={password}
            type="password"
            required
            placeholder="**********"
            className="outline-none border-[1.5px] border-[#14213D] py-2 px-2 font-secondary"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && signIn({ email, password })}
          />
          <Link
            to="/password/forgot"
            className="font-secondary text-[#384154] underline ml-auto"
          >
            Forgot Password ?
          </Link>

          <button
            type="button"
            className="bg-secondary-color primary-color py-2 mt-4 font-primary disabled:bg-[#14213dbb]"
            disabled={!(isEmail(email) && password.length >= 8) || isPending}
            onClick={() => signIn({ email, password })}
          >
            {isPending ? (
              <LiaSpinnerSolid className="m-auto animate-spin w-6 h-6" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="bg-[#384154] h-[.5px]" />

        <Link
          to={getGoogleOAuthURL()}
          className="secondary-color flex justify-center items-center gap-2 py-2 font-primary border border-[#384154]"
        >
          <FcGoogle className="mb-[3px]" />
          Sign in with google
        </Link>

        <span>
          New to <span className="font-primary">MovieAlert</span>?{" "}
          <Link
            to="/register"
            className="font-secondary text-[#384154] underline"
          >
            Create an account
          </Link>
        </span>
      </div>

      <MoviesAnimation />
    </div>
  );
}
