import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { verifyEmail } from "../lib/api";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";
import leftArrow from "../assets/Simple-Left.png";
import { useEffect } from "react";
import { useUser } from "../context.js/UserContext";

export default function VerifyEmail() {
  const { code } = useParams();
  const { isVerified } = useUser();

  const { isPending, isError, isSuccess } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmail(code),
  });

  useEffect(() => {
    if (isSuccess) {
      isVerified();
    }
  }, [isSuccess]);
  return (
    <div className="w-[100vw] h-[100vh] bg-secondary-color primary-color flex justify-center items-center flex-col text-center">
      {isPending ? (
        <ImSpinner2 className="w-10 h-10 animate-spin" />
      ) : (
        <>
          {isError && (
            <>
              <FaRegCircleXmark className="w-10 h-10" />
              <h2 className="text-2xl font-secondary">
                The link is either invalid or expired
              </h2>
              <Link to="/password/forgot" className="underline my-2">
                Get a new link
              </Link>
            </>
          )}
          {isSuccess && (
            <>
              <FaRegCheckCircle className="w-10 h-10" />
              <h2 className="text-2xl font-secondary">
                Congratulation! <br /> You're not a robot.
              </h2>
            </>
          )}

          <Link
            to="/"
            className="bg-primary-color font-primary px-3 mb-10 flex justify-center items-center w-fit gap-2 my-5"
          >
            <img src={leftArrow} alt="" width={30} />
            <span className="secondary-color">Back</span>
          </Link>
        </>
      )}
      {/* <FaRegCheckCircle className="w-10 h-10" />
      <h2 className="text-2xl font-secondary">
        Congratulation! <br /> You're not a robot.
      </h2> */}
      <div className="h-[1px] w-[300px] m-5 bg-primary-color" />
      <h1 className="text-3xl font-primary">MovieAlert</h1>
    </div>
  );
}
