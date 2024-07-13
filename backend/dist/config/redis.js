"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromCache = exports.movieIsMember = exports.searchMovieTitle = exports.addMovieTitleToCache = void 0;
const redis_1 = require("redis");
const env_1 = require("../constants/env");
const client = (0, redis_1.createClient)({
    password: env_1.REDIS_PASSWORD,
    socket: {
        host: env_1.REDIS_HOST,
        port: 15745
    }
});
const SET_NAME = 'movieTitles';
function helperCache(value) {
    const index = value.indexOf(':');
    const [id, movieName] = [value.substring(0, index), value.substring(index + 1)];
    return { id, movieName };
}
// Function to add Movie title to cache
const addMovieTitleToCache = async (movieTitle, movieId) => {
    try {
        await client.sAdd(SET_NAME, `${movieId}:${movieTitle}`);
    }
    catch (error) {
        console.log("addMovieTitleToCache", error);
    }
};
exports.addMovieTitleToCache = addMovieTitleToCache;
// Function to retrieve movies from the cach
const searchMovieTitle = async (movieTitle) => {
    try {
        const cachingTitles = await client.sMembers(SET_NAME);
        const titles = cachingTitles.map(title => helperCache(title));
        const result = titles.filter((title) => title.movieName.toLowerCase().includes(movieTitle.toLowerCase()));
        return { result };
    }
    catch (error) {
        console.log(error);
        return { error };
    }
};
exports.searchMovieTitle = searchMovieTitle;
// Function the check if movie exist on the cache
const movieIsMember = async (value) => {
    try {
        const result = await client.sIsMember(SET_NAME, value);
        return { result };
    }
    catch (error) {
        console.log(error);
        return { error };
    }
};
exports.movieIsMember = movieIsMember;
// Function to delete movie from cache
const deleteFromCache = async (movieTitle, movieId) => {
    try {
        const result = await client.sRem(SET_NAME, `${movieId}:${movieTitle}`);
        return { result };
    }
    catch (error) {
        console.log(error);
        return { error };
    }
};
exports.deleteFromCache = deleteFromCache;
exports.default = client;
