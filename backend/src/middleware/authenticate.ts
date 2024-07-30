import { RequestHandler } from "express";
import appAssert from "../utils/appAssert";
import { UNAUTHORIZED } from "../constants/http";
import AppErrorCode from "../constants/appErrorCode";
import { verifyToken } from "../utils/jwt";
import SessionModel from "../models/session.model";
import catchErrors from '../utils/catchErrors';
import UserModel from "../models/user.model";


export const authenticate:RequestHandler = catchErrors(async (req, res, next) => {
  // Get the access token
  const accessToken = req.cookies.accessToken as string | undefined;
  appAssert(accessToken, UNAUTHORIZED, "Not authorized", AppErrorCode.InvalidAccessToken);
  
  // Verify the token
  const { error, payload } = verifyToken(accessToken)
  appAssert(payload, UNAUTHORIZED, error === 'jwt expired' ? 'Token expired' : 'Invalid Token', AppErrorCode.InvalidAccessToken);
  
  // Check for the session
  const sessionFound = await SessionModel.exists({_id: payload.sessionId});
  appAssert(sessionFound, UNAUTHORIZED, "Session Not found")
  
  // Store the user on the request
  req.userId = payload.userId;
  req.sessionId = payload.sessionId;
  next();
})


export const isAdmin:RequestHandler = catchErrors(async (req, res, next) => {
  const userId = req.userId;
  const user = await UserModel.findById(userId);

  appAssert(user?.role === "admin", UNAUTHORIZED, "Unauthorized");
  next();
})