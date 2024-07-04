import { Router } from "express";
import { addMovieHandler } from "../controllers/movie.controller";
import upload from "../config/multer";

const moviesRoutes = Router();

// Prefix: /movies

moviesRoutes.post('/', upload.single('movieImage'), addMovieHandler)


export default moviesRoutes;