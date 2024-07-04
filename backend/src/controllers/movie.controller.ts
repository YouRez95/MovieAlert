import { z } from "zod";
import catchErrors from "../utils/catchErrors";


export const movieSchema = z.object({
  title: z.string().min(1).max(255),
  year: z.string().min(1).max(255),
  genre: z.string().min(1).max(255),
  picture: z.string().min(1).max(255),
  contentWarning: z.array(z.string()).optional(),
  description: z.string().min(1).max(300),
})



export const addMovieHandler = catchErrors(async (req, res) => {
  // Validate the body
  const movieData = movieSchema.parse({...req.body, picture: "url"});

  // Call the service
  console.log(req.file)

  // return response
  return res.status(200).json(movieData)
})