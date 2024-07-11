import { Link } from "react-router-dom";
import backgroundHome from "../assets/home_one-back.png";
import posterMovie1 from "../assets/poster-movie-1.png";
import posterMovie2 from "../assets/poster-movie-2.png";
import posterMovie3 from "../assets/poster-movie-3.png";
import Layout from "../components/Layout";
import { IoSearch } from "react-icons/io5";
import { ClientJS } from "clientjs";

export default function HomeNotAuth() {
  const client = new ClientJS();
  const fingerPrint = client.getFingerprint();
  console.log(fingerPrint);
  // 1952026382

  return (
    <main>
      <div className="w-full h-[480px] relative overflow-hidden">
        <img
          src={backgroundHome}
          alt="background image"
          className="absolute top-0 bottom-0 h-full w-full"
        />

        <div className="absolute sm:left-[10vw] flex justify-between left-[50%] translate-x-[-50%] sm:translate-x-0 items-center h-full sm:right-[10vw] z-0">
          <img
            src={posterMovie1}
            alt="poster movie"
            className="w-[300px] h-[424px] rounded-lg hidden md:block"
          />
          <img
            src={posterMovie2}
            alt="poster movie"
            className="w-[250px] h-[350px] sm:w-[300px] sm:h-[424px] rounded-lg mt-[390px]"
          />
          <img
            src={posterMovie3}
            alt="poster movie"
            className="w-[300px] h-[424px] rounded-lg hidden sm:block"
          />
        </div>

        <div className="bg-gradient-to-b from-[#14213d] via-[#14213d9c] from-10% to-[#3558a353] w-full h-full absolute" />
        <Layout>
          <div className="flex relative flex-col h-full">
            <header className="h-[70px] px-3">
              <div className="flex justify-between items-center h-full">
                <h1 className="primary-color font-primary font-bold text-2xl sm:text-3xl lg:text-4xl">
                  MovieAlert
                </h1>
                <Link
                  to="/login"
                  className="bg-primary-color px-4 sm:px-7 py-2 font-primary secondary-color"
                >
                  Login/Register
                </Link>
              </div>
            </header>

            <div className="relative flex justify-center items-center flex-1 text-white font-primary text-[25px] sm:text-[30px] md:text-[40px] text-center mb-14">
              <h1>
                Check <span className="primary-color">movies</span> for content{" "}
                <span className="text-red-500">warnings</span> <br /> before you
                watch
              </h1>
            </div>
          </div>
        </Layout>
      </div>
      <div className="relative flex w-[80%] sm:w-[500px] md:w-[600px] h-[50px] sm:h-[55px] md:h-[66px] bg-red-500 m-auto -mt-6 md:-mt-9">
        <input
          placeholder="Search your movie"
          className=" placeholder:text-[#14213d5a] placeholder:font-thin bg-primary-color w-[80%] h-full p-2 font-secondary outline-none text-2xl"
          type="text"
        />
        <button className="w-[20%] bg-secondary-color flex items-center justify-center">
          <IoSearch fontSize={40} color="#FCA311" />
        </button>
      </div>
    </main>
  );
}
