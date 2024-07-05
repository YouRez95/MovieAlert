import { z } from "zod";
import catchErrors from "../utils/catchErrors";
// import { uploadFile } from "../config/s3";

import appAssert from "../utils/appAssert";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from "../constants/http";
import uploadToS3 from "../config/s3";
import { addMovie } from "../services/movie.service";


export const movieSchema = z.object({
  title: z.string().min(1, "title is required").max(255),
  year: z.string().min(1, "Year is required").max(255),
  genre: z.string().min(1, "Genre is required").max(255),
  contentWarning: z.array(z.string()).optional(),
  description: z.string().min(1, "description is required").max(300),
})



export const addMovieHandler = catchErrors(async (req, res) => {
  // Validate the body
  const { title, year, genre, description} = req.body;
  const contentWarning = req.body.contentWarning.split(',')
  const movieData = movieSchema.parse({ title, year, genre, description, contentWarning});

  const {file, userId} = req;
  appAssert(file, BAD_REQUEST, 'image not found');
  // Call the service
  const result = await addMovie({ title, year, genre, description, contentWarning, file, userId})
  return res.status(OK).json({message: 'movie created'});
})