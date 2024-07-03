import { Link, useSearchParams } from "react-router-dom";
import MoviesAnimation from "../components/MoviesAnimation";
import ResetPasswordForm from "../components/ResetPasswordForm";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const expiredDate = searchParams.get("exp");
  const currentDate = Date.now();
  const linkIsValid = code && expiredDate && expiredDate > currentDate;
  return (
    <div className="flex justify-start items-start h-[100vh]">
      <MoviesAnimation />
      {!linkIsValid && (
        <div className="w-[60%] sm:px-[10vw] lg:px-[15vw]  h-full gap-5 flex flex-col justify-center">
          <h2 className="text-3xl font-primary">Invalid Link</h2>
          <p className="font-secondary text-[#384154]">
            The link is either invalid or expired.
          </p>
          <span className="font-secondary">
            Request a new password reset link?
            <Link
              to="/password/forgot"
              className="ml-1 text-[#384154] underline"
            >
              forgot password
            </Link>
          </span>
        </div>
      )}
      {linkIsValid && <ResetPasswordForm code={code} />}
    </div>
  );
}
