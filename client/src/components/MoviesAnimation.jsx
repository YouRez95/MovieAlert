import backgroundHome from "../assets/home_one-back.png";
import posterMovie1 from "../assets/poster-movie-1.png";
import posterMovie2 from "../assets/poster-movie-2.png";
import posterMovie3 from "../assets/poster-movie-3.png";

export default function MoviesAnimation() {
  return (
    <div className="bg-secondary-color w-[40%] sm:flex justify-between items-start h-full relative overflow-hidden hidden">
      <img
        src={backgroundHome}
        alt="background image"
        className="absolute top-0 bottom-0 h-full w-full"
      />
      <div className="relative grid gap-5 animate-posters -mt-[180%]">
        <img src={posterMovie1} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie2} alt="poster movie 2" className="w-[250px]" />
        <img src={posterMovie1} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie3} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie1} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie1} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie3} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie1} alt="poster movie 1" className="w-[250px]" />
      </div>
      <div className="relative grid gap-5 mt-20 animate-posters-reverse">
        <img src={posterMovie2} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie1} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie3} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie1} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie2} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie1} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie3} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie1} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie2} alt="poster movie 1" className="w-[250px]" />
      </div>
      <div className="relative grid gap-5 animate-posters -mt-[200%]">
        <img src={posterMovie3} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie2} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie1} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie3} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie1} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie1} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie1} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie3} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie1} alt="poster movie 1" className="w-[250px]" />
      </div>
      <div className="bg-gradient-to-b from-[#14213d] via-[#14213d9c] from-2% to-[#3558a353] w-full h-full absolute" />
    </div>
  );
}
