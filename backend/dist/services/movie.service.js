"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.editMovie = exports.getMostSearchedMovies = exports.getMovie = exports.addMovie = void 0;
const s3_1 = __importStar(require("../config/s3"));
const http_1 = require("../constants/http");
const movie_model_1 = __importDefault(require("../models/movie.model"));
const appAssert_1 = __importDefault(require("../utils/appAssert"));
const redis_1 = require("../config/redis");
const searchLog_model_1 = __importDefault(require("../models/searchLog.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const addMovie = async ({ title, year, genre, description, contentWarning, file, userId }) => {
    // upload image to s3 and get url
    const { result, url, error } = await (0, s3_1.default)(file);
    (0, appAssert_1.default)(result || url, http_1.INTERNAL_SERVER_ERROR, "Something wrong try again later");
    // store the movie
    const created = await movie_model_1.default.create({
        userId,
        title,
        year,
        genre,
        description,
        contentWarning,
        picture: url,
    });
    await (0, redis_1.addMovieTitleToCache)(title, created.id);
    // Update the user (movies submitted)
    const user = await user_model_1.default.findById(userId);
    (0, appAssert_1.default)(user, http_1.NOT_FOUND, 'user not found');
    user.moviesSubmitted += 1;
    await user.save();
    return { ...created.toObject() };
};
exports.addMovie = addMovie;
const getMovie = async ({ movieId, movieName, userId }) => {
    // Check if the movie exist on the cache
    const { result, error } = await (0, redis_1.movieIsMember)(`${movieId}:${movieName}`);
    (0, appAssert_1.default)(result, http_1.NOT_FOUND, "Movie not found");
    // Get the movie from database
    const movie = await movie_model_1.default.findById(movieId).populate('userId', 'firstName lastName');
    (0, appAssert_1.default)(movie, http_1.NOT_FOUND, "Movie not found");
    // Check if the user is the owner of the movie or already seen before
    if (String(movie.userId._id) === String(userId) || await searchLog_model_1.default.findOne({ userId, movieId: movie._id })) {
        return { ...movie.toObject() };
    }
    const user = await user_model_1.default.findById(userId);
    (0, appAssert_1.default)(user, http_1.NOT_FOUND, 'User not found');
    // Check if the user has a pro badge
    const badge = user.badge;
    if (badge >= 4) {
        // Create the search doc and return the movie
        await searchLog_model_1.default.create({
            userId: userId,
            movieId: movie._id
        });
        return { ...movie.toObject() };
    }
    // Check if the user has access to see movie (depend on their badge)
    const maxViews = badge * 10;
    (0, appAssert_1.default)(user.moviesViewed < maxViews, http_1.UNAUTHORIZED, "you reach the limit of views, submit one movie to earn 10 movies views");
    await searchLog_model_1.default.create({
        userId: userId,
        movieId: movie._id
    });
    user.moviesViewed = user.moviesViewed + 1;
    await user.save();
    return { ...movie.toObject() };
};
exports.getMovie = getMovie;
const getMostSearchedMovies = async (limit = 10) => {
    const mostSearchedMovie = await searchLog_model_1.default.aggregate([
        {
            $group: {
                _id: '$movieId',
                searchCount: { $sum: 1 }
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: '_id',
                as: 'movieDetails'
            }
        },
        { $unwind: '$movieDetails' },
        {
            $project: {
                _id: 1,
                searchCount: 1,
                title: '$movieDetails.title',
                year: '$movieDetails.year',
                genre: '$movieDetails.genre',
                picture: '$movieDetails.picture',
            }
        },
        { $sort: { searchCount: -1 } },
        { $limit: limit }
    ]);
    const newMoviesAdded = await movie_model_1.default.aggregate([
        { $sort: { createdAt: -1 } },
        { $limit: limit },
        {
            $project: {
                _id: 1,
                title: 1,
                year: 1,
                genre: 1,
                picture: 1
            }
        }
    ]);
    return {
        mostSearchedMovie,
        newMoviesAdded
    };
};
exports.getMostSearchedMovies = getMostSearchedMovies;
const editMovie = async ({ title, year, genre, description, contentWarning, file, userId, id, movieName }) => {
    // find the movie
    const movie = await movie_model_1.default.findOne({ _id: id, title: movieName, userId });
    (0, appAssert_1.default)(movie, http_1.NOT_FOUND, 'Movie not found');
    // Checking for new file
    if (file) {
        // Delete old file
        const { result } = await (0, s3_1.deleteFromS3)(movie.picture);
        console.log('deleteFromS3', result);
        (0, appAssert_1.default)(result, http_1.INTERNAL_SERVER_ERROR, 'Something wrong');
        // upload the new
        const { url } = await (0, s3_1.default)(file);
        (0, appAssert_1.default)(url, http_1.INTERNAL_SERVER_ERROR, 'Something wrong');
        movie.picture = url;
    }
    // Update the movie
    movie.title = title;
    movie.genre = genre;
    movie.year = year;
    movie.contentWarning = contentWarning || [''];
    movie.description = description;
    const updatedMovie = await movie.save();
    // store the new title on the cache and delete old
    await (0, redis_1.deleteFromCache)(movieName, id);
    await (0, redis_1.addMovieTitleToCache)(updatedMovie.title, updatedMovie.id);
    return { ...updatedMovie.toObject() };
};
exports.editMovie = editMovie;
const deleteMovie = async ({ movieId, movieName, userId }) => {
    // Check if the movie exist on the cache
    const { result } = await (0, redis_1.movieIsMember)(`${movieId}:${movieName}`);
    (0, appAssert_1.default)(result, http_1.NOT_FOUND, 'Movie not found');
    // delete movie from db
    const deletedMovie = await movie_model_1.default.findOneAndDelete({ userId, _id: movieId, title: movieName });
    (0, appAssert_1.default)(deletedMovie, http_1.NOT_FOUND, 'Movie not found or you are not the owner');
    // Delete the movie from search log
    await searchLog_model_1.default.deleteMany({ movieId: deletedMovie._id });
    // Delete the movie from aws
    await (0, s3_1.deleteFromS3)(deletedMovie.picture);
    // Delete the movie from the cache
    await (0, redis_1.deleteFromCache)(deletedMovie.title, String(deletedMovie._id));
};
exports.deleteMovie = deleteMovie;
