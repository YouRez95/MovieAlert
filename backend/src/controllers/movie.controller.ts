import { z } from "zod";
import catchErrors from "../utils/catchErrors";
// import { uploadFile } from "../config/s3";

import appAssert from "../utils/appAssert";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "../constants/http";
import uploadToS3 from "../config/s3";
import { addMovie, editMovie, getMostSearchedMovies, getMovie } from "../services/movie.service";
import { aboutMovieSchema, movieSchema, movieTitleSchema } from "../utils/zod";
import { searchMovieTitle } from "../config/redis";
import MovieModel from "../models/movie.model";
import SearchLogModel from "../models/searchLog.model";


export const addMovieHandler = catchErrors(async (req, res) => {
  // Validate the body
  const { title, year, genre, description} = req.body;
  const contentWarning = req.body.contentWarning.split(',')
  const movieData = movieSchema.parse({ title, year, genre, description, contentWarning});

  const {file, userId} = req;
  appAssert(file, BAD_REQUEST, 'image not found');
  // Call the service
  const result = await addMovie({ ...movieData, file, userId})

  return res.status(OK).json({message: 'movie created'});
})


export const searchMovieHandler = catchErrors(async (req, res) => {
  // validate title
  const title = movieTitleSchema.parse(req.params.title);

  // call redis filter
  const { result, error } = await searchMovieTitle(title);
  appAssert(result, NOT_FOUND, 'movie not found');

  // return response
  return res.status(OK).json(result);
})


export const aboutMovieHandler = catchErrors(async (req, res) => {
  // validate title
  const { movieId, movieName } = aboutMovieSchema.parse({movieId: req.params.id, movieName: req.params.title})

  // Call the service
  const movie = await getMovie({movieId, movieName, userId: req.userId});

  // Return response
  return res.status(OK).json(movie);
})


export const mostAndNewMovieHandler = catchErrors(async (req, res) => {
  // get the most searched movie
  const {mostSearchedMovie, newMoviesAdded} = await getMostSearchedMovies()


  return res.json({mostSearchedMovie, newMoviesAdded});
})


export const myMoviesHandler = catchErrors(async (req, res) => {
  // Get the page query
  const page = Number(req.query.page) || 1;
  // Define the max items in page 4
  const maxMovies = 10;

  // Get the documents
  const countMovies = await MovieModel.countDocuments({userId: req.userId});
  const movies = await MovieModel.find({userId: req.userId}).sort({createdAt: -1}).limit(maxMovies).skip((page - 1) * maxMovies).select('_id picture title');

  // return response
  res.json({countMovies, movies})
})


export const myViewsHandler = catchErrors(async (req, res) => {
  // Get the page query
  const page = Number(req.query.page) || 1;
  // Define the max items in page 4
  const maxMovies = 10;

  // Get the documents
  const countMovies = await SearchLogModel.countDocuments({userId: req.userId});
  const movies = await SearchLogModel.find({userId: req.userId}).sort({createdAt: -1}).limit(maxMovies).skip((page - 1) * maxMovies).select('movieId').populate('movieId', '_id picture title');

  // return response
  res.json({countMovies, movies})
})

export const updateMovieHandler = catchErrors(async (req, res) => {
  const { id, title: movieName } = req.params;
  const { title, year, genre, description} = req.body;
  const contentWarning = req.body.contentWarning.split(',')
  const movieData = movieSchema.parse({ title, year, genre, description, contentWarning});
  const {file, userId} = req;


  // Call the service
  await editMovie({...movieData, file, userId, id, movieName})
  res.json({message: 'Updated Success'})
})