import mongoose from "mongoose";
import uploadToS3 from "../config/s3"
import { INTERNAL_SERVER_ERROR } from "../constants/http";
import MovieModel from "../models/movie.model";
import appAssert from "../utils/appAssert";

type MovieDataType = {
    title: string,
    year: string,
    genre: string,
    description: string,
    contentWarning: [string],
    file: Express.Multer.File
    userId: mongoose.Types.ObjectId
}

export const addMovie = async ({ title, year, genre, description, contentWarning, file, userId}: MovieDataType) => {

    // upload image to s3 and het url
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

    return {...created.toObject()};
}