import { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { LiaSpinnerSolid } from "react-icons/lia";
import usePasswordValidation from "../hooks/usePaswordValidation";
import { BsX } from "react-icons/bs";
import { IoCheckmarkOutline } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { sendResetPassword } from "../lib/api";
import { Link, useNavigate } from "react-router-dom";
import leftArrow from "../assets/Simple-Left.png";

export default function ResetPasswordForm({ code }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const {
    changeType,
    passwordLength,
    passwordLetters,
    typePassword,
    validatePassword,
  } = usePasswordValidation();

  const {
    data,
    mutate: resetPassword,
    isError,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: sendResetPassword,
    onSuccess: () => {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    },
  });
  return (
    <div className="w-[60%] sm:px-[10vw] lg:px-[15vw] h-full gap-5 flex flex-col justify-center">
      <Link
        to="/"
        className="bg-primary-color font-primary px-3 flex justify-center items-center w-fit gap-2"
      >
        <img src={leftArrow} alt="" width={30} />
        <span>Back</span>
      </Link>
      <div>
        {isSuccess && (
          <span className="text-green-500 font-secondary flex items-center justify-center gap-2">
            <IoCheckmarkOutline className="w-7 h-7 border rounded-full" />
            {data.message}
          </span>
        )}
        {isError && (
          <span className="text-red-500 font-secondary flex items-center justify-center gap-2">
            <BsX className="w-7 h-7 border rounded-full" />
            Invalid or expired verification code
          </span>
        )}
      </div>
      <form className="flex flex-col gap-5">
        <div className="relative">
          <input
            autoFocus
            type={typePassword}
            name="password"
            value={password}
            required
            placeholder="New password"
            className="outline-none border-[1.5px] border-[#14213D] py-2 px-2 font-secondary w-full"
            onChange={(e) => {
              validatePassword(e);
              setPassword(e.target.value);
            }}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              resetPassword({ password, verificationCode: code })
            }
          />
          {typePassword === "password" && (
            <GoEyeClosed
              className="absolute right-5 select-none cursor-pointer top-[50%] -translate-y-[50%] w-6 h-6"
              onClick={() => changeType("text")}
            />
          )}
          {typePassword === "text" && (
            <GoEye
              className="absolute right-5 select-none cursor-pointer top-[50%] -translate-y-[50%] w-6 h-6"
              onClick={() => changeType("password")}
            />
          )}
        </div>
        <div className="flex flex-col">
          <span className="flex items-center gap-2 text-[#38415496] text-sm">
            {passwordLength ? <IoCheckmarkOutline /> : <BsX />}
            Must be at least 8 characters
          </span>
          <span className="flex items-center gap-2 text-[#38415496] text-sm">
            {passwordLetters ? <IoCheckmarkOutline /> : <BsX />}
            Must include uppercase, lowercase, numbers, and special characters
          </span>
        </div>

        <button
          type="button"
          className="bg-secondary-color primary-color py-2 mt-4 font-primary disabled:bg-[#14213dbb]"
          disabled={
            !passwordLength || !passwordLetters || isPending || isSuccess
          }
          onClick={() => resetPassword({ password, verificationCode: code })}
        >
          {isPending ? (
            <LiaSpinnerSolid className="m-auto animate-spin w-6 h-6" />
          ) : (
            "Reset password"
          )}
        </button>
      </form>
      <span className="font-secondary">
        Request a new password reset link?
        <Link to="/password/forgot" className="ml-1 text-[#384154] underline">
          forgot password
        </Link>
      </span>
    </div>
  );
}
