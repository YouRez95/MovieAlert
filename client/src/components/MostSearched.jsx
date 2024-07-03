import arrowImg from "../assets/Simple-Left.png";
import poster1 from "../assets/poster-movie-1.png";
import poster2 from "../assets/poster-movie-2.png";
import poster3 from "../assets/poster-movie-3.png";
import poster4 from "../assets/poster-movie-4.png";
import poster5 from "../assets/poster-movie-5.png";

const posters = [
  poster1,
  poster2,
  poster3,
  poster4,
  poster5,
  poster1,
  poster2,
  poster3,
  poster4,
  poster5,
];

export default function MostSearched({ text }) {
  return (
    <div className="">
      <div className="flex items-center justify-start gap-3">
        <img src={arrowImg} alt="arrow ->" className="w-10 h-12 rotate-180" />
        <h1 className="text-2xl font-primary secondary-color capitalize">
          {text}
        </h1>
      </div>

      <div className="flex overflow-x-auto justify-start items-center gap-4 h-[370px] px-10 -mt-9">
        {posters.map((poster, i) => (
          <div
            key={i}
            className="h-[70%] cursor-pointer hover:scale-125 transition-all duration-300 relative hover:z-10 group"
          >
            <img
              src={poster}
              alt=""
              className="w-full h-full min-w-[200px] object-cover rounded-md"
            />
            <h2 className="absolute bottom-0 bg-primary-color text-center font-primary rounded-b-md ">
              The Shawshank Redemption
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
