import { Router } from "express";
import { aboutMovieHandler, addMovieHandler, mostAndNewMovieHandler, myMoviesHandler, myViewsHandler, searchMovieHandler, updateMovieHandler } from "../controllers/movie.controller";
import upload from "../config/multer";

const moviesRoutes = Router();

// Prefix: /movies

moviesRoutes.post('/', upload.single('movieImage'), addMovieHandler)
moviesRoutes.get('/search/:title', searchMovieHandler)
moviesRoutes.get('/about/:id/:title', aboutMovieHandler)
moviesRoutes.get('/most/new', mostAndNewMovieHandler)
moviesRoutes.get('/myMovies', myMoviesHandler)
moviesRoutes.get('/myViews', myViewsHandler)
moviesRoutes.put('/update/:id/:title',upload.single('movieImage'), updateMovieHandler)


export default moviesRoutes;