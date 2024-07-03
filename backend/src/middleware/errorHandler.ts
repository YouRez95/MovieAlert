import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import { z } from "zod";
import AppError from "../utils/AppError";
import { REFRESH_TOKEN_PATH, clearAuthCookies } from "../utils/cookies";

const handleZodErrors = (res: Response, err: z.ZodError) => {
  const errors = err.issues.map(issue => ({
    path: issue.path.join("."),
    message: issue.message
  }))
  return res.status(BAD_REQUEST).json({
    errors,
  })
}

const handleAppError = (res: Response, err: AppError) => {
  return res.status(err.statusCode).json({
    message: err.message,
    errorCode: err.errorCode,
  })
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(`PATH: ${req.path}`, err);

  if (req.path === REFRESH_TOKEN_PATH) {
    clearAuthCookies(res);
  }

  if (err instanceof z.ZodError) {
    return handleZodErrors(res, err);
  }

  if (err instanceof AppError) {
    return handleAppError(res, err)
  }

  return res.status(INTERNAL_SERVER_ERROR).send('Internal Server Error');
}

export default errorHandler;
