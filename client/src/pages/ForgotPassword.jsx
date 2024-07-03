import { useState } from "react";
import { isEmail } from "../utils/isEmail";
import { Link } from "react-router-dom";
import leftArrow from "../assets/Simple-Left.png";
import MoviesAnimation from "../components/MoviesAnimation";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { LiaSpinnerSolid } from "react-icons/lia";
import { useMutation } from "@tanstack/react-query";
import { sendForgetPassword } from "../lib/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const {
    mutate: sendResetPassword,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: sendForgetPassword,
  });

  return (
    <div className="flex justify-start items-start h-[100vh]">
      {isSuccess ? (
        <div className="w-[60%] sm:px-[10vw] lg:px-[15vw]  h-full gap-5 flex flex-col items-center justify-center">
          <MdOutlineMarkEmailRead className="w-10 h-10 secondary-color bg-primary-color rounded-full p-2" />
          <h2 className="text-3xl font-primary">Check your email</h2>
          <p className="font-secondary text-[#384154] text-center">
            We have sent password reset link to <br />{" "}
            <span className="font-primary">{email}</span>
          </p>
          <Link
            to="/login"
            className="px-5 mt-4 font-primary flex bg-primary-color justify-center items-center gap-2"
          >
            <img src={leftArrow} alt="" width={30} />
            Back to login
          </Link>
        </div>
      ) : (
        <div className="w-[60%] sm:px-[10vw] lg:px-[15vw]  h-full gap-10 flex flex-col justify-center">
          <div className="">
            <Link
              to="/"
              className="bg-primary-color font-primary px-3 mb-10 flex justify-center items-center w-fit gap-2"
            >
              <img src={leftArrow} alt="" width={30} />
              <span>Back</span>
            </Link>
            <h2 className="text-3xl font-primary">Forgot you password?</h2>
            <p className="font-secondary text-[#384154]">
              Enter your email below to receive a password reset link
            </p>
          </div>

          <form className="flex flex-col gap-5">
            <span
              className={`text-red-500 text-center font-secondary -mt-5 ${
                isError ? "visible" : "invisible"
              }`}
            >
              {error?.message || "An error Occurred"}
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

            <button
              type="button"
              className="bg-secondary-color primary-color py-2 mt-4 font-primary disabled:bg-[#14213dbb]"
              disabled={!isEmail(email) || isPending}
              onClick={() => sendResetPassword(email)}
            >
              {isPending ? (
                <LiaSpinnerSolid className="m-auto animate-spin w-6 h-6" />
              ) : (
                "Send mail"
              )}
            </button>
          </form>

          <div className="bg-[#384154] h-[.5px]" />

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
      )}

      <MoviesAnimation />
    </div>
  );
}
