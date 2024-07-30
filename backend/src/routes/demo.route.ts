import { Router } from 'express';
import { searchMovieHandler } from '../controllers/movie.controller';
import catchErrors from '../utils/catchErrors';
import DemoModel from '../models/demo.model';
import appAssert from '../utils/appAssert';
import { NOT_FOUND, OK, UNAUTHORIZED } from '../constants/http';
import MovieModel from '../models/movie.model';
import { movieIsMember } from '../config/redis';
const demoRoutes = Router();

// Prefix : demo

demoRoutes.get('/search/:title', searchMovieHandler);
demoRoutes.post('/about/:id/:title', catchErrors(async (req, res) => {
  const { id: movieId } = req.params;
  const movieName = req.params.title.replace('%20', ' ');
  const { user_id } = req.body;

  const exist = await DemoModel.exists({user_id})
  appAssert(!exist, UNAUTHORIZED, 'Login or create account to see another movies');

  // Check if the movie exist on the cache
  const { result, error } = await movieIsMember(`${movieId}:${movieName}`);
  appAssert(result, NOT_FOUND, "Movie not found")

  await DemoModel.create({user_id});

  // Get the movie from database
  const movie = await MovieModel.findById(movieId).populate('userId', 'firstName lastName');
  appAssert(movie, NOT_FOUND, "Movie not found");

  res.status(OK).json(movie);
}))

export default demoRoutes;