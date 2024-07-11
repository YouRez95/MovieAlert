"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aboutMovieSchema = exports.movieSchema = exports.resetPasswordSchema = exports.movieTitleSchema = exports.verificationCodeSchema = exports.registerSchema = exports.loginSchema = exports.emailSchema = void 0;
const zod_1 = require("zod");
exports.emailSchema = zod_1.z.string({ message: "email is required" }).email({ message: "Invalid email address" }).min(1).max(255);
const passwordSchema = zod_1.z.string({ message: "Password is required" }).regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"), "Password must include uppercase, lowercase, numbers, and special characters").min(8).max(255);
exports.loginSchema = zod_1.z.object({
    email: exports.emailSchema,
    password: passwordSchema,
    userAgent: zod_1.z.string().optional(),
});
exports.registerSchema = exports.loginSchema.extend({
    firstName: zod_1.z.string({ message: "First Name is required" }).min(1).max(255),
    lastName: zod_1.z.string({ message: "Last Name is required" }).min(1).max(255),
});
exports.verificationCodeSchema = zod_1.z.string().min(1).max(24);
exports.movieTitleSchema = zod_1.z.string().min(1).max(24);
exports.resetPasswordSchema = zod_1.z.object({
    password: passwordSchema,
    verificationCode: exports.verificationCodeSchema,
});
exports.movieSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "title is required").max(255),
    year: zod_1.z.string().min(1, "Year is required").max(255),
    genre: zod_1.z.string().min(1, "Genre is required").max(255),
    contentWarning: zod_1.z.array(zod_1.z.string()).optional(),
    description: zod_1.z.string().min(1, "description is required"),
});
exports.aboutMovieSchema = zod_1.z.object({
    movieId: zod_1.z.string().min(1).max(24),
    movieName: zod_1.z.string().min(1).max(255),
});
