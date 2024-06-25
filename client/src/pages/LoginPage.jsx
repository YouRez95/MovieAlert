import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import leftArrow from "../assets/Simple-Left.png";
import MoviesAnimation from "../components/MoviesAnimation";

export default function LoginPage() {
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
          <input
            type="email"
            required
            placeholder="johnDoe@gmail.com"
            className="outline-none border-[1.5px] border-[#14213D] py-2 px-2 font-secondary"
          />
          <input
            type="password"
            required
            placeholder="**********"
            className="outline-none border-[1.5px] border-[#14213D] py-2 px-2 font-secondary"
          />
          <Link
            to="/forgot-password"
            className="font-secondary text-[#384154] underline text-right"
          >
            Forgot Password ?
          </Link>

          <button className="bg-secondary-color primary-color py-2 mt-4 font-primary">
            Sign In
          </button>
        </form>

        <div className="bg-[#384154] h-[.5px]" />

        <button className="secondary-color flex justify-center items-center gap-2 py-2 font-primary border border-[#384154]">
          <FcGoogle className="mb-[3px]" />
          Sign in with google
        </button>

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
