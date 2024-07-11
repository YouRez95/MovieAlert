import { createClient } from 'redis';
import { REDIS_HOST, REDIS_PASSWORD } from '../constants/env';

const client = createClient({
    password: REDIS_PASSWORD,
    socket: {
        host: REDIS_HOST,
        port: 15745
    }
});

const SET_NAME = 'movieTitles'

function helperCache(value: string) {
  const index = value.indexOf(':')
  const [id, movieName]  = [value.substring(0, index), value.substring(index + 1)]
  return {id, movieName}
}

// Function to add Movie title to cache
export const addMovieTitleToCache = async (movieTitle: string, movieId: string) => {
  try {
    await client.sAdd(SET_NAME, `${movieId}:${movieTitle}`);
  } catch (error) {
    console.log("addMovieTitleToCache", error);
  }
}

// Function to retrieve movies from the cach
export const searchMovieTitle = async (movieTitle: string) => {
  try {
    const cachingTitles = await client.sMembers(SET_NAME);
    const titles = cachingTitles.map(title => helperCache(title))
    const result = titles.filter((title) => title.movieName.toLowerCase().includes(movieTitle.toLowerCase()))
    return {result};
  } catch (error) {
    console.log(error);
    return {error}
  }
}


// Function the check if movie exist on the cache
export const movieIsMember = async (value: string) => {
  try {
    const result = await client.sIsMember(SET_NAME, value)
    return {result}
  } catch (error) {
    console.log(error);
    return {error}
  }
}

// Function to delete movie from cache
export const deleteFromCache = async (movieTitle: string, movieId: string) => {
  try {
    const result = await client.sRem(SET_NAME, `${movieId}:${movieTitle}`);
    return {result};
  } catch (error) {
    console.log(error)
    return {error};
  }
}



export default client;