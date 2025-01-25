import { createClient } from "redis";
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "../constants/env";
import { redisIsConnected } from "..";
import MovieModel from "../models/movie.model";

const client = createClient({
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
  },
});

const SET_NAME = "movieTitles";

function helperCache(value: string) {
  const index = value.indexOf(":");
  const [id, movieName] = [
    value.substring(0, index),
    value.substring(index + 1),
  ];
  return { id, movieName };
}

// Query the database for movies if Redis not connected
export const queryDatabaseForMovies = async (movieTitle: string) => {
  try {
    const movies = await MovieModel.find({
      title: { $regex: movieTitle, $options: "i" },
    }).exec();
    return movies.map((movie) => ({
      id: movie.id,
      movieName: movie.title,
    }));
  } catch (error) {
    console.error("Error querying database for movies:", error);
    throw error;
  }
};

// Function to add Movie title to cache
export const addMovieTitleToCache = async (
  movieTitle: string,
  movieId: string
) => {
  if (!redisIsConnected) return;
  try {
    await client.sAdd(SET_NAME, `${movieId}:${movieTitle}`);
  } catch (error) {
    console.log("addMovieTitleToCache", error);
  }
};

// Function to retrieve movies from the cach
export const searchMovieTitle = async (movieTitle: string) => {
  try {
    if (!redisIsConnected) {
      const result = await queryDatabaseForMovies(movieTitle);
      return { result };
    }
    const cachingTitles = await client.sMembers(SET_NAME);
    const titles = cachingTitles.map((title) => helperCache(title));
    const result = titles.filter((title) =>
      title.movieName.toLowerCase().includes(movieTitle.toLowerCase())
    );
    return { result };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

// Function the check if movie exist on the cache
export const movieIsMember = async (value: string) => {
  try {
    if (!redisIsConnected) {
      return { result: true };
    }
    const result = await client.sIsMember(SET_NAME, value);
    return { result };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

// Function to delete movie from cache
export const deleteFromCache = async (movieTitle: string, movieId: string) => {
  if (!redisIsConnected) return;
  try {
    const result = await client.sRem(SET_NAME, `${movieId}:${movieTitle}`);
    return { result };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export default client;
