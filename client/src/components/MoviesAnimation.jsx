import backgroundHome from "../assets/home_one-back.png";
import posterMovie1 from "../assets/poster-movie-1.png";
import posterMovie2 from "../assets/poster-movie-2.png";
import posterMovie3 from "../assets/poster-movie-3.png";
import posterMovie4 from "../assets/poster-movie-4.png";
import posterMovie5 from "../assets/poster-movie-5.png";
import posterMovie6 from "../assets/poster-movie-6.jpg";
import posterMovie7 from "../assets/poster-movie-7.jpg";
import posterMovie8 from "../assets/poster-movie-8.png";
import posterMovie9 from "../assets/poster-movie-9.png";
import posterMovie10 from "../assets/poster-movie-10.jpg";
import posterMovie11 from "../assets/poster-movie-11.jpg";
import posterMovie12 from "../assets/poster-movie-12.jpg";
import posterMovie13 from "../assets/poster-movie-13.jpg";
import posterMovie14 from "../assets/poster-movie-14.jpg";
import posterMovie15 from "../assets/poster-movie-15.png";
import { useEffect, useState } from "react";

const posters = [
  posterMovie1,
  posterMovie2,
  posterMovie3,
  posterMovie4,
  posterMovie5,
  posterMovie6,
  posterMovie7,
  posterMovie8,
  posterMovie9,
  posterMovie10,
  posterMovie11,
  posterMovie12,
  posterMovie13,
  posterMovie14,
  posterMovie15,
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function MoviesAnimation() {
  const [selectedPosters1, setSelectedPosters1] = useState([]);
  const [selectedPosters2, setSelectedPosters2] = useState([]);
  const [selectedPosters3, setSelectedPosters3] = useState([]);

  useEffect(() => {
    const shuffledPosters1 = shuffleArray([...posters]);
    setSelectedPosters1(shuffledPosters1);
    const shuffledPosters2 = shuffleArray([...posters]);
    setSelectedPosters2(shuffledPosters2);
    const shuffledPosters3 = shuffleArray([...posters]);
    setSelectedPosters3(shuffledPosters3);
  }, []);
  return (
    <div className="bg-secondary-color w-[40%] md:flex justify-between items-start h-full relative overflow-hidden hidden">
      <img
        src={backgroundHome}
        alt="background image"
        className="absolute top-0 bottom-0 h-full w-full"
      />
      <div className="relative grid gap-5 animate-posters -mt-[550%]">
        {selectedPosters1.map((poster, index) => (
          <img
            key={index}
            src={poster}
            alt={`Movie Poster ${index + 1}`}
            className="w-[250px]"
          />
        ))}
        {/* <img src={posterMovie1} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie2} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie3} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie4} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie5} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie6} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie7} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie8} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie9} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie10} alt="poster movie 1" className="w-[250px]" />
        <img src={posterMovie11} alt="poster movie 1" className="w-[250px]" /> */}
      </div>
      <div className="relative grid gap-5 mt-20 animate-posters-reverse">
        {selectedPosters2.map((poster, index) => (
          <img
            key={index}
            src={poster}
            alt={`Movie Poster ${index + 1}`}
            className="w-[250px]"
          />
        ))}
      </div>
      <div className="relative grid gap-5 animate-posters -mt-[500%]">
        {selectedPosters3.map((poster, index) => (
          <img
            key={index}
            src={poster}
            alt={`Movie Poster ${index + 1}`}
            className="w-[250px]"
          />
        ))}
      </div>
      <div className="bg-gradient-to-b from-[#14213d] via-[#14213d9c] from-2% to-[#3558a353] w-full h-full absolute" />
    </div>
  );
}
