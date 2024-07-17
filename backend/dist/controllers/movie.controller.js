"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovieHandler = exports.updateMovieHandler = exports.myViewsHandler = exports.myMoviesHandler = exports.mostAndNewMovieHandler = exports.aboutMovieHandler = exports.searchMovieHandler = exports.addMovieHandler = void 0;
const catchErrors_1 = __importDefault(require("../utils/catchErrors"));
// import { uploadFile } from "../config/s3";
const appAssert_1 = __importDefault(require("../utils/appAssert"));
const http_1 = require("../constants/http");
const movie_service_1 = require("../services/movie.service");
const zod_1 = require("../utils/zod");
const redis_1 = require("../config/redis");
const movie_model_1 = __importDefault(require("../models/movie.model"));
const searchLog_model_1 = __importDefault(require("../models/searchLog.model"));
exports.addMovieHandler = (0, catchErrors_1.default)(async (req, res) => {
    // Validate the body
    const { title, year, genre, description } = req.body;
    const contentWarning = req.body.contentWarning.split(',');
    const movieData = zod_1.movieSchema.parse({ title, year, genre, description, contentWarning });
    const { file, userId } = req;
    (0, appAssert_1.default)(file, http_1.BAD_REQUEST, 'image not found');
    // Call the service
    const result = await (0, movie_service_1.addMovie)({ ...movieData, file, userId });
    return res.status(http_1.CREATED).json({ message: 'movie created' });
});
exports.searchMovieHandler = (0, catchErrors_1.default)(async (req, res) => {
    // validate title
    const title = zod_1.movieTitleSchema.parse(req.params.title);
    // call redis filter
    const { result, error } = await (0, redis_1.searchMovieTitle)(title);
    (0, appAssert_1.default)(result, http_1.NOT_FOUND, 'movie not found');
    // return response
    return res.status(http_1.OK).json(result);
});
exports.aboutMovieHandler = (0, catchErrors_1.default)(async (req, res) => {
    // validate title
    const { movieId, movieName } = zod_1.aboutMovieSchema.parse({ movieId: req.params.id, movieName: req.params.title });
    // Call the service
    const movie = await (0, movie_service_1.getMovie)({ movieId, movieName, userId: req.userId });
    // Return response
    return res.status(http_1.OK).json(movie);
});
exports.mostAndNewMovieHandler = (0, catchErrors_1.default)(async (req, res) => {
    // get the most searched movie
    const { mostSearchedMovie, newMoviesAdded } = await (0, movie_service_1.getMostSearchedMovies)();
    return res.status(http_1.OK).json({ mostSearchedMovie, newMoviesAdded });
});
exports.myMoviesHandler = (0, catchErrors_1.default)(async (req, res) => {
    // Get the page query
    const page = Number(req.query.page) || 1;
    // Define the max items in page 4
    const maxMovies = 10;
    // Get the documents
    const countMovies = await movie_model_1.default.countDocuments({ userId: req.userId });
    const movies = await movie_model_1.default.find({ userId: req.userId }).sort({ createdAt: -1 }).limit(maxMovies).skip((page - 1) * maxMovies).select('_id picture title');
    // return response
    res.status(http_1.OK).json({ countMovies, movies });
});
exports.myViewsHandler = (0, catchErrors_1.default)(async (req, res) => {
    // Get the page query
    const page = Number(req.query.page) || 1;
    // Define the max items in page 4
    const maxMovies = 10;
    // Get the documents
    const countMovies = await searchLog_model_1.default.countDocuments({ userId: req.userId });
    const movies = await searchLog_model_1.default.find({ userId: req.userId }).sort({ createdAt: -1 }).limit(maxMovies).skip((page - 1) * maxMovies).select('movieId').populate('movieId', '_id picture title');
    // return response
    res.status(http_1.OK).json({ countMovies, movies });
});
exports.updateMovieHandler = (0, catchErrors_1.default)(async (req, res) => {
    const { id, title: movieName } = req.params;
    const { title, year, genre, description } = req.body;
    const contentWarning = req.body.contentWarning.split(',');
    const movieData = zod_1.movieSchema.parse({ title, year, genre, description, contentWarning });
    const { file, userId } = req;
    // Call the service
    await (0, movie_service_1.editMovie)({ ...movieData, file, userId, id, movieName });
    res.status(http_1.OK).json({ message: 'Updated Success' });
});
exports.deleteMovieHandler = (0, catchErrors_1.default)(async (req, res) => {
    // validate title
    const { movieId, movieName } = zod_1.aboutMovieSchema.parse({ movieId: req.params.id, movieName: req.params.title });
    // Call the service
    await (0, movie_service_1.deleteMovie)({ movieId, movieName, userId: req.userId });
    // Return the response
    res.status(http_1.OK).json({ message: "Movie deleted" });
});
