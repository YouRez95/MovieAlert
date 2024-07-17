import mongoose from "mongoose";
import uploadToS3, { deleteFromS3 } from "../config/s3"
import { INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } from "../constants/http";
import MovieModel from "../models/movie.model";
import appAssert from "../utils/appAssert";
import { addMovieTitleToCache, deleteFromCache, movieIsMember } from "../config/redis";
import SearchLogModel from "../models/searchLog.model";
import UserModel from "../models/user.model";

type MovieDataType = {
    title: string,
    year: string,
    genre: string,
    description: string,
    contentWarning?: string[],
    file: Express.Multer.File
    userId: mongoose.Types.ObjectId
}

export const addMovie = async ({ title, year, genre, description, contentWarning, file, userId}: MovieDataType) => {

    // upload image to s3 and get url
    const { result, url, error } = await uploadToS3(file);
    appAssert(result || url, INTERNAL_SERVER_ERROR, "Something wrong try again later");

    // store the movie
   const created = await MovieModel.create({
        userId,
        title,
        year,
        genre,
        description,
        contentWarning,
        picture: url,
    })

    await addMovieTitleToCache(title, created.id);

    // Update the user (movies submitted)
    const user = await UserModel.findById(userId);
    appAssert(user, NOT_FOUND, 'user not found');
    user.moviesSubmitted += 1;
    await user.save();

    return {...created.toObject()};
}

type GetMovieParams = {
    movieId: string,
    movieName: string,
    userId: mongoose.Types.ObjectId
}

export const getMovie = async ({ movieId, movieName, userId }: GetMovieParams) => {
    // Check if the movie exist on the cache
    const { result, error } = await movieIsMember(`${movieId}:${movieName}`);

    appAssert(result, NOT_FOUND, "Movie not found")

    // Get the movie from database
    const movie = await MovieModel.findById(movieId).populate('userId', 'firstName lastName');
    appAssert(movie, NOT_FOUND, "Movie not found")


    // Check if the user is the owner of the movie or already seen before
    if (String(movie.userId._id) === String(userId) || await SearchLogModel.findOne({userId, movieId: movie._id})) {
      return {...movie.toObject()}
    }

    const user = await UserModel.findById(userId);
    appAssert(user, NOT_FOUND, 'User not found');
    // Check if the user has a pro badge
    const badge = user.badge;
    if (badge >= 4) {
      // Create the search doc and return the movie
      await SearchLogModel.create({
        userId: userId,
        movieId: movie._id
      })
      return {...movie.toObject()}
    }

    // Check if the user has access to see movie (depend on their badge)
    const maxViews = badge * 10;
    appAssert(user.moviesViewed < maxViews, UNAUTHORIZED, "you reach the limit of views, submit one movie to earn 10 movies views")
    await SearchLogModel.create({
      userId: userId,
      movieId: movie._id
    })
    user.moviesViewed = user.moviesViewed + 1;
    await user.save()
    return {...movie.toObject()}
}


export const getMostSearchedMovies =  async (limit = 10) => {
    const mostSearchedMovie = await SearchLogModel.aggregate([
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

    const newMoviesAdded = await MovieModel.aggregate([
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
}

type MovieDataUpdatedType = {
  title: string,
  year: string,
  genre: string,
  description: string,
  contentWarning?: string[],
  file?: Express.Multer.File,
  userId: mongoose.Types.ObjectId,
  id: string,
  movieName: string,
}

export const editMovie = async ({title, year,  genre, description, contentWarning, file, userId, id, movieName}: MovieDataUpdatedType) => {

  // find the movie
  const movie = await MovieModel.findOne({_id: id, title: movieName, userId});
  appAssert(movie, NOT_FOUND, 'Movie not found');

  // Checking for new file
  if (file) {
    // Delete old file
    const { result } = await deleteFromS3(movie.picture);
    console.log('deleteFromS3', result)
    appAssert(result, INTERNAL_SERVER_ERROR, 'Something wrong');
    // upload the new
    const {url} = await uploadToS3(file)
    appAssert(url, INTERNAL_SERVER_ERROR, 'Something wrong');
    movie.picture = url
  }

  // Update the movie
  movie.title = title;
  movie.genre = genre;
  movie.year = year;
  movie.contentWarning = contentWarning || [''];
  movie.description = description
  const updatedMovie = await movie.save();

  // store the new title on the cache and delete old
  await deleteFromCache(movieName, id);
  await addMovieTitleToCache(updatedMovie.title, updatedMovie.id)

  return {...updatedMovie.toObject()};
}

type deleteMovieParams = {
  movieId: string;
  movieName: string;
  userId: mongoose.Types.ObjectId,
}

export const deleteMovie = async ({movieId, movieName, userId}: deleteMovieParams) => {
  // Check if the movie exist on the cache
  const { result } = await movieIsMember(`${movieId}:${movieName}`)
  appAssert(result, NOT_FOUND, 'Movie not found');

  // delete movie from db
  const deletedMovie = await MovieModel.findOneAndDelete({userId, _id: movieId, title: movieName});
  appAssert(deletedMovie, NOT_FOUND, 'Movie not found or you are not the owner');

  // Delete the movie from search log
  await SearchLogModel.deleteMany({movieId: deletedMovie._id});

  // Delete the movie from aws

  await deleteFromS3(deletedMovie.picture);
  // Delete the movie from the cache
  await deleteFromCache(deletedMovie.title, String(deletedMovie._id));
} 