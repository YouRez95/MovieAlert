import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useUser } from "../context.js/UserContext";

export default function Navbar() {
  const { user } = useUser();
  return (
    <header className="flex justify-between items-center h-[70px] secondary-color">
      <h1 className="font-primary text-3xl flex items-center">
        <img src={logo} alt="" className="w-16 -mt-2" />
        <Link to="/">MovieAlert</Link>
      </h1>
      <div className="flex gap-10 items-center">
        <div className="font-secondary">{user.firstName}</div>
        <button className="bg-primary-color font-primary uppercase px-4 py-2">
          <Link to="/add-movie">add movie..</Link>
        </button>
        <button className="bg-secondary-color primary-color font-primary uppercase px-6 py-2 rounded-full">
          Logout
        </button>
      </div>
    </header>
  );
}
