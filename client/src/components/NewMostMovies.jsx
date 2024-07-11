import { useEffect } from "react";
import { getMostAndNewMovies } from "../lib/api";
import { refetchUserData } from "../utils/auth";
import MostSearched from "./MostSearched";
import { useQuery } from "@tanstack/react-query";

// const { mostSearchedMovie, newMoviesAdded } = {
//   mostSearchedMovie: [
//     {
//       _id: "66896c7c39cc43f247844c3d",
//       searchCount: 6,
//       title: "The assassin",
//       year: "2023",
//       genre: "Action/Adventure",
//       picture:
//         "https://movie-alert.s3.us-east-1.amazonaws.com/1720282235403-91641658-3060-4e5c-9f34-28ae96abe837",
//     },
//     {
//       _id: "668b3273c2e20202c54798d3",
//       searchCount: 3,
//       title: "Forgotten",
//       year: "2017",
//       genre: "Crime Mystery",
//       picture:
//         "https://movie-alert.s3.us-east-1.amazonaws.com/1720398449819-9978c377-340c-4d5e-83a0-88b8864ca53b",
//     },
//     {
//       _id: "6689660d05ec6bc6a9343618",
//       searchCount: 2,
//       title: "The shawshank Redemption",
//       year: "1994",
//       genre: "Drama",
//       picture:
//         "https://movie-alert.s3.us-east-1.amazonaws.com/1720280589043-aab45d39-6f1b-4b83-898c-e2d7f38b5ab5",
//     },
//   ],
//   newMoviesAdded: [
//     {
//       _id: "668b3273c2e20202c54798d3",
//       title: "Forgotten",
//       year: "2017",
//       genre: "Crime Mystery",
//       picture:
//         "https://movie-alert.s3.us-east-1.amazonaws.com/1720398449819-9978c377-340c-4d5e-83a0-88b8864ca53b",
//     },
//     {
//       _id: "668aab54ca9d8d473561ad64",
//       title: "spiderman",
//       year: "2002",
//       genre: "Action",
//       picture:
//         "https://movie-alert.s3.us-east-1.amazonaws.com/1720363859395-cbca8274-018a-4939-9038-280727628fdd",
//     },
//     {
//       _id: "66896c7c39cc43f247844c3d",
//       title: "The assassin",
//       year: "2023",
//       genre: "Action/Adventure",
//       picture:
//         "https://movie-alert.s3.us-east-1.amazonaws.com/1720282235403-91641658-3060-4e5c-9f34-28ae96abe837",
//     },
//     {
//       _id: "6689660d05ec6bc6a9343618",
//       title: "The shawshank Redemption",
//       year: "1994",
//       genre: "Drama",
//       picture:
//         "https://movie-alert.s3.us-east-1.amazonaws.com/1720280589043-aab45d39-6f1b-4b83-898c-e2d7f38b5ab5",
//     },
//     {
//       _id: "66895770bf26601cfbd5ce5c",
//       title: "Wild Forest",
//       year: "2020",
//       genre: "Action",
//       picture:
//         "https://movie-alert.s3.us-east-1.amazonaws.com/1720276838898-7c8b70b9-7cb9-4eb7-9b11-e6832d091bd4",
//     },
//     {
//       _id: "668955e3bf26601cfbd5ce5a",
//       title: "GOLD",
//       year: "2024",
//       genre: "HORROR",
//       picture:
//         "https://movie-alert.s3.us-east-1.amazonaws.com/1720276441939-a0e95d68-cfbc-4ce7-b410-dad1c0fb7f1f",
//     },
//   ],
// };

export default function NewMostMovies() {
  const {
    data: movies,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["new-most"],
    queryFn: getMostAndNewMovies,
  });
  useEffect(() => {
    refetchUserData();
  }, []);

  return (
    <>
      {isSuccess && (
        <>
          <MostSearched
            text="Most Searched"
            movies={movies.mostSearchedMovie}
          />
          <MostSearched text="New Added" movies={movies.newMoviesAdded} />
        </>
      )}
    </>
  );
}
