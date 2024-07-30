import { OK } from "../constants/http";
import MovieModel from "../models/movie.model";
import SearchLogModel from "../models/searchLog.model";
import UserModel from "../models/user.model";
import catchErrors from "../utils/catchErrors";

export const moviesAdminHandler = catchErrors(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const max = Number(req.query.max) || 50;
  const sort = req.query.sort || 'desc';

  // Get the documents
  const countMovies = await MovieModel.countDocuments();
  const movies = await MovieModel.find().sort({createdAt: sort === 'desc' ? -1 : 1}).limit(max).skip((page - 1) * max).select('_id picture title createdAt');
  const search = await SearchLogModel.find();

  const allMovies = movies.map(movie => {
    const views = search.filter(movieSearch => String(movie._id) === String(movieSearch.movieId)).length;
    return {
      movie,
      views
    }
  });

  res.status(OK).json({countMovies, allMovies});
})

export const usersAdminHandler = catchErrors(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const max = Number(req.query.max) || 50;
  const sort = req.query.sort || 'desc';

  // Get the documents
  const countUsers = await UserModel.countDocuments();
  const users = await UserModel.find().sort({createdAt: sort === 'desc' ? -1 : 1}).limit(max).skip((page - 1) * max).select('-password')

  res.status(OK).json({countUsers, users});
})