import { useState } from "react";
import { Form, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoCheckmarkOutline } from "react-icons/io5";
import { BsX } from "react-icons/bs";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import leftArrow from "../assets/Simple-Left.png";
import MoviesAnimation from "../components/MoviesAnimation";

export default function Register() {
  const [typePassword, setTypePassword] = useState("password");
  const [passwordLength, setPasswordLength] = useState(false);
  const [passwordLetters, setPasswordLetters] = useState(false);

  function validatePassword(e) {
    const password = e.target.value;
    if (password.length > 8) {
      setPasswordLength(true);
    } else {
      setPasswordLength(false);
    }

    const pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    );

    if (pattern.test(password)) {
      setPasswordLetters(true);
    } else {
      setPasswordLetters(false);
    }
  }

  return (
    <div className="flex justify-start items-start h-[100vh]">
      <MoviesAnimation />
      <div className="w-[60%] sm:px-[10vw] lg:px-[15vw]  h-full gap-10 flex flex-col justify-center">
        <div className="">
          <Link
            to="/"
            className="bg-primary-color font-primary px-3 mb-10 flex justify-center items-center w-fit gap-2"
          >
            <img src={leftArrow} alt="" width={30} />
            <span>Back</span>
          </Link>
          <h2 className="text-3xl font-primary">
            Welcome to <span className="primary-color">MovieAlert</span>
          </h2>
          <p className="font-secondary text-[#384154]">
            Movie alert provides check for content warning in movie before
            watching, that help us to decide if a good t watch a movie by me
            self or with my family or not
          </p>
        </div>

        <Form method="POST" className="flex flex-col gap-5">
          <input
            type="email"
            name="email"
            required
            placeholder="email address"
            className="outline-none border-[1.5px] border-[#14213D] py-2 px-2 font-secondary"
          />
          <input
            type="text"
            name="firstName"
            required
            placeholder="First Name"
            className="outline-none border-[1.5px] border-[#14213D] py-2 px-2 font-secondary"
          />
          <input
            type="text"
            name="lastName"
            required
            placeholder="Last Name"
            className="outline-none border-[1.5px] border-[#14213D] py-2 px-2 font-secondary"
          />
          <div className="relative">
            <input
              type={typePassword}
              name="password"
              required
              placeholder="Password"
              className="outline-none border-[1.5px] border-[#14213D] py-2 px-2 font-secondary w-full"
              onChange={validatePassword}
            />
            {typePassword === "password" && (
              <GoEyeClosed
                className="absolute right-5 select-none cursor-pointer top-[50%] -translate-y-[50%] w-6 h-6"
                onClick={() => setTypePassword("text")}
              />
            )}
            {typePassword === "text" && (
              <GoEye
                className="absolute right-5 select-none cursor-pointer top-[50%] -translate-y-[50%] w-6 h-6"
                onClick={() => setTypePassword("password")}
              />
            )}
          </div>
          <div className="flex flex-col">
            <span className="flex items-center gap-2 text-[#38415496]">
              {passwordLength ? <IoCheckmarkOutline /> : <BsX />}
              Must be at least 8 characters
            </span>
            <span className="flex items-center gap-2 text-[#38415496]">
              {passwordLetters ? <IoCheckmarkOutline /> : <BsX />}
              Must include uppercase, lowercase, numbers, and special characters
            </span>
          </div>

          <button
            type="submit"
            className="bg-secondary-color primary-color py-2 mt-4 font-primary"
          >
            Sign Up
          </button>
        </Form>

        <div className="bg-[#384154] h-[.5px]" />

        <button className="secondary-color flex justify-center items-center gap-2 py-2 font-primary border border-[#384154]">
          <FcGoogle className="mb-[3px]" />
          Sign up with google
        </button>

        <span>
          have an account?
          <Link to="/login" className="font-secondary text-[#384154] underline">
            Login now
          </Link>
        </span>
      </div>
    </div>
  );
}

export async function action({ request, params }) {
  const data = await request.formData();
  const userCredentials = {
    email: data.get("email"),
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    password: data.get("password"),
  };

  console.log(userCredentials);
  // send the data to the backend
  return null;
}
