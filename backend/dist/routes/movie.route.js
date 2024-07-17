"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movie_controller_1 = require("../controllers/movie.controller");
const multer_1 = __importDefault(require("../config/multer"));
const moviesRoutes = (0, express_1.Router)();
// Prefix: /movies
moviesRoutes.post('/', multer_1.default.single('movieImage'), movie_controller_1.addMovieHandler);
moviesRoutes.get('/search/:title', movie_controller_1.searchMovieHandler);
moviesRoutes.get('/about/:id/:title', movie_controller_1.aboutMovieHandler);
moviesRoutes.get('/most/new', movie_controller_1.mostAndNewMovieHandler);
moviesRoutes.get('/myMovies', movie_controller_1.myMoviesHandler);
moviesRoutes.get('/myViews', movie_controller_1.myViewsHandler);
moviesRoutes.put('/update/:id/:title', multer_1.default.single('movieImage'), movie_controller_1.updateMovieHandler);
moviesRoutes.delete('/:id');
moviesRoutes.delete('/:id/:title', movie_controller_1.deleteMovieHandler);
exports.default = moviesRoutes;
