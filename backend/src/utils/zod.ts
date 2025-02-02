import { z } from "zod";

export const emailSchema = z.string({message: "email is required"}).email({ message: "Invalid email address" }).min(1).max(255);
const passwordSchema = z.string({message: "Password is required"}).regex(
  new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"),
  "Password must include uppercase, lowercase, numbers, and special characters").min(8).max(255);

export const loginSchema = z.object({
  email : emailSchema,
  password: passwordSchema,
  userAgent: z.string().optional(),
});


export const registerSchema = loginSchema.extend({
  firstName: z.string({message: "First Name is required"}).min(1).max(255),
  lastName: z.string({message: "Last Name is required"}).min(1).max(255),
})


export const verificationCodeSchema = z.string().min(1).max(24);
export const movieTitleSchema = z.string().min(1).max(24);

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  verificationCode: verificationCodeSchema,
})


export const movieSchema = z.object({
  title: z.string().min(1, "title is required").max(255),
  year: z.string().min(1, "Year is required").max(255),
  genre: z.string().min(1, "Genre is required").max(255),
  contentWarning: z.array(z.string()).optional(),
  description: z.string().min(1, "description is required"),
})

export const aboutMovieSchema = z.object({
  movieId: z.string().min(1).max(24),
  movieName: z.string().min(1).max(255),
})